const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electron', {
    closeWindow: () => {
        ipcRenderer.send('close-window');
    }
});