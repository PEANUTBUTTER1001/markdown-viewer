const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false, // 창을 처음에 숨김
    backgroundColor: '#f6f8fa', // 기본 배경색 지정으로 깜빡임 방지
    icon: path.join(__dirname, 'assets', 'icon.ico'), // 앱 아이콘 설정
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true
  });

  mainWindow.loadFile('popup.html');

  // 화면이 완전히 렌더링된 후에 창을 띄움
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // 윈도우에서 .md 파일을 더블클릭하여 실행된 경우 (연결 프로그램)
    // 매개변수 중 .md로 끝나는 파일 경로가 있는지 확인
    const openFilePath = process.argv.find(arg => arg.toLowerCase().endsWith('.md'));
    if (openFilePath) {
      mainWindow.webContents.send('open-file', openFilePath);
    }
  });
}

app.whenReady().then(() => {
  // 렌더러(화면) 프로세스에서 파일 저장 대화상자를 호출할 수 있도록 설정
  ipcMain.handle('dialog:saveFile', async () => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: '마크다운 파일 저장',
      defaultPath: 'document.md',
      filters: [{ name: 'Markdown', extensions: ['md'] }]
    });
    if (!canceled) {
      return filePath;
    }
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
