import { useState } from 'react';
import {
  Check,
  Copy,
  Download,
  Laptop,
  RefreshCw,
  Server,
  User,
  Wifi,
  WifiOff,
} from 'lucide-react';
import type { SyncConfig, SyncRole, SyncStatus } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SyncModalProps {
  status: SyncStatus;
  onSaveConfig: (config: SyncConfig) => Promise<void>;
  onDownloadFromAdmin: () => Promise<void>;
  onSyncNow: () => Promise<void>;
  onClose: () => void;
}

export function SyncModal({
  status,
  onSaveConfig,
  onDownloadFromAdmin,
  onSyncNow,
  onClose,
}: SyncModalProps) {
  const [role, setRole] = useState<SyncRole>(status.role);
  const [adminIp, setAdminIp] = useState(status.adminIp);
  const [port, setPort] = useState(String(status.port || 4747));
  const [busy, setBusy] = useState(false);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await onSaveConfig({
        role,
        adminIp: adminIp.trim(),
        port: Number(port) || 4747,
      });
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = async () => {
    setBusy(true);
    try {
      await onSaveConfig({
        role: 'employee',
        adminIp: adminIp.trim(),
        port: Number(port) || 4747,
      });
      await onDownloadFromAdmin();
    } finally {
      setBusy(false);
    }
  };

  const handleSync = async () => {
    setBusy(true);
    try {
      await onSyncNow();
    } finally {
      setBusy(false);
    }
  };

  const copyText = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedIp(val);
    setTimeout(() => setCopiedIp(null), 1800);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wifi size={18} className="text-primary" />
            Admin & Employee Sync
          </DialogTitle>
          <DialogDescription>
            Run this PC as the <strong>Admin Server</strong> or connect as an{' '}
            <strong>Employee</strong> using the Admin&apos;s IP address.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* Role Picker */}
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ['standalone', 'Local Only', Laptop],
                ['admin', 'Admin (Server)', Server],
                ['employee', 'Employee', User],
              ] as const
            ).map(([val, label, Icon]) => (
              <button
                key={val}
                type="button"
                onClick={() => setRole(val)}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition-colors cursor-pointer',
                  role === val
                    ? 'border-primary bg-accent text-accent-foreground'
                    : 'border-border bg-card text-muted-foreground hover:bg-secondary'
                )}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {role === 'admin' && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900">
                  Admin Server Details
                </span>
                <Badge variant={status.serverRunning ? 'success' : 'muted'}>
                  {status.serverRunning ? 'Server Running' : 'Click Save to Start'}
                </Badge>
              </div>
              <p className="mt-1 text-emerald-800">
                Give one of these IP addresses to your Employees so they can download
                your <code>blueprint.bson</code> and <code>files.bson</code>:
              </p>
              <div className="mt-2 flex flex-col gap-1.5">
                {status.localIps.length > 0 ? (
                  status.localIps.map((ip) => {
                    const addr = `${ip}:${Number(port) || 4747}`;
                    return (
                      <div
                        key={ip}
                        className="flex items-center justify-between rounded-lg border border-emerald-200 bg-white px-2.5 py-1.5"
                      >
                        <code className="font-semibold text-foreground">{addr}</code>
                        <Button
                          type="button"
                          size="xs"
                          variant="outline"
                          onClick={() => copyText(ip)}
                        >
                          {copiedIp === ip ? (
                            <>
                              <Check size={12} /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Copy IP
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-muted-foreground">No LAN IP detected</span>
                )}
              </div>
            </div>
          )}

          {role === 'employee' && (
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-slate-50 p-3.5">
              <div className="grid grid-cols-3 gap-2.5">
                <label className="col-span-2 flex flex-col gap-1">
                  <span className="text-xs font-semibold">Admin IP Address *</span>
                  <Input
                    value={adminIp}
                    onChange={(e) => setAdminIp(e.target.value)}
                    placeholder="e.g., 192.168.1.15"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold">Port</span>
                  <Input
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    placeholder="4747"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-xs">
                <div className="flex items-center gap-2">
                  {status.adminOnline ? (
                    <Wifi size={14} className="text-emerald-600" />
                  ) : (
                    <WifiOff size={14} className="text-amber-600" />
                  )}
                  <span className="font-medium">
                    {status.adminOnline ? 'Admin Online' : 'Admin Offline'}
                  </span>
                </div>
                {status.pendingCount > 0 && (
                  <Badge variant="warning">
                    {status.pendingCount} queued offline
                  </Badge>
                )}
              </div>

              <p className="text-[11px] text-muted-foreground">
                If Admin is offline, any changes you make are saved in{' '}
                <code>sync-queue.bson</code> and automatically sent when Admin comes
                back online.
              </p>

              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={busy || !adminIp.trim()}
                  onClick={handleDownload}
                  className="flex-1"
                >
                  <Download size={13} />
                  Download BSON from Admin
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={busy || !adminIp.trim()}
                  onClick={handleSync}
                >
                  <RefreshCw size={13} />
                  Sync Now
                </Button>
              </div>
            </div>
          )}

          {role === 'admin' && (
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold">Server Port</span>
              <Input
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="4747"
              />
            </label>
          )}

          {status.lastError && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              {status.lastError}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" disabled={busy}>
              Save Mode
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
