import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';
import { BsonStore } from './bsonStore';
import { SyncManager } from './syncManager';
import type {
  ExcelImportRow,
  OfficeFile,
  OfficeLocation,
  SyncConfig,
} from '../src/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null = null
let store: BsonStore | null = null
let syncManager: SyncManager | null = null

function getStore(): BsonStore {
  if (!store) {
    store = new BsonStore(app.getPath('userData'))
  }
  return store
}

function getSyncManager(): SyncManager {
  if (!syncManager) {
    syncManager = new SyncManager(getStore(), {
      onDataUpdated: (data) => {
        win?.webContents.send('filemap:data-updated', data)
      },
      onStatusChanged: (status) => {
        win?.webContents.send('filemap:sync-status-changed', status)
      },
    })
  }
  return syncManager
}

function registerIpcHandlers() {
  ipcMain.handle('filemap:load', async () => {
    return getStore().load()
  })

  ipcMain.handle('filemap:save-blueprint', async (_event, locations: OfficeLocation[]) => {
    const info = await getStore().saveBlueprint(locations)
    await getSyncManager().enqueueOperation({
      id: `op_${Date.now().toString(36)}`,
      timestamp: new Date().toISOString(),
      type: 'replace_blueprint',
      locations,
    })
    return info
  })

  ipcMain.handle('filemap:save-files', async (_event, files: OfficeFile[]) => {
    const info = await getStore().saveFiles(files)
    await getSyncManager().enqueueOperation({
      id: `op_${Date.now().toString(36)}`,
      timestamp: new Date().toISOString(),
      type: 'replace_files',
      files,
    })
    return info
  })

  ipcMain.handle('filemap:sync-status', async () => {
    return getSyncManager().getStatus()
  })

  ipcMain.handle('filemap:set-sync-config', async (_event, config: SyncConfig) => {
    return getSyncManager().setConfig(config)
  })

  ipcMain.handle('filemap:download-from-admin', async () => {
    return getSyncManager().downloadFromAdmin()
  })

  ipcMain.handle('filemap:sync-now', async () => {
    return getSyncManager().syncNow()
  })

  ipcMain.handle('filemap:storage-info', async () => {
    return getStore().getStorageInfo()
  })

  ipcMain.handle('filemap:open-data-folder', async () => {
    const filePath = getStore().getFilesPath()
    shell.showItemInFolder(filePath)
  })

  ipcMain.handle('filemap:export-bson', async (_event, target: 'blueprint' | 'files') => {
    const targetWin = win ?? BrowserWindow.getFocusedWindow()
    const prefix = target === 'blueprint' ? 'blueprint' : 'files'
    const options: Electron.SaveDialogOptions = {
      title: `Export ${target === 'blueprint' ? 'Blueprint' : 'Files'} as BSON`,
      defaultPath: `${prefix}-${new Date().toISOString().slice(0, 10)}.bson`,
      filters: [{ name: 'BSON Database', extensions: ['bson'] }],
    }
    const result = targetWin
      ? await dialog.showSaveDialog(targetWin, options)
      : await dialog.showSaveDialog(options)
    if (result.canceled || !result.filePath) {
      return { canceled: true }
    }
    await getStore().exportToFile(target, result.filePath)
    return { canceled: false, target, filePath: result.filePath }
  })

  ipcMain.handle('filemap:import-bson', async (_event, target: 'blueprint' | 'files') => {
    const targetWin = win ?? BrowserWindow.getFocusedWindow()
    const options: Electron.OpenDialogOptions = {
      title: `Import ${target === 'blueprint' ? 'Blueprint' : 'Files'} BSON`,
      properties: ['openFile'],
      filters: [{ name: 'BSON Database', extensions: ['bson'] }],
    }
    const result = targetWin
      ? await dialog.showOpenDialog(targetWin, options)
      : await dialog.showOpenDialog(options)
    if (result.canceled || result.filePaths.length === 0) {
      return { canceled: true }
    }
    const imported = await getStore().importFromFile(target, result.filePaths[0])
    return {
      canceled: false,
      target,
      filePath: result.filePaths[0],
      locations: imported.locations,
      files: imported.files,
    }
  })

  ipcMain.handle('filemap:download-sample-excel', async () => {
    const targetWin = win ?? BrowserWindow.getFocusedWindow()
    const options: Electron.SaveDialogOptions = {
      title: 'Save Sample Excel Template',
      defaultPath: 'filemap-sample.xlsx',
      filters: [{ name: 'Excel Workbook', extensions: ['xlsx'] }],
    }
    const result = targetWin
      ? await dialog.showSaveDialog(targetWin, options)
      : await dialog.showSaveDialog(options)
    if (result.canceled || !result.filePath) {
      return { canceled: true }
    }

    const sampleRows = [
      { sno: 1, filename: 'GST Returns FY 2025-26', 'file number': 'FIN-014' },
      { sno: 2, filename: 'Vendor Invoices Q3', 'file number': 'VND-089' },
      { sno: 3, filename: 'Employee Offer Letters & NDAs', 'file number': 'HR-021' },
    ]
    const worksheet = XLSX.utils.json_to_sheet(sampleRows)
    worksheet['!cols'] = [{ wch: 8 }, { wch: 36 }, { wch: 16 }]
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Files')
    XLSX.writeFile(workbook, result.filePath)

    return { canceled: false, filePath: result.filePath }
  })

  ipcMain.handle('filemap:import-excel', async () => {
    const targetWin = win ?? BrowserWindow.getFocusedWindow()
    const options: Electron.OpenDialogOptions = {
      title: 'Upload Excel / CSV File List',
      properties: ['openFile'],
      filters: [
        { name: 'Excel & CSV Files', extensions: ['xlsx', 'xls', 'csv'] },
      ],
    }
    const result = targetWin
      ? await dialog.showOpenDialog(targetWin, options)
      : await dialog.showOpenDialog(options)
    if (result.canceled || result.filePaths.length === 0) {
      return { canceled: true }
    }

    const filePath = result.filePaths[0]
    try {
      const workbook = XLSX.readFile(filePath)
      const firstSheetName = workbook.SheetNames[0]
      if (!firstSheetName) {
        return { canceled: false, filePath, error: 'Excel file has no sheets.' }
      }
      const sheet = workbook.Sheets[firstSheetName]
      const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
        defval: '',
      })

      const normalizeKey = (k: string) =>
        k.toLowerCase().replace(/[\s._-]+/g, '')

      const rows: ExcelImportRow[] = []

      for (const raw of rawRows) {
        const entries = Object.entries(raw)
        let sno = ''
        let title = ''
        let fileCode = ''

        for (const [k, v] of entries) {
          const nk = normalizeKey(k)
          const val = String(v ?? '').trim()
          if (!sno && ['sno', 'slno', 'srno', 'serial', 'serialno', 'serialnumber'].includes(nk)) {
            sno = val
          } else if (
            !title &&
            ['filename', 'name', 'title', 'file', 'document', 'documentname'].includes(nk)
          ) {
            title = val
          } else if (
            !fileCode &&
            ['filenumber', 'fileno', 'filecode', 'number', 'code', 'ref', 'refno'].includes(nk)
          ) {
            fileCode = val
          }
        }

        // Positional fallback if headers didn't match standard names
        if (!title && entries.length >= 2) {
          const vals = entries.map(([, v]) => String(v ?? '').trim())
          if (entries.length >= 3) {
            sno = sno || vals[0]
            title = vals[1]
            fileCode = fileCode || vals[2]
          } else {
            title = vals[0]
            fileCode = fileCode || vals[1]
          }
        }

        if (title || fileCode) {
          rows.push({
            sno,
            title: title || `File ${fileCode}`,
            fileCode: fileCode.toUpperCase(),
          })
        }
      }

      return {
        canceled: false,
        filePath,
        fileName: path.basename(filePath),
        rows,
      }
    } catch (err) {
      return {
        canceled: false,
        filePath,
        error: err instanceof Error ? err.message : 'Failed to read Excel file',
      }
    }
  })
}

function createWindow() {
  win = new BrowserWindow({
    title: 'FileMap — Office File Locator',
    width: 1240,
    height: 800,
    minWidth: 940,
    minHeight: 620,
    backgroundColor: '#f8fafc',
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.setMenuBarVisibility(false)

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    void syncManager?.dispose()
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(async () => {
  registerIpcHandlers()
  await getSyncManager().init()
  createWindow()
})
