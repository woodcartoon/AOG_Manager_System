const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aog', {
    login: (credentials) => ipcRenderer.invoke('auth:login', credentials)
});