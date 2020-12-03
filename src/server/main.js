const { app, BrowserWindow, netLog, contentTracing, session } = require('electron')
// const ipc = require('electron').ipcMain;

function createWindow () {
  // Cree la fenetre du navigateur.
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

  // et charger le fichier index.html de l'application.
  win.loadFile('./src/webapp/public/html/index.html');

  //show the app only if the app is ready (avoid startup white screen)
  win.once('ready-to-show', () => {
      win.show()
   })

  //remove menubar from electron app : uncomment in PROD
  //win.removeMenu();

  // Ouvre les DevTools.
  //win.webContents.openDevTools()

  // another way to disable dev tools
  // win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });


}



// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(createWindow)



// Quitter lorsque toutes les fenêtres sont fermées, sauf sur macOS. There, it's common
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



// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.

//////IPC COMMUNICATION
// ipc.on('log-error', (event, arg) => {
//     console.log(`Erreur ${arg}! Veuillez rapporter ce bug au développeur de l\'application.`);
//     event.sender.send('error-logged');
//
// });
////////

////////COOKIE IN MAIN PROCESS
//https://www.electronjs.org/docs/api/cookies
// const { session } = require('electron')
//
// // Récupère tous les cookies.
// session.defaultSession.cookies.get({})
//   .then((cookies) => {
//     console.log(cookies)
//   }).catch((error) => {
//     console.log(error)
//   })
//
//
//
// // Définit un cookie avec les données de cookie spécifiées;
// // peut écraser les cookies équivalents s'ils existent.
// const cookie = { url: 'http://myapp.com', name: 'dummy_name', value: 'dummy' }
// session.defaultSession.cookies.set(cookie)
//   .then(() => {
//     // succès
//     console.log("success OK ")
//   }, (erreur) => {
//     console.error(erreur)
// })
// // Interroge tous les cookies associés à une Url spécifique.
// session.defaultSession.cookies.get({ url: 'http://myapp.com' })
//   .then((cookies) => {
//     console.log(cookies)
//   }).catch((erreur) => {
//     console.log(error)
//   })
