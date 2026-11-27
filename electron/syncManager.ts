import { BSON } from 'bson';
import http from 'node:http';
import os from 'node:os';
import type { BsonStore } from './bsonStore';
import type {
  FileMapData,
  SyncConfig,
  SyncOperation,
  SyncStatus,
} from '../src/types';

function getLocalLanIps(): string[] {
  const nets = os.networkInterfaces();
  const ips: string[] = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === 'IPv4' && !net.internal) {
        ips.push(net.address);
      }
    }
  }
  return ips;
}

function buildBaseUrl(adminIp: string, port: number): string {
  const raw = adminIp.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  if (!raw) return '';
  if (raw.includes(':')) return `http://${raw}`;
  return `http://${raw}:${port}`;
}

export class SyncManager {
  private readonly store: BsonStore;
  private readonly onDataUpdated: (data: FileMapData) => void;
  private readonly onStatusChanged: (status: SyncStatus) => void;

  private config: SyncConfig = { role: 'standalone', adminIp: '', port: 4747 };
  private server: http.Server | null = null;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private adminOnline = false;
  private lastSyncedAt: string | null = null;
  private lastError: string | null = null;
  private syncing = false;

  constructor(
    store: BsonStore,
    callbacks: {
      onDataUpdated: (data: FileMapData) => void;
      onStatusChanged: (status: SyncStatus) => void;
    }
  ) {
    this.store = store;
    this.onDataUpdated = callbacks.onDataUpdated;
    this.onStatusChanged = callbacks.onStatusChanged;
  }

  async init(): Promise<void> {
    this.config = await this.store.loadSyncConfig();
    await this.applyMode();
  }

  async dispose(): Promise<void> {
    this.stopPolling();
    await this.stopServer();
  }

  async getStatus(): Promise<SyncStatus> {
    const queue = await this.store.loadSyncQueue();
    return {
      role: this.config.role,
      adminIp: this.config.adminIp,
      port: this.config.port,
      serverRunning: Boolean(this.server?.listening),
      localIps: getLocalLanIps(),
      adminOnline: this.config.role === 'admin' ? true : this.adminOnline,
      pendingCount: queue.length,
      lastSyncedAt: this.lastSyncedAt,
      lastError: this.lastError,
    };
  }

  async setConfig(next: SyncConfig): Promise<SyncStatus> {
    this.config = {
      role: next.role,
      adminIp: next.adminIp.trim(),
      port: next.port > 0 ? next.port : 4747,
    };
    await this.store.saveSyncConfig(this.config);
    this.lastError = null;
    await this.applyMode();
    const status = await this.getStatus();
    this.onStatusChanged(status);
    return status;
  }

  private async emitStatus(): Promise<void> {
    this.onStatusChanged(await this.getStatus());
  }

  private async applyMode(): Promise<void> {
    this.stopPolling();
    await this.stopServer();
    this.adminOnline = false;

    if (this.config.role === 'admin') {
      await this.startServer();
    } else if (this.config.role === 'employee') {
      this.startPolling();
      void this.syncNow();
    }
  }

  private startPolling(): void {
    this.stopPolling();
    this.pollTimer = setInterval(() => {
      if (this.config.role === 'employee') {
        void this.syncNow();
      }
    }, 8000);
  }

  private stopPolling(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private async stopServer(): Promise<void> {
    if (!this.server) return;
    const srv = this.server;
    this.server = null;
    await new Promise<void>((resolve) => {
      srv.close(() => resolve());
    });
  }

  private async startServer(): Promise<void> {
    const srv = http.createServer(async (req, res) => {
      const url = (req.url ?? '/').split('?')[0];

      try {
        if (req.method === 'GET' && url === '/api/ping') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              ok: true,
              role: 'admin',
              timestamp: new Date().toISOString(),
            })
          );
          return;
        }

        if (req.method === 'GET' && url === '/api/bson/blueprint') {
          const buf = await this.store.readRawBson('blueprint');
          res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Length': buf.byteLength,
          });
          res.end(buf);
          return;
        }

        if (req.method === 'GET' && url === '/api/bson/files') {
          const buf = await this.store.readRawBson('files');
          res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Length': buf.byteLength,
          });
          res.end(buf);
          return;
        }

        if (req.method === 'POST' && url === '/api/sync') {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          }
          const bodyBuf = Buffer.concat(chunks);
          const decoded = BSON.deserialize(bodyBuf) as { ops?: SyncOperation[] };
          const ops = Array.isArray(decoded.ops) ? decoded.ops : [];

          const updated = await this.store.applySyncOperations(ops);
          this.lastSyncedAt = new Date().toISOString();
          this.onDataUpdated(updated);
          void this.emitStatus();

          const reply = BSON.serialize({ ok: true, data: updated });
          res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Length': reply.byteLength,
          });
          res.end(reply);
          return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error: err instanceof Error ? err.message : 'Server error',
          })
        );
      }
    });

    await new Promise<void>((resolve) => {
      srv.on('error', (err) => {
        this.lastError = err.message;
        resolve();
      });
      srv.listen(this.config.port, '0.0.0.0', () => {
        this.server = srv;
        this.lastError = null;
        resolve();
      });
    });
  }

  async enqueueOperation(op: SyncOperation): Promise<void> {
    if (this.config.role !== 'employee') return;
    const queue = await this.store.loadSyncQueue();
    queue.push(op);
    await this.store.saveSyncQueue(queue);
    await this.emitStatus();
    void this.syncNow();
  }

  async downloadFromAdmin(): Promise<{
    ok: boolean;
    error?: string;
    data?: FileMapData;
  }> {
    const baseUrl = buildBaseUrl(this.config.adminIp, this.config.port);
    if (!baseUrl) {
      return { ok: false, error: 'Please enter the Admin IP address first.' };
    }

    try {
      const [bpRes, filesRes] = await Promise.all([
        fetch(`${baseUrl}/api/bson/blueprint`, { signal: AbortSignal.timeout(5000) }),
        fetch(`${baseUrl}/api/bson/files`, { signal: AbortSignal.timeout(5000) }),
      ]);

      if (!bpRes.ok || !filesRes.ok) {
        throw new Error('Admin server returned an error.');
      }

      const bpBuf = Buffer.from(await bpRes.arrayBuffer());
      const filesBuf = Buffer.from(await filesRes.arrayBuffer());

      await this.store.writeRawBson('blueprint', bpBuf);
      await this.store.writeRawBson('files', filesBuf);

      const data = await this.store.load();
      this.adminOnline = true;
      this.lastSyncedAt = new Date().toISOString();
      this.lastError = null;
      this.onDataUpdated(data);
      await this.emitStatus();
      return { ok: true, data };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not reach Admin server';
      this.adminOnline = false;
      this.lastError = message;
      await this.emitStatus();
      return { ok: false, error: message };
    }
  }

  async syncNow(): Promise<{
    ok: boolean;
    syncedCount: number;
    error?: string;
    data?: FileMapData;
  }> {
    if (this.config.role !== 'employee') {
      return { ok: true, syncedCount: 0 };
    }
    const baseUrl = buildBaseUrl(this.config.adminIp, this.config.port);
    if (!baseUrl) {
      return { ok: false, syncedCount: 0, error: 'Admin IP is not set.' };
    }
    if (this.syncing) {
      return { ok: false, syncedCount: 0 };
    }

    this.syncing = true;
    try {
      const queue = await this.store.loadSyncQueue();

      if (queue.length === 0) {
        const pingRes = await fetch(`${baseUrl}/api/ping`, {
          signal: AbortSignal.timeout(3500),
        });
        if (!pingRes.ok) throw new Error('Admin server unreachable');
        this.adminOnline = true;
        this.lastError = null;
        await this.emitStatus();
        return { ok: true, syncedCount: 0 };
      }

      const body = BSON.serialize({ ops: queue });
      const res = await fetch(`${baseUrl}/api/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: new Uint8Array(body),
        signal: AbortSignal.timeout(6000),
      });

      if (!res.ok) {
        throw new Error(`Sync failed (${res.status})`);
      }

      const replyBuf = Buffer.from(await res.arrayBuffer());
      const decoded = BSON.deserialize(replyBuf) as {
        ok?: boolean;
        data?: FileMapData;
      };

      await this.store.saveSyncQueue([]);
      if (decoded.data) {
        await this.store.saveBlueprint(decoded.data.locations);
        await this.store.saveFiles(decoded.data.files);
        this.onDataUpdated(decoded.data);
      }

      this.adminOnline = true;
      this.lastSyncedAt = new Date().toISOString();
      this.lastError = null;
      await this.emitStatus();
      return { ok: true, syncedCount: queue.length, data: decoded.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Admin offline';
      this.adminOnline = false;
      this.lastError = message;
      await this.emitStatus();
      return { ok: false, syncedCount: 0, error: message };
    } finally {
      this.syncing = false;
    }
  }
}
