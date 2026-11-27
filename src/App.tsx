import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Database,
  Download,
  Edit2,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  FolderTree,
  HardDrive,
  LayoutGrid,
  LayoutTemplate,
  List,
  LogOut,
  MapPin,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Server,
  Sparkles,
  Trash2,
  Upload,
  UserCheck,
  Wifi,
  WifiOff,
} from 'lucide-react';
import type {
  BlueprintRect,
  ExcelImportRow,
  FileMapData,
  FileStatus,
  LocationType,
  OfficeFile,
  OfficeLocation,
  RoomOpening,
  StorageInfo,
  SyncConfig,
  SyncStatus,
} from './types';
import {
  buildLocationMap,
  createSampleData,
  formatBytes,
  formatShortDate,
  generateId,
  getDescendantLocationIds,
  getLocationBreadcrumb,
  getLocationPath,
  matchesFileQuery,
} from './utils/fileMapHelpers';
import { LocationIcon } from './components/LocationIcon';
import { LocationTree } from './components/LocationTree';
import { LocationModal } from './components/LocationModal';
import { FileModal } from './components/FileModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ExcelImportModal } from './components/ExcelImportModal';
import { OfficeBlueprint } from './components/OfficeBlueprint';
import { SyncModal } from './components/SyncModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type ActiveTab = 'files' | 'map' | 'blueprint' | 'checked_out';
type ViewMode = 'table' | 'cards';

export function App() {
  const [data, setData] = useState<FileMapData>({
    version: 1,
    updatedAt: '',
    locations: [],
    files: [],
  });
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>('files');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unplaced' | FileStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    role: 'standalone',
    adminIp: '',
    port: 4747,
    serverRunning: false,
    localIps: [],
    adminOnline: false,
    pendingCount: 0,
    lastSyncedAt: null,
    lastError: null,
  });

  const [locationModal, setLocationModal] = useState<{
    open: boolean;
    existing?: OfficeLocation | null;
    defaultParentId?: string | null;
    defaultType?: LocationType;
  }>({ open: false });

  const [fileModal, setFileModal] = useState<{
    open: boolean;
    existing?: OfficeFile | null;
    defaultLocationId?: string | null;
  }>({ open: false });

  const [checkoutFile, setCheckoutFile] = useState<OfficeFile | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const [loaded, info, sStatus] = await Promise.all([
          window.fileMapApi.loadData(),
          window.fileMapApi.getStorageInfo(),
          window.fileMapApi.getSyncStatus(),
        ]);
        if (!mounted) return;
        setData(loaded);
        setStorageInfo(info);
        setSyncStatus(sStatus);
        if (loaded.locations.length > 0) {
          setSelectedLocationId(loaded.locations[0].id);
        }
      } catch (err) {
        console.error('Failed to load BSON store:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    init();

    const unsubData = window.fileMapApi.onDataUpdated((updated) => {
      setData(updated);
      void window.fileMapApi.getStorageInfo().then(setStorageInfo);
    });
    const unsubSync = window.fileMapApi.onSyncStatusChanged((status) => {
      setSyncStatus(status);
    });

    return () => {
      mounted = false;
      unsubData();
      unsubSync();
    };
  }, []);

  const persistBlueprint = useCallback(
    async (locations: OfficeLocation[], message?: string) => {
      setData((prev) => ({ ...prev, locations }));
      try {
        const info = await window.fileMapApi.saveBlueprint(locations);
        setStorageInfo(info);
        if (message) showToast(message);
      } catch (err) {
        console.error('Failed to save blueprint.bson:', err);
        showToast('Error saving blueprint.bson');
      }
    },
    [showToast]
  );

  const persistFiles = useCallback(
    async (files: OfficeFile[], message?: string) => {
      setData((prev) => ({ ...prev, files }));
      try {
        const info = await window.fileMapApi.saveFiles(files);
        setStorageInfo(info);
        if (message) showToast(message);
      } catch (err) {
        console.error('Failed to save files.bson:', err);
        showToast('Error saving files.bson');
      }
    },
    [showToast]
  );

  const locationMap = useMemo(() => buildLocationMap(data.locations), [data.locations]);

  const categoriesInUse = useMemo(() => {
    const set = new Set(data.files.map((f) => f.category).filter(Boolean));
    return Array.from(set).sort();
  }, [data.files]);

  const stats = useMemo(() => {
    const checkedOut = data.files.filter((f) => f.status === 'checked_out').length;
    return {
      totalFiles: data.files.length,
      totalLocations: data.locations.length,
      checkedOut,
    };
  }, [data.files, data.locations]);

  const existingFileCodes = useMemo(() => {
    return new Set(
      data.files.map((f) => f.fileCode.trim().toUpperCase()).filter(Boolean)
    );
  }, [data.files]);

  const filteredFiles = useMemo(() => {
    return data.files
      .filter((f) => {
        if (activeTab === 'checked_out' && f.status !== 'checked_out') return false;
        if (activeTab === 'files') {
          if (statusFilter === 'unplaced' && f.locationId !== null) return false;
          if (
            statusFilter !== 'all' &&
            statusFilter !== 'unplaced' &&
            f.status !== statusFilter
          ) {
            return false;
          }
        }
        if (categoryFilter !== 'all' && f.category !== categoryFilter) return false;
        return matchesFileQuery(f, searchQuery, locationMap);
      })
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [data.files, activeTab, statusFilter, categoryFilter, searchQuery, locationMap]);

  const selectedLocation = selectedLocationId
    ? locationMap.get(selectedLocationId) ?? null
    : null;

  const filesInSelectedLocation = useMemo(() => {
    if (!selectedLocationId) return [];
    const ids = getDescendantLocationIds(selectedLocationId, data.locations);
    return data.files
      .filter((f) => f.locationId && ids.has(f.locationId))
      .filter((f) => matchesFileQuery(f, searchQuery, locationMap));
  }, [selectedLocationId, data.locations, data.files, searchQuery, locationMap]);

  const handleSaveLocation = (loc: OfficeLocation) => {
    const exists = data.locations.some((l) => l.id === loc.id);
    const locations = exists
      ? data.locations.map((l) => (l.id === loc.id ? loc : l))
      : [...data.locations, loc];

    setLocationModal({ open: false });
    setSelectedLocationId(loc.id);
    persistBlueprint(
      locations,
      exists ? 'Saved to blueprint.bson' : 'Added to blueprint.bson'
    );
  };

  const handleUpdateLocationRect = useCallback(
    (id: string, rect: BlueprintRect) => {
      const locations = data.locations.map((l) =>
        l.id === id ? { ...l, blueprint: rect, updatedAt: new Date().toISOString() } : l
      );
      persistBlueprint(locations);
    },
    [data.locations, persistBlueprint]
  );

  const handleUpdateLocationOpenings = useCallback(
    (id: string, openings: RoomOpening[]) => {
      const locations = data.locations.map((l) =>
        l.id === id ? { ...l, openings, updatedAt: new Date().toISOString() } : l
      );
      persistBlueprint(locations);
    },
    [data.locations, persistBlueprint]
  );

  const handleAutoArrangeBlueprint = useCallback(
    (updates: { id: string; rect: BlueprintRect }[]) => {
      const map = new Map(updates.map((u) => [u.id, u.rect]));
      const now = new Date().toISOString();
      const locations = data.locations.map((l) =>
        map.has(l.id) ? { ...l, blueprint: map.get(l.id), updatedAt: now } : l
      );
      persistBlueprint(locations, 'Blueprint layout saved to blueprint.bson');
    },
    [data.locations, persistBlueprint]
  );

  const handleDeleteLocation = async (loc: OfficeLocation) => {
    const idsToDelete = getDescendantLocationIds(loc.id, data.locations);
    const remainingLocations = data.locations.filter((l) => !idsToDelete.has(l.id));
    const hasAffectedFiles = data.files.some(
      (f) => f.locationId && idsToDelete.has(f.locationId)
    );
    const updatedFiles = hasAffectedFiles
      ? data.files.map((f) =>
          f.locationId && idsToDelete.has(f.locationId)
            ? { ...f, locationId: loc.parentId, updatedAt: new Date().toISOString() }
            : f
        )
      : data.files;

    if (selectedLocationId && idsToDelete.has(selectedLocationId)) {
      setSelectedLocationId(remainingLocations[0]?.id ?? null);
    }

    await persistBlueprint(remainingLocations, `Removed "${loc.name}"`);
    if (hasAffectedFiles) {
      await persistFiles(updatedFiles);
    }
  };

  const handleSaveFile = (file: OfficeFile) => {
    const exists = data.files.some((f) => f.id === file.id);
    const files = exists
      ? data.files.map((f) => (f.id === file.id ? file : f))
      : [file, ...data.files];

    setFileModal({ open: false });
    persistFiles(files, exists ? 'Saved to files.bson' : 'Added to files.bson');
  };

  const handleDeleteFile = (file: OfficeFile) => {
    const files = data.files.filter((f) => f.id !== file.id);
    persistFiles(files, `Deleted "${file.title}" from files.bson`);
  };

  const handleCheckoutConfirm = (personName: string) => {
    if (!checkoutFile) return;
    const now = new Date().toISOString();
    const files = data.files.map((f) =>
      f.id === checkoutFile.id
        ? {
            ...f,
            status: 'checked_out' as const,
            checkedOutTo: personName,
            checkedOutAt: now,
            updatedAt: now,
          }
        : f
    );
    setCheckoutFile(null);
    persistFiles(files, `Marked as taken by ${personName}`);
  };

  const handleReturnFile = (file: OfficeFile) => {
    const now = new Date().toISOString();
    const files = data.files.map((f) =>
      f.id === file.id
        ? {
            ...f,
            status: 'stored' as const,
            checkedOutTo: '',
            checkedOutAt: null,
            updatedAt: now,
          }
        : f
    );
    persistFiles(files, `"${file.title}" is back in its place`);
  };

  const handleExportBson = async (target: 'blueprint' | 'files') => {
    const res = await window.fileMapApi.exportBson(target);
    if (!res.canceled && res.filePath) {
      showToast(`Exported ${target}.bson to ${res.filePath}`);
    }
  };

  const handleImportBson = async (target: 'blueprint' | 'files') => {
    const res = await window.fileMapApi.importBson(target);
    if (res.canceled) return;
    if (target === 'blueprint' && res.locations) {
      setData((prev) => ({ ...prev, locations: res.locations! }));
      setSelectedLocationId(res.locations[0]?.id ?? null);
      showToast('Imported blueprint.bson');
    } else if (target === 'files' && res.files) {
      setData((prev) => ({ ...prev, files: res.files! }));
      showToast('Imported files.bson');
    }
    const info = await window.fileMapApi.getStorageInfo();
    setStorageInfo(info);
  };

  const handleLoadSample = async () => {
    const sample = createSampleData();
    setSelectedLocationId(sample.locations[0]?.id ?? null);
    await persistBlueprint(sample.locations);
    await persistFiles(sample.files, 'Loaded sample into blueprint.bson & files.bson');
  };

  const handleSaveSyncConfig = async (config: SyncConfig) => {
    const nextStatus = await window.fileMapApi.setSyncConfig(config);
    setSyncStatus(nextStatus);
    showToast(
      config.role === 'admin'
        ? `Admin Server running on port ${config.port}`
        : config.role === 'employee'
        ? `Employee mode set (${config.adminIp})`
        : 'Switched to Local Only mode'
    );
  };

  const handleDownloadFromAdmin = async () => {
    const res = await window.fileMapApi.downloadFromAdmin();
    if (res.ok && res.data) {
      setData(res.data);
      const info = await window.fileMapApi.getStorageInfo();
      setStorageInfo(info);
      showToast('Downloaded blueprint.bson & files.bson from Admin');
    } else {
      showToast(res.error ?? 'Could not reach Admin');
    }
  };

  const handleSyncNow = async () => {
    const res = await window.fileMapApi.syncNow();
    if (res.ok) {
      if (res.data) setData(res.data);
      showToast(
        res.syncedCount > 0
          ? `Synced ${res.syncedCount} offline changes to Admin`
          : 'Synced with Admin'
      );
    } else {
      showToast(res.error ?? 'Admin is offline — changes queued');
    }
  };

  const handleUploadExcel = () => {
    setExcelModalOpen(true);
  };

  const handleConfirmExcelImport = ({
    rows,
    locationId,
    category,
    skipDuplicates,
  }: {
    rows: ExcelImportRow[];
    locationId: string | null;
    category: string;
    skipDuplicates: boolean;
  }) => {
    const now = new Date().toISOString();
    const filteredRows = skipDuplicates
      ? rows.filter(
          (r) => !r.fileCode || !existingFileCodes.has(r.fileCode.toUpperCase())
        )
      : rows;

    const newFiles: OfficeFile[] = filteredRows.map((row) => ({
      id: generateId('file'),
      sno: row.sno || undefined,
      title: row.title,
      fileCode: row.fileCode,
      category,
      locationId,
      positionDetail: '',
      status: 'stored',
      checkedOutTo: '',
      checkedOutAt: null,
      tags: [],
      notes: '',
      createdAt: now,
      updatedAt: now,
    }));

    setExcelModalOpen(false);
    persistFiles(
      [...newFiles, ...data.files],
      `Imported ${newFiles.length} files from Excel into files.bson`
    );
  };

  const renderStoredOnPath = (file: OfficeFile) => {
    const pathChain = getLocationPath(file.locationId, locationMap);
    if (pathChain.length === 0) {
      return (
        <span className="text-xs text-muted-foreground">
          Not placed yet
        </span>
      );
    }

    return (
      <div className="flex flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-1 text-xs font-semibold text-foreground">
          {pathChain.map((loc, idx) => (
            <span key={loc.id} className="inline-flex items-center gap-1">
              {idx > 0 && <span className="text-slate-400">›</span>}
              <button
                type="button"
                onClick={() => {
                  setSelectedLocationId(loc.id);
                  setActiveTab('map');
                }}
                className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 transition-colors hover:bg-slate-200/80 hover:text-primary cursor-pointer"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: loc.color }}
                />
                {loc.name}
                {loc.code && loc.code !== loc.name ? ` (${loc.code})` : ''}
              </button>
            </span>
          ))}
        </div>
        {file.positionDetail && (
          <span className="pl-1 text-[11.5px] text-slate-600">
            Spot: {file.positionDetail}
          </span>
        )}
      </div>
    );
  };

  const renderFileTable = (list: OfficeFile[]) => (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50/80 text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">File Number</th>
              <th className="px-4 py-3">File Name</th>
              <th className="px-4 py-3">Stored On</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((file) => {
              const isCheckedOut = file.status === 'checked_out';
              const isArchived = file.status === 'archived';

              return (
                <tr
                  key={file.id}
                  className={cn(
                    'transition-colors hover:bg-slate-50/70',
                    isCheckedOut && 'bg-amber-50/30'
                  )}
                >
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    {file.fileCode ? (
                      <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold tracking-wide text-primary">
                        {file.fileCode}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>

                  <td className="px-4 py-3 align-top">
                    <div className="font-semibold text-foreground">{file.title}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span>{file.category}</span>
                      {file.notes && <span>• {file.notes}</span>}
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">{renderStoredOnPath(file)}</td>

                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    <Badge
                      variant={
                        isCheckedOut ? 'warning' : isArchived ? 'muted' : 'success'
                      }
                    >
                      {isCheckedOut
                        ? `With ${file.checkedOutTo || 'Someone'}`
                        : isArchived
                        ? 'Archived'
                        : 'In Place'}
                    </Badge>
                  </td>

                  <td className="px-4 py-3 align-top text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      {isCheckedOut ? (
                        <Button
                          type="button"
                          size="xs"
                          variant="outline"
                          onClick={() => handleReturnFile(file)}
                          className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        >
                          <RotateCcw size={12} />
                          Put Back
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          size="xs"
                          variant="outline"
                          onClick={() => setCheckoutFile(file)}
                        >
                          <LogOut size={12} />
                          Take Out
                        </Button>
                      )}
                      <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        onClick={() => setFileModal({ open: true, existing: file })}
                      >
                        <Edit2 size={12} />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="xs"
                        variant="ghost"
                        onClick={() => handleDeleteFile(file)}
                        title="Delete file"
                        className="text-slate-400 hover:bg-red-50 hover:text-destructive"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );

  const renderFileCard = (file: OfficeFile) => {
    const isCheckedOut = file.status === 'checked_out';
    const isArchived = file.status === 'archived';

    return (
      <Card
        key={file.id}
        className={cn(
          'flex flex-col gap-3 p-4 transition-shadow hover:shadow-md',
          isCheckedOut && 'border-l-4 border-l-amber-500'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            {file.fileCode && (
              <span className="self-start rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold tracking-wide text-primary">
                {file.fileCode}
              </span>
            )}
            <h3 className="text-[15px] font-semibold leading-snug text-foreground break-words">
              {file.title}
            </h3>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <Badge variant="secondary">{file.category}</Badge>
            <Badge
              variant={
                isCheckedOut ? 'warning' : isArchived ? 'muted' : 'success'
              }
            >
              {isCheckedOut
                ? `With ${file.checkedOutTo || 'Someone'}`
                : isArchived
                ? 'Archived'
                : 'In Place'}
            </Badge>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-lg border border-border bg-slate-50 px-3 py-2.5">
          <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
              Stored On
            </span>
            {renderStoredOnPath(file)}
          </div>
        </div>

        {(file.notes || file.tags.length > 0) && (
          <div className="flex flex-col gap-1.5">
            {file.notes && <p className="text-xs text-muted-foreground">{file.notes}</p>}
            {file.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {file.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-foreground cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
          <span className="text-[11px] text-slate-400">
            {isCheckedOut && file.checkedOutAt
              ? `Taken ${formatShortDate(file.checkedOutAt)}`
              : `Saved ${formatShortDate(file.updatedAt)}`}
          </span>

          <div className="flex items-center gap-1.5">
            {isCheckedOut ? (
              <Button
                type="button"
                size="xs"
                variant="outline"
                onClick={() => handleReturnFile(file)}
                className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              >
                <RotateCcw size={13} />
                Put Back
              </Button>
            ) : (
              <Button
                type="button"
                size="xs"
                variant="outline"
                onClick={() => setCheckoutFile(file)}
              >
                <LogOut size={13} />
                Take Out
              </Button>
            )}
            <Button
              type="button"
              size="xs"
              variant="outline"
              onClick={() => setFileModal({ open: true, existing: file })}
            >
              <Edit2 size={13} />
              Edit
            </Button>
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={() => handleDeleteFile(file)}
              title="Delete file"
              className="text-slate-400 hover:bg-red-50 hover:text-destructive"
            >
              <Trash2 size={13} />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
        <Database size={28} />
        <p className="text-sm font-medium">Loading BSON FileMap database...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col gap-5 border-r border-border bg-card px-3.5 py-4">
        <div className="flex items-center gap-3 px-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <MapPin size={19} />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight tracking-tight">FileMap</h1>
            <span className="text-[11.5px] text-muted-foreground">
              Office File Locator
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
              activeTab === 'files'
                ? 'bg-accent font-semibold text-accent-foreground'
                : 'text-slate-600 hover:bg-secondary hover:text-foreground'
            )}
          >
            <FileText size={16} />
            <span>Find Files</span>
            <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              {stats.totalFiles}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
              activeTab === 'map'
                ? 'bg-accent font-semibold text-accent-foreground'
                : 'text-slate-600 hover:bg-secondary hover:text-foreground'
            )}
          >
            <FolderTree size={16} />
            <span>Office Places</span>
            <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              {stats.totalLocations}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blueprint')}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
              activeTab === 'blueprint'
                ? 'bg-accent font-semibold text-accent-foreground'
                : 'text-slate-600 hover:bg-secondary hover:text-foreground'
            )}
          >
            <LayoutTemplate size={16} />
            <span>Office Blueprint</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('checked_out')}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
              activeTab === 'checked_out'
                ? 'bg-accent font-semibold text-accent-foreground'
                : 'text-slate-600 hover:bg-secondary hover:text-foreground'
            )}
          >
            <UserCheck size={16} />
            <span>Taken Out</span>
            {stats.checkedOut > 0 && (
              <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                {stats.checkedOut}
              </span>
            )}
          </button>
        </nav>

        {categoriesInUse.length > 0 && activeTab === 'files' && (
          <div className="flex-1 overflow-y-auto border-t border-slate-100 pt-3">
            <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Categories
            </div>
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors cursor-pointer',
                  categoryFilter === 'all'
                    ? 'bg-secondary font-semibold text-foreground'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-foreground'
                )}
              >
                All Categories
              </button>
              {categoriesInUse.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    'rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors cursor-pointer',
                    categoryFilter === cat
                      ? 'bg-secondary font-semibold text-foreground'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-foreground'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Admin / Employee Sync Card */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="rounded-xl border border-border bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5">
                {syncStatus.role === 'admin' ? (
                  <Server size={14} className="text-emerald-600" />
                ) : syncStatus.role === 'employee' && !syncStatus.adminOnline ? (
                  <WifiOff size={14} className="text-amber-600" />
                ) : (
                  <Wifi size={14} className="text-primary" />
                )}
                {syncStatus.role === 'admin'
                  ? 'Admin Server'
                  : syncStatus.role === 'employee'
                  ? 'Employee Sync'
                  : 'Local Mode'}
              </span>
              <button
                type="button"
                onClick={() => setSyncModalOpen(true)}
                className="rounded px-1.5 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 cursor-pointer"
              >
                Setup
              </button>
            </div>

            {syncStatus.role === 'admin' && (
              <p className="mt-1 truncate text-[11px] text-emerald-700">
                IP: {syncStatus.localIps[0] ?? 'localhost'}:{syncStatus.port}
              </p>
            )}

            {syncStatus.role === 'employee' && (
              <div className="mt-1.5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={
                      syncStatus.adminOnline ? 'text-emerald-700' : 'text-amber-700'
                    }
                  >
                    {syncStatus.adminOnline ? 'Admin Online' : 'Admin Offline'}
                  </span>
                  {syncStatus.pendingCount > 0 && (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                      {syncStatus.pendingCount} queued
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={handleDownloadFromAdmin}
                    className="inline-flex items-center justify-center gap-1 rounded border border-border bg-card px-1.5 py-1 text-[10.5px] font-medium hover:bg-secondary cursor-pointer"
                  >
                    <Download size={11} />
                    Pull BSON
                  </button>
                  <button
                    type="button"
                    onClick={handleSyncNow}
                    className="inline-flex items-center justify-center gap-1 rounded border border-border bg-card px-1.5 py-1 text-[10.5px] font-medium hover:bg-secondary cursor-pointer"
                  >
                    <RefreshCw size={11} />
                    Sync
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Separate BSON Storage Card */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-slate-50 p-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5">
              <HardDrive size={14} className="text-primary" />
              BSON Files
            </span>
            <button
              type="button"
              onClick={() => window.fileMapApi.openDataFolder()}
              title={storageInfo?.folderPath ?? 'Open BSON folder'}
              className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 cursor-pointer"
            >
              <FolderOpen size={12} />
              Folder
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-card px-2 py-1.5 text-[11px]">
            <div className="min-w-0">
              <div className="font-semibold text-foreground">blueprint.bson</div>
              <div className="text-[10px] text-muted-foreground">
                {storageInfo ? formatBytes(storageInfo.blueprint.sizeBytes) : '—'}
              </div>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => handleImportBson('blueprint')}
                title="Import blueprint.bson"
                className="rounded border border-border px-1.5 py-0.5 text-[10.5px] hover:bg-secondary cursor-pointer"
              >
                <Upload size={11} />
              </button>
              <button
                type="button"
                onClick={() => handleExportBson('blueprint')}
                title="Export blueprint.bson"
                className="rounded border border-border px-1.5 py-0.5 text-[10.5px] hover:bg-secondary cursor-pointer"
              >
                <Download size={11} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-card px-2 py-1.5 text-[11px]">
            <div className="min-w-0">
              <div className="font-semibold text-foreground">files.bson</div>
              <div className="text-[10px] text-muted-foreground">
                {storageInfo ? formatBytes(storageInfo.files.sizeBytes) : '—'}
              </div>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => handleImportBson('files')}
                title="Import files.bson"
                className="rounded border border-border px-1.5 py-0.5 text-[10.5px] hover:bg-secondary cursor-pointer"
              >
                <Upload size={11} />
              </button>
              <button
                type="button"
                onClick={() => handleExportBson('files')}
                title="Export files.bson"
                className="rounded border border-border px-1.5 py-0.5 text-[10.5px] hover:bg-secondary cursor-pointer"
              >
                <Download size={11} />
              </button>
            </div>
          </div>
        </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-3.5">
          <div className="relative flex max-w-xl flex-1 items-center">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 text-muted-foreground"
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search file name, file number (FIN-014), or where it is stored..."
              className="bg-slate-50 pl-9 pr-16 focus-visible:bg-card"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 rounded bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:bg-slate-300 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleUploadExcel}
            >
              <FileSpreadsheet size={15} className="text-emerald-600" />
              Upload Excel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocationModal({ open: true })}
            >
              <Plus size={15} />
              Add Place
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFileModal({
                  open: true,
                  defaultLocationId: activeTab === 'map' ? selectedLocationId : null,
                })
              }
            >
              <Plus size={15} />
              Add File
            </Button>
          </div>
        </header>

        {activeTab === 'blueprint' ? (
          <OfficeBlueprint
            locations={data.locations}
            files={data.files}
            selectedLocationId={selectedLocationId}
            searchQuery={searchQuery}
            onSelectLocation={setSelectedLocationId}
            onUpdateLocationRect={handleUpdateLocationRect}
            onUpdateLocationOpenings={handleUpdateLocationOpenings}
            onAutoArrange={handleAutoArrangeBlueprint}
            onAddPlace={(type, parentId) =>
              setLocationModal({
                open: true,
                defaultType: type,
                defaultParentId: parentId ?? null,
              })
            }
            onEditLocation={(loc) => setLocationModal({ open: true, existing: loc })}
            onAddFileHere={(locId) =>
              setFileModal({ open: true, defaultLocationId: locId })
            }
            onEditFile={(file) => setFileModal({ open: true, existing: file })}
          />
        ) : activeTab !== 'map' ? (
          <section className="flex-1 overflow-y-auto p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  {activeTab === 'checked_out'
                    ? 'Files Currently Taken Out'
                    : 'All Office Files'}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {filteredFiles.length}{' '}
                  {filteredFiles.length === 1 ? 'file' : 'files'} shown
                  {searchQuery ? ` matching "${searchQuery}"` : ''}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {activeTab === 'files' && (
                  <div className="inline-flex gap-1 rounded-lg bg-slate-200/80 p-1">
                    {(
                      [
                        ['all', 'All'],
                        ['unplaced', 'Not Placed'],
                        ['stored', 'In Place'],
                        ['checked_out', 'Taken Out'],
                        ['archived', 'Archived'],
                      ] as const
                    ).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setStatusFilter(val)}
                        className={cn(
                          'rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer',
                          statusFilter === val
                            ? 'bg-card font-semibold text-foreground shadow-xs'
                            : 'text-slate-600 hover:text-foreground'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="inline-flex gap-1 rounded-lg bg-slate-200/80 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    title="Table view"
                    className={cn(
                      'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer',
                      viewMode === 'table'
                        ? 'bg-card font-semibold text-foreground shadow-xs'
                        : 'text-slate-600 hover:text-foreground'
                    )}
                  >
                    <List size={14} />
                    Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('cards')}
                    title="Card view"
                    className={cn(
                      'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer',
                      viewMode === 'cards'
                        ? 'bg-card font-semibold text-foreground shadow-xs'
                        : 'text-slate-600 hover:text-foreground'
                    )}
                  >
                    <LayoutGrid size={14} />
                    Cards
                  </button>
                </div>
              </div>
            </div>

            {data.files.length === 0 && data.locations.length === 0 ? (
              <Card className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 border-dashed p-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Find Any Office File in Seconds</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Track <strong>File Name</strong>, <strong>File Number</strong>, and{' '}
                    <strong>Stored On</strong> in a local <code>.bson</code> file.
                  </p>
                </div>

                <div className="grid w-full grid-cols-3 gap-2.5 text-left">
                  <div className="rounded-lg border border-border bg-slate-50 p-3">
                    <div className="text-xs font-bold text-primary">1. Add Places</div>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      Rooms, cabinets, shelves, or boxes.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-slate-50 p-3">
                    <div className="text-xs font-bold text-primary">2. Add Files</div>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      Save File Name, File Number & Stored On.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-slate-50 p-3">
                    <div className="text-xs font-bold text-primary">3. Search</div>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      Instantly see where any file is stored.
                    </p>
                  </div>
                </div>

                <div className="mt-1 flex flex-wrap justify-center gap-2.5">
                  <Button onClick={handleUploadExcel}>
                    <FileSpreadsheet size={15} />
                    Upload Excel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setLocationModal({ open: true })}
                  >
                    <Plus size={15} />
                    Add First Place
                  </Button>
                  <Button variant="outline" onClick={handleLoadSample}>
                    <Sparkles size={15} />
                    Load Sample Office
                  </Button>
                </div>
              </Card>
            ) : filteredFiles.length === 0 ? (
              <Card className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 border-dashed p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No files match your search or filter.
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setCategoryFilter('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </Card>
            ) : viewMode === 'table' ? (
              renderFileTable(filteredFiles)
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3.5">
                {filteredFiles.map(renderFileCard)}
              </div>
            )}
          </section>
        ) : (
          <section className="grid min-h-0 flex-1 grid-cols-[310px_1fr] overflow-hidden">
            <div className="flex flex-col overflow-y-auto border-r border-border bg-card">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
                <h3 className="text-sm font-bold">Office Map</h3>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => setLocationModal({ open: true })}
                >
                  <Plus size={13} />
                  New Room / Place
                </Button>
              </div>
              <LocationTree
                locations={data.locations}
                files={data.files}
                selectedLocationId={selectedLocationId}
                onSelectLocation={setSelectedLocationId}
                onAddChildLocation={(parentId) =>
                  setLocationModal({ open: true, defaultParentId: parentId })
                }
                onEditLocation={(loc) => setLocationModal({ open: true, existing: loc })}
              />
            </div>

            <div className="flex flex-col gap-5 overflow-y-auto p-6">
              {selectedLocation ? (
                <>
                  <Card className="flex flex-wrap items-start justify-between gap-4 p-5">
                    <div className="flex items-start gap-3.5">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${selectedLocation.color}18` }}
                      >
                        <LocationIcon
                          type={selectedLocation.type}
                          size={22}
                          color={selectedLocation.color}
                        />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          {getLocationBreadcrumb(selectedLocation.id, locationMap)}
                        </div>
                        <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
                        {selectedLocation.notes && (
                          <p className="mt-1 text-xs text-slate-600">
                            {selectedLocation.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setLocationModal({
                            open: true,
                            defaultParentId: selectedLocation.id,
                          })
                        }
                      >
                        <Plus size={14} />
                        Add Inside
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          setFileModal({
                            open: true,
                            defaultLocationId: selectedLocation.id,
                          })
                        }
                      >
                        <Plus size={14} />
                        Add File Here
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setLocationModal({ open: true, existing: selectedLocation })
                        }
                        title="Edit place"
                      >
                        <Edit2 size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteLocation(selectedLocation)}
                        title="Delete place"
                        className="text-slate-400 hover:bg-red-50 hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </Card>

                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-slate-700">
                      Files stored on {selectedLocation.name} ({filesInSelectedLocation.length})
                    </h4>
                    {filesInSelectedLocation.length === 0 ? (
                      <Card className="flex flex-col items-center gap-3 border-dashed p-8 text-center">
                        <p className="text-sm text-muted-foreground">
                          No files stored here yet.
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setFileModal({
                              open: true,
                              defaultLocationId: selectedLocation.id,
                            })
                          }
                        >
                          <Plus size={14} />
                          Add File Here
                        </Button>
                      </Card>
                    ) : (
                      renderFileTable(filesInSelectedLocation)
                    )}
                  </div>
                </>
              ) : (
                <Card className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 border-dashed p-8 text-center">
                  <h3 className="text-base font-bold">Select or Add an Office Place</h3>
                  <p className="text-xs text-muted-foreground">
                    Organize your office into Rooms, Cabinets, Shelves, Drawers, and Boxes.
                  </p>
                  <Button onClick={() => setLocationModal({ open: true })}>
                    <Plus size={15} />
                    Add First Place
                  </Button>
                </Card>
              )}
            </div>
          </section>
        )}
      </main>

      {locationModal.open && (
        <LocationModal
          existing={locationModal.existing}
          defaultParentId={locationModal.defaultParentId}
          defaultType={locationModal.defaultType}
          locations={data.locations}
          onSave={handleSaveLocation}
          onClose={() => setLocationModal({ open: false })}
        />
      )}

      {fileModal.open && (
        <FileModal
          existing={fileModal.existing}
          defaultLocationId={fileModal.defaultLocationId}
          locations={data.locations}
          onSave={handleSaveFile}
          onClose={() => setFileModal({ open: false })}
        />
      )}

      {checkoutFile && (
        <CheckoutModal
          file={checkoutFile}
          onConfirm={handleCheckoutConfirm}
          onClose={() => setCheckoutFile(null)}
        />
      )}

      {excelModalOpen && (
        <ExcelImportModal
          locations={data.locations}
          existingFileCodes={existingFileCodes}
          onConfirm={handleConfirmExcelImport}
          onNotify={showToast}
          onClose={() => setExcelModalOpen(false)}
        />
      )}

      {syncModalOpen && (
        <SyncModal
          status={syncStatus}
          onSaveConfig={handleSaveSyncConfig}
          onDownloadFromAdmin={handleDownloadFromAdmin}
          onSyncNow={handleSyncNow}
          onClose={() => setSyncModalOpen(false)}
        />
      )}

      {toast && (
        <div className="fixed bottom-5 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-lg">
          <CheckCircle2 size={15} className="text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default App;
