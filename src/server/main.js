const { app, BrowserWindow } = require('electron')

function createWindow () {
  // create window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Ulrich The Keeper",
    icon: './src/webapp/public/assets/img/menu_icon.png',
    show: false,
    webPreferences: {
      //set to true to have internal nodejs function integration
      nodeIntegration: true,
      //enable remote module for the render script
      enableRemoteModule: true,
      //disable dev tools set to false in PROD
      devTools: true


    }
  }
)

  // load html file
  win.loadFile('./src/webapp/public/html/index.html');

  //show the app only if the app is ready (avoid startup white screen)
  win.once('ready-to-show', () => {
      win.show()
   })

  //remove menubar from electron app : uncomment in PROD
  //win.removeMenu();

  // open  DevTools.
  //win.webContents.openDevTools()

  // another way to disable dev tools
  // win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });


}

//init and create window
app.whenReady().then(createWindow)



// leave app when window is closed (except MacOS). There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
