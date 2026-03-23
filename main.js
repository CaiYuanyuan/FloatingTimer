// const { app, BrowserWindow, screen, ipcMain } = require('electron');
const {app, BrowserWindow, screen, ipcMain} = require('electron');
const path = require('path');
let win;

function createWindow() {
    // 获取主显示器尺寸
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({
        width: 280,
        height: 180,
        x: width - 500,      // 默认放在右下角
        y: height - 320,
        frame: false,        // 无边框
        alwaysOnTop: true,   // 始终置顶
        transparent: true,   // 透明背景
        resizable: true,//可调整
        skipTaskbar: false,
        icon: 'timer.png',   // 设置窗口图标
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: false
            nodeIntegration: false,        // 改为 false
            contextIsolation: true,        // 改为 true
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // 加载计时器页面
    win.loadFile('index.html');

    // 允许拖动窗口（通过拖拽时间区域）
    win.setMovable(true);
}

// 监听关闭窗口事件
ipcMain.on('close-window', () => {
    if (win) {
        win.close();
    }
});

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});