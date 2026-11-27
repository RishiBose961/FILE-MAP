import { BSON } from 'bson';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import type {
  AppSettings,
  FileMapData,
  OfficeFile,
  OfficeLocation,
  RoomOpening,
  SingleBsonInfo,
  StorageInfo,
  SyncConfig,
  SyncOperation,
  WallSide,
} from '../src/types';

const CURRENT_VERSION = 1;

interface BlueprintBsonDoc {
  version: number;
  updatedAt: string;
  locations: OfficeLocation[];
}

interface FilesBsonDoc {
  version: number;
  updatedAt: string;
  files: OfficeFile[];
}

function normalizeLocation(raw: Partial<OfficeLocation>): OfficeLocation {
  const now = new Date().toISOString();
  const bp = raw.blueprint;
  const blueprint =
    bp &&
    typeof bp.x === 'number' &&
    typeof bp.y === 'number' &&
    typeof bp.w === 'number' &&
    typeof bp.h === 'number'
      ? { x: bp.x, y: bp.y, w: bp.w, h: bp.h }
      : undefined;

  const openings: RoomOpening[] | undefined = Array.isArray(raw.openings)
    ? raw.openings
        .filter((o): o is RoomOpening => Boolean(o && typeof o === 'object'))
        .map((o) => ({
          id: String(o.id ?? ''),
          kind: (o.kind === 'window' ? 'window' : 'door') as 'door' | 'window',
          wall: (['top', 'bottom', 'left', 'right'].includes(String(o.wall))
            ? o.wall
            : 'bottom') as WallSide,
          position:
            typeof o.position === 'number'
              ? Math.min(100, Math.max(0, o.position))
              : 50,
          width: typeof o.width === 'number' ? o.width : o.kind === 'window' ? 54 : 38,
        }))
        .filter((o) => o.id)
    : undefined;

  return {
    id: String(raw.id ?? ''),
    name: String(raw.name ?? 'Unnamed Location'),
    type: raw.type ?? 'cabinet',
    parentId: raw.parentId ? String(raw.parentId) : null,
    code: String(raw.code ?? ''),
    color: String(raw.color ?? '#4f46e5'),
    notes: String(raw.notes ?? ''),
    blueprint,
    openings,
    createdAt: String(raw.createdAt ?? now),
    updatedAt: String(raw.updatedAt ?? now),
  };
}

function normalizeFile(raw: Partial<OfficeFile>): OfficeFile {
  const now = new Date().toISOString();
  return {
    id: String(raw.id ?? ''),
    sno: raw.sno ? String(raw.sno) : undefined,
    title: String(raw.title ?? 'Untitled File'),
    fileCode: String(raw.fileCode ?? ''),
    category: String(raw.category ?? 'General'),
    locationId: raw.locationId ? String(raw.locationId) : null,
    positionDetail: String(raw.positionDetail ?? ''),
    status: raw.status ?? 'stored',
    checkedOutTo: String(raw.checkedOutTo ?? ''),
    checkedOutAt: raw.checkedOutAt ? String(raw.checkedOutAt) : null,
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    notes: String(raw.notes ?? ''),
    createdAt: String(raw.createdAt ?? now),
    updatedAt: String(raw.updatedAt ?? now),
  };
}

export class BsonStore {
  private readonly dataDir: string;
  private readonly blueprintPath: string;
  private readonly filesPath: string;
  private readonly legacyPath: string;
  private readonly queuePath: string;
  private readonly syncConfigPath: string;
  private readonly appSettingsPath: string;

  constructor(dataDir: string) {
    this.dataDir = dataDir;
    this.blueprintPath = path.join(dataDir, 'blueprint.bson');
    this.filesPath = path.join(dataDir, 'files.bson');
    this.legacyPath = path.join(dataDir, 'filemap-data.bson');
    this.queuePath = path.join(dataDir, 'sync-queue.bson');
    this.syncConfigPath = path.join(dataDir, 'sync-config.bson');
    this.appSettingsPath = path.join(dataDir, 'app-settings.bson');
  }

  getFolderPath(): string {
    return this.dataDir;
  }

  getBlueprintPath(): string {
    return this.blueprintPath;
  }

  getFilesPath(): string {
    return this.filesPath;
  }

  private async getSingleFileInfo(filePath: string): Promise<SingleBsonInfo> {
    if (!existsSync(filePath)) {
      return {
        filePath,
        sizeBytes: 0,
        exists: false,
        lastModified: null,
      };
    }
    const stat = await fs.stat(filePath);
    return {
      filePath,
      sizeBytes: stat.size,
      exists: true,
      lastModified: stat.mtime.toISOString(),
    };
  }

  async getStorageInfo(): Promise<StorageInfo> {
    const [blueprint, files] = await Promise.all([
      this.getSingleFileInfo(this.blueprintPath),
      this.getSingleFileInfo(this.filesPath),
    ]);
    return {
      folderPath: this.dataDir,
      blueprint,
      files,
    };
  }

  private async writeAtomicBson(filePath: string, payload: Record<string, unknown>): Promise<void> {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    const serialized = BSON.serialize(payload);
    const tempPath = `${filePath}.tmp`;
    await fs.writeFile(tempPath, serialized);
    await fs.rename(tempPath, filePath);
  }

  private async migrateLegacyIfNeeded(): Promise<void> {
    if (
      existsSync(this.legacyPath) &&
      !existsSync(this.blueprintPath) &&
      !existsSync(this.filesPath)
    ) {
      try {
        const buffer = await fs.readFile(this.legacyPath);
        if (buffer.byteLength > 0) {
          const decoded = BSON.deserialize(buffer) as Partial<FileMapData>;
          const locations = Array.isArray(decoded.locations)
            ? decoded.locations.map(normalizeLocation).filter((l) => l.id)
            : [];
          const files = Array.isArray(decoded.files)
            ? decoded.files.map(normalizeFile).filter((f) => f.id)
            : [];
          await this.saveBlueprint(locations);
          await this.saveFiles(files);
        }
      } catch (err) {
        console.error('Legacy BSON migration skipped:', err);
      }
    }
  }

  async load(): Promise<FileMapData> {
    await this.migrateLegacyIfNeeded();

    let locations: OfficeLocation[] = [];
    if (existsSync(this.blueprintPath)) {
      const buf = await fs.readFile(this.blueprintPath);
      if (buf.byteLength > 0) {
        const doc = BSON.deserialize(buf) as Partial<BlueprintBsonDoc>;
        if (Array.isArray(doc.locations)) {
          locations = doc.locations.map(normalizeLocation).filter((l) => l.id);
        }
      }
    } else {
      await this.saveBlueprint([]);
    }

    let files: OfficeFile[] = [];
    if (existsSync(this.filesPath)) {
      const buf = await fs.readFile(this.filesPath);
      if (buf.byteLength > 0) {
        const doc = BSON.deserialize(buf) as Partial<FilesBsonDoc>;
        if (Array.isArray(doc.files)) {
          files = doc.files.map(normalizeFile).filter((f) => f.id);
        }
      }
    } else {
      await this.saveFiles([]);
    }

    return {
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
      locations,
      files,
    };
  }

  async saveBlueprint(locations: OfficeLocation[]): Promise<StorageInfo> {
    const doc: BlueprintBsonDoc = {
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
      locations,
    };
    await this.writeAtomicBson(
      this.blueprintPath,
      doc as unknown as Record<string, unknown>
    );
    return this.getStorageInfo();
  }

  async saveFiles(files: OfficeFile[]): Promise<StorageInfo> {
    const doc: FilesBsonDoc = {
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
      files,
    };
    await this.writeAtomicBson(
      this.filesPath,
      doc as unknown as Record<string, unknown>
    );
    return this.getStorageInfo();
  }

  async exportToFile(target: 'blueprint' | 'files', targetPath: string): Promise<void> {
    const data = await this.load();
    const payload =
      target === 'blueprint'
        ? {
            version: CURRENT_VERSION,
            updatedAt: new Date().toISOString(),
            locations: data.locations,
          }
        : {
            version: CURRENT_VERSION,
            updatedAt: new Date().toISOString(),
            files: data.files,
          };
    const serialized = BSON.serialize(payload);
    await fs.writeFile(targetPath, serialized);
  }

  async importFromFile(
    target: 'blueprint' | 'files',
    sourcePath: string
  ): Promise<{ locations?: OfficeLocation[]; files?: OfficeFile[] }> {
    const buffer = await fs.readFile(sourcePath);
    const decoded = BSON.deserialize(buffer) as Partial<FileMapData>;

    if (target === 'blueprint') {
      const locations = Array.isArray(decoded.locations)
        ? decoded.locations.map(normalizeLocation).filter((l) => l.id)
        : [];
      await this.saveBlueprint(locations);
      return { locations };
    }

    const files = Array.isArray(decoded.files)
      ? decoded.files.map(normalizeFile).filter((f) => f.id)
      : [];
    await this.saveFiles(files);
    return { files };
  }

  async readRawBson(target: 'blueprint' | 'files'): Promise<Buffer> {
    await this.load();
    const targetPath = target === 'blueprint' ? this.blueprintPath : this.filesPath;
    return fs.readFile(targetPath);
  }

  async writeRawBson(target: 'blueprint' | 'files', buffer: Buffer): Promise<void> {
    const decoded = BSON.deserialize(buffer) as Partial<FileMapData>;
    if (target === 'blueprint') {
      const locations = Array.isArray(decoded.locations)
        ? decoded.locations.map(normalizeLocation).filter((l) => l.id)
        : [];
      await this.saveBlueprint(locations);
      return;
    }
    const files = Array.isArray(decoded.files)
      ? decoded.files.map(normalizeFile).filter((f) => f.id)
      : [];
    await this.saveFiles(files);
  }

  async loadSyncConfig(): Promise<SyncConfig> {
    if (!existsSync(this.syncConfigPath)) {
      return { role: 'standalone', adminIp: '', port: 4747 };
    }
    try {
      const buf = await fs.readFile(this.syncConfigPath);
      const doc = BSON.deserialize(buf) as Partial<SyncConfig>;
      return {
        role:
          doc.role === 'admin' || doc.role === 'employee' ? doc.role : 'standalone',
        adminIp: typeof doc.adminIp === 'string' ? doc.adminIp : '',
        port: typeof doc.port === 'number' && doc.port > 0 ? doc.port : 4747,
      };
    } catch {
      return { role: 'standalone', adminIp: '', port: 4747 };
    }
  }

  async saveSyncConfig(config: SyncConfig): Promise<void> {
    await this.writeAtomicBson(
      this.syncConfigPath,
      config as unknown as Record<string, unknown>
    );
  }

  async loadAppSettings(): Promise<AppSettings> {
    if (!existsSync(this.appSettingsPath)) {
      return { autoStartOnBoot: false, runInBackground: true };
    }
    try {
      const buf = await fs.readFile(this.appSettingsPath);
      const doc = BSON.deserialize(buf) as Partial<AppSettings>;
      return {
        autoStartOnBoot: Boolean(doc.autoStartOnBoot),
        runInBackground: doc.runInBackground !== false,
      };
    } catch {
      return { autoStartOnBoot: false, runInBackground: true };
    }
  }

  async saveAppSettings(settings: AppSettings): Promise<void> {
    await this.writeAtomicBson(
      this.appSettingsPath,
      settings as unknown as Record<string, unknown>
    );
  }

  async loadSyncQueue(): Promise<SyncOperation[]> {
    if (!existsSync(this.queuePath)) return [];
    try {
      const buf = await fs.readFile(this.queuePath);
      if (buf.byteLength === 0) return [];
      const doc = BSON.deserialize(buf) as { ops?: SyncOperation[] };
      return Array.isArray(doc.ops) ? doc.ops : [];
    } catch {
      return [];
    }
  }

  async saveSyncQueue(ops: SyncOperation[]): Promise<void> {
    await this.writeAtomicBson(this.queuePath, { ops });
  }

  async applySyncOperations(ops: SyncOperation[]): Promise<FileMapData> {
    const current = await this.load();
    let locations = [...current.locations];
    let files = [...current.files];
    let bpChanged = false;
    let filesChanged = false;

    for (const op of ops) {
      if (op.type === 'upsert_file') {
        const normalized = normalizeFile(op.file);
        const idx = files.findIndex((f) => f.id === normalized.id);
        if (idx >= 0) files[idx] = normalized;
        else files.unshift(normalized);
        filesChanged = true;
      } else if (op.type === 'delete_file') {
        files = files.filter((f) => f.id !== op.fileId);
        filesChanged = true;
      } else if (op.type === 'replace_files') {
        files = op.files.map(normalizeFile).filter((f) => f.id);
        filesChanged = true;
      } else if (op.type === 'upsert_location') {
        const normalized = normalizeLocation(op.location);
        const idx = locations.findIndex((l) => l.id === normalized.id);
        if (idx >= 0) locations[idx] = normalized;
        else locations.push(normalized);
        bpChanged = true;
      } else if (op.type === 'delete_location') {
        locations = locations.filter((l) => l.id !== op.locationId);
        bpChanged = true;
      } else if (op.type === 'replace_blueprint') {
        locations = op.locations.map(normalizeLocation).filter((l) => l.id);
        bpChanged = true;
      }
    }

    if (bpChanged) await this.saveBlueprint(locations);
    if (filesChanged) await this.saveFiles(files);

    return {
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
      locations,
      files,
    };
  }
}
