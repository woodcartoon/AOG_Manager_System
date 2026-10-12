// main.js — Electron main process for AOG Manager
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

// Where your PHP + MySQL back end lives. Change the host/port to match.
const API_BASE = process.env.AOG_API || 'http://localhost/aog';
const LOCAL_MANAGER_USERNAME = 'Manager2026';
const LOCAL_MANAGER_PASSWORD = 'AOG2026#';

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1100,
        height: 720,
        minWidth: 720,
        minHeight: 560,
        show: false,                 // avoid the white flash before CSS paints
        backgroundColor: '#16203c',
        title: 'AOG Manager',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,  // keep these two as they are
            nodeIntegration: false
        }
    });
    win.menuBarVisible = false;
    win.loadFile(path.join(__dirname, 'Frontend', 'login.html'));

    win.once('ready-to-show', () => win.show());

    // Any external link opens in the real browser, not inside the app.
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

/* ---- Auth bridge ---------------------------------------------------------
   The renderer never talks to MySQL directly. It asks the main process, which
   calls your PHP endpoint and hands back a plain result object.
   -------------------------------------------------------------------------- */

ipcMain.handle('auth:login', async (_event, { username, password, portal }) => {
    if (portal === 'manager' &&
        username === LOCAL_MANAGER_USERNAME &&
        password === LOCAL_MANAGER_PASSWORD) {
        return { ok: true, role: 'manager' };
    }

    const endpoint = portal === 'admin' ? 'adminlogin.php' : 'login.php';

    try {
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            return { ok: false, message: 'The server rejected the request. Try again.' };
        }

        // Expected from PHP: { ok: true, role: "manager" } or { ok: false, message: "..." }
        return await res.json();
    } catch (err) {
        return { ok: false, message: 'Cannot reach the server. Check that it is running.' };
    }
});

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});