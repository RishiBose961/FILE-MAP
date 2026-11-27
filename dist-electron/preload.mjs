"use strict";
const electron = require("electron");
const fileMapApi = {
  loadData: () => electron.ipcRenderer.invoke("filemap:load"),
  saveBlueprint: (locations) => electron.ipcRenderer.invoke("filemap:save-blueprint", locations),
  saveFiles: (files) => electron.ipcRenderer.invoke("filemap:save-files", files),
  exportBson: (target) => electron.ipcRenderer.invoke("filemap:export-bson", target),
  importBson: (target) => electron.ipcRenderer.invoke("filemap:import-bson", target),
  importExcel: () => electron.ipcRenderer.invoke("filemap:import-excel"),
  downloadSampleExcel: () => electron.ipcRenderer.invoke("filemap:download-sample-excel"),
  getStorageInfo: () => electron.ipcRenderer.invoke("filemap:storage-info"),
  openDataFolder: () => electron.ipcRenderer.invoke("filemap:open-data-folder"),
  getSyncStatus: () => electron.ipcRenderer.invoke("filemap:sync-status"),
  setSyncConfig: (config) => electron.ipcRenderer.invoke("filemap:set-sync-config", config),
  downloadFromAdmin: () => electron.ipcRenderer.invoke("filemap:download-from-admin"),
  syncNow: () => electron.ipcRenderer.invoke("filemap:sync-now"),
  onDataUpdated: (cb) => {
    const listener = (_event, data) => cb(data);
    electron.ipcRenderer.on("filemap:data-updated", listener);
    return () => electron.ipcRenderer.off("filemap:data-updated", listener);
  },
  onSyncStatusChanged: (cb) => {
    const listener = (_event, status) => cb(status);
    electron.ipcRenderer.on("filemap:sync-status-changed", listener);
    return () => electron.ipcRenderer.off("filemap:sync-status-changed", listener);
  }
};
electron.contextBridge.exposeInMainWorld("fileMapApi", fileMapApi);
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
});
