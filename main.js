// main.js — Electron main process for AOG Manager
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

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

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});