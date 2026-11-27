import { app, BrowserWindow, dialog, ipcMain, Menu, nativeImage, shell, Tray } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';
import { BsonStore } from './bsonStore';
import { SyncManager } from './syncManager';
import type {
  AppSettings,
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
let tray: Tray | null = null
let store: BsonStore | null = null
let syncManager: SyncManager | null = null
let appSettings: AppSettings = { autoStartOnBoot: false, runInBackground: true }
let isQuitting = false

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

  ipcMain.handle('filemap:get-app-settings', async () => {
    return appSettings
  })

  ipcMain.handle('filemap:set-app-settings', async (_event, next: AppSettings) => {
    appSettings = {
      autoStartOnBoot: Boolean(next.autoStartOnBoot),
      runInBackground: Boolean(next.runInBackground),
    }
    await getStore().saveAppSettings(appSettings)
    applyAutoStart(appSettings.autoStartOnBoot)
    updateTrayMenu()
    return appSettings
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
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }) as Buffer
    await fs.writeFile(result.filePath, buffer)

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
      const buffer = await fs.readFile(filePath)
      const workbook = XLSX.read(buffer, { type: 'buffer' })
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
            !fileCode &&
            ['filenumber', 'fileno', 'filecode', 'filenum', 'fnum', 'fno', 'docno', 'number', 'code', 'ref', 'refno'].includes(nk)
          ) {
            fileCode = val
          } else if (
            !title &&
            ['filename', 'name', 'title', 'particulars', 'subject', 'description', 'details', 'document', 'documentname', 'file'].includes(nk)
          ) {
            title = val
          }
        }

        // Positional fallback only for columns not already matched by header
        if (!title && entries.length >= 2) {
          const unusedVals = entries
            .map(([, v]) => String(v ?? '').trim())
            .filter((val) => val !== sno && val !== fileCode)
          if (!sno && !fileCode && entries.length >= 3) {
            sno = unusedVals[0] ?? ''
            title = unusedVals[1] ?? ''
            fileCode = unusedVals[2] ?? ''
          } else if (unusedVals.length > 0) {
            title = unusedVals[0]
            if (!fileCode && unusedVals.length > 1) {
              fileCode = unusedVals[1]
            }
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

function applyAutoStart(enabled: boolean) {
  try {
    app.setLoginItemSettings({
      openAtLogin: enabled,
      path: process.execPath,
      args: enabled ? ['--hidden'] : [],
    })
  } catch (err) {
    console.error('Failed to update login item settings:', err)
  }
}

function createTrayIcon() {
  const size = 16
  const buf = Buffer.alloc(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4
      const isBorder = x === 0 || y === 0 || x === size - 1 || y === size - 1
      const isCenter = x >= 5 && x <= 10 && y >= 5 && y <= 10
      if (isBorder) {
        // Dark indigo border (#3730a3)
        buf[idx] = 55
        buf[idx + 1] = 48
        buf[idx + 2] = 163
        buf[idx + 3] = 255
      } else if (isCenter) {
        // Crisp white inner square
        buf[idx] = 255
        buf[idx + 1] = 255
        buf[idx + 2] = 255
        buf[idx + 3] = 255
      } else {
        // Indigo fill (#4f46e5)
        buf[idx] = 79
        buf[idx + 1] = 70
        buf[idx + 2] = 229
        buf[idx + 3] = 255
      }
    }
  }
  return nativeImage.createFromBitmap(buf, { width: size, height: size })
}

function updateTrayMenu() {
  if (!tray) return
  const showApp = () => {
    if (!win) {
      createWindow(false)
    } else {
      win.show()
      win.focus()
    }
  }

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open FileMap', click: showApp },
    {
      label: 'Start on System Boot',
      type: 'checkbox',
      checked: appSettings.autoStartOnBoot,
      click: async (menuItem) => {
        appSettings = { ...appSettings, autoStartOnBoot: menuItem.checked }
        await getStore().saveAppSettings(appSettings)
        applyAutoStart(appSettings.autoStartOnBoot)
        win?.webContents.send('filemap:app-settings-changed', appSettings)
      },
    },
    { type: 'separator' },
    {
      label: 'Quit FileMap',
      click: () => {
        isQuitting = true
        void syncManager?.dispose()
        app.quit()
      },
    },
  ])
  tray.setContextMenu(contextMenu)
}

function createTray() {
  if (tray) return
  const icon = createTrayIcon()
  tray = new Tray(icon)
  tray.setToolTip('FileMap — Office File Locator')

  const showApp = () => {
    if (!win) {
      createWindow(false)
    } else {
      win.show()
      win.focus()
    }
  }

  updateTrayMenu()
  tray.on('click', showApp)
  tray.on('double-click', showApp)
}

function createWindow(startHidden = false) {
  win = new BrowserWindow({
    title: 'FileMap — Office File Locator',
    width: 1240,
    height: 800,
    minWidth: 940,
    minHeight: 620,
    show: !startHidden,
    backgroundColor: '#f8fafc',
    icon: path.join(process.env.VITE_PUBLIC, 'logomain.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.setMenuBarVisibility(false)

  win.on('close', (e) => {
    if (!isQuitting && appSettings.runInBackground) {
      e.preventDefault()
      win?.hide()
    }
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('before-quit', () => {
  isQuitting = true
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && !appSettings.runInBackground) {
    void syncManager?.dispose()
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow(false)
  } else {
    win?.show()
  }
})

app.whenReady().then(async () => {
  registerIpcHandlers()
  appSettings = await getStore().loadAppSettings()
  applyAutoStart(appSettings.autoStartOnBoot)
  await getSyncManager().init()
  createTray()
  const startHidden = process.argv.includes('--hidden') && appSettings.runInBackground
  createWindow(startHidden)
})
