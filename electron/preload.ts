import { ipcRenderer, contextBridge } from 'electron'
import type {
  AppSettings,
  FileMapApi,
  FileMapData,
  OfficeFile,
  OfficeLocation,
  SyncConfig,
  SyncStatus,
} from '../src/types'

const fileMapApi: FileMapApi = {
  loadData: () => ipcRenderer.invoke('filemap:load'),
  saveBlueprint: (locations: OfficeLocation[]) =>
    ipcRenderer.invoke('filemap:save-blueprint', locations),
  saveFiles: (files: OfficeFile[]) => ipcRenderer.invoke('filemap:save-files', files),
  exportBson: (target: 'blueprint' | 'files') =>
    ipcRenderer.invoke('filemap:export-bson', target),
  importBson: (target: 'blueprint' | 'files') =>
    ipcRenderer.invoke('filemap:import-bson', target),
  importExcel: () => ipcRenderer.invoke('filemap:import-excel'),
  downloadSampleExcel: () => ipcRenderer.invoke('filemap:download-sample-excel'),
  getStorageInfo: () => ipcRenderer.invoke('filemap:storage-info'),
  openDataFolder: () => ipcRenderer.invoke('filemap:open-data-folder'),
  getSyncStatus: () => ipcRenderer.invoke('filemap:sync-status'),
  setSyncConfig: (config: SyncConfig) =>
    ipcRenderer.invoke('filemap:set-sync-config', config),
  getAppSettings: () => ipcRenderer.invoke('filemap:get-app-settings'),
  setAppSettings: (settings: AppSettings) =>
    ipcRenderer.invoke('filemap:set-app-settings', settings),
  downloadFromAdmin: () => ipcRenderer.invoke('filemap:download-from-admin'),
  syncNow: () => ipcRenderer.invoke('filemap:sync-now'),
  onDataUpdated: (cb: (data: FileMapData) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, data: FileMapData) => cb(data)
    ipcRenderer.on('filemap:data-updated', listener)
    return () => ipcRenderer.off('filemap:data-updated', listener)
  },
  onSyncStatusChanged: (cb: (status: SyncStatus) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, status: SyncStatus) =>
      cb(status)
    ipcRenderer.on('filemap:sync-status-changed', listener)
    return () => ipcRenderer.off('filemap:sync-status-changed', listener)
  },
}

contextBridge.exposeInMainWorld('fileMapApi', fileMapApi)

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})
