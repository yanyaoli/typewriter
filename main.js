const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path'); 

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 590,
    frame: false, 
    resizable: false,
    titleBarStyle: 'hidden', 
    icon: path.join(__dirname, 'resource/icons/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.setMenu(null);
  win.loadFile('index.html');
}

ipcMain.on('window-control', (event, arg) => {
  switch(arg) {
    case 'minimize':
      win.minimize();
      break;
    case 'maximize':
      if (!win.isMaximized()) {
        win.maximize();
      } else {
        win.unmaximize();
      }
      break;
    case 'close':
      win.close();
      break;
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
