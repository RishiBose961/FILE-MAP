export type LocationType = 'room' | 'cabinet' | 'shelf' | 'drawer' | 'box' | 'desk';

export type FileStatus = 'stored' | 'checked_out' | 'archived';

export type WallSide = 'top' | 'bottom' | 'left' | 'right';

export interface RoomOpening {
  id: string;
  kind: 'door' | 'window';
  wall: WallSide;
  position: number; // 0 to 100 (% along the wall)
  width: number;
}

export interface BlueprintRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface OfficeLocation {
  id: string;
  name: string;
  type: LocationType;
  parentId: string | null;
  code: string;
  color: string;
  notes: string;
  blueprint?: BlueprintRect;
  openings?: RoomOpening[];
  createdAt: string;
  updatedAt: string;
}

export interface OfficeFile {
  id: string;
  sno?: string;
  title: string;
  fileCode: string;
  category: string;
  locationId: string | null;
  positionDetail: string;
  status: FileStatus;
  checkedOutTo: string;
  checkedOutAt: string | null;
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileMapData {
  version: number;
  updatedAt: string;
  locations: OfficeLocation[];
  files: OfficeFile[];
}

export interface SingleBsonInfo {
  filePath: string;
  sizeBytes: number;
  exists: boolean;
  lastModified: string | null;
}

export interface StorageInfo {
  folderPath: string;
  blueprint: SingleBsonInfo;
  files: SingleBsonInfo;
}

export interface BsonTransferResult {
  canceled?: boolean;
  filePath?: string;
  target?: 'blueprint' | 'files';
  locations?: OfficeLocation[];
  files?: OfficeFile[];
}

export interface ExcelImportRow {
  sno: string;
  title: string;
  fileCode: string;
}

export interface ExcelImportResult {
  canceled?: boolean;
  filePath?: string;
  fileName?: string;
  rows?: ExcelImportRow[];
  error?: string;
}

export type SyncRole = 'standalone' | 'admin' | 'employee';

export interface SyncConfig {
  role: SyncRole;
  adminIp: string;
  port: number;
}

export type SyncOperation =
  | { id: string; timestamp: string; type: 'upsert_file'; file: OfficeFile }
  | { id: string; timestamp: string; type: 'delete_file'; fileId: string }
  | { id: string; timestamp: string; type: 'upsert_location'; location: OfficeLocation }
  | { id: string; timestamp: string; type: 'delete_location'; locationId: string }
  | { id: string; timestamp: string; type: 'replace_files'; files: OfficeFile[] }
  | { id: string; timestamp: string; type: 'replace_blueprint'; locations: OfficeLocation[] };

export interface SyncStatus {
  role: SyncRole;
  adminIp: string;
  port: number;
  serverRunning: boolean;
  localIps: string[];
  adminOnline: boolean;
  pendingCount: number;
  lastSyncedAt: string | null;
  lastError: string | null;
}

export interface FileMapApi {
  loadData: () => Promise<FileMapData>;
  saveBlueprint: (locations: OfficeLocation[]) => Promise<StorageInfo>;
  saveFiles: (files: OfficeFile[]) => Promise<StorageInfo>;
  exportBson: (target: 'blueprint' | 'files') => Promise<BsonTransferResult>;
  importBson: (target: 'blueprint' | 'files') => Promise<BsonTransferResult>;
  importExcel: () => Promise<ExcelImportResult>;
  downloadSampleExcel: () => Promise<{ canceled?: boolean; filePath?: string }>;
  getStorageInfo: () => Promise<StorageInfo>;
  openDataFolder: () => Promise<void>;
  getSyncStatus: () => Promise<SyncStatus>;
  setSyncConfig: (config: SyncConfig) => Promise<SyncStatus>;
  downloadFromAdmin: () => Promise<{ ok: boolean; error?: string; data?: FileMapData }>;
  syncNow: () => Promise<{ ok: boolean; syncedCount: number; error?: string; data?: FileMapData }>;
  onDataUpdated: (cb: (data: FileMapData) => void) => () => void;
  onSyncStatusChanged: (cb: (status: SyncStatus) => void) => () => void;
}

declare global {
  interface Window {
    fileMapApi: FileMapApi;
  }
}
