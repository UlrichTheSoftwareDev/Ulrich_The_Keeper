# DOCUMENTATION <img src="src/webapp/public/assets/img/main_icon.png" width=50 />


## About the project

Ulrich The Keeper is a lightweight multi-users desktop password manager made with ElectronJs Framework.

You can view, generate and input password.

Made with NodeJs, ElectronJs, HTML, CSS, Bootstrap, Javascript, JQuery and Sqlite3.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

You can also build this app with Electron-Packager to make an executable file.

### Versions

* Test and build with Ubuntu 20.04.4
* node v14.13.1
* npm  v6.14.8
* Electron 10.1.4
* Electron-builder 22.9.1
* Sqlite3 5.0.0
* bcrypt 2.4.3
* crypto 1.0.1
* decache 4.6.0
* datatables.net-dt 1.10.22
* electron-packager 15.1.0
* jquery 3.5.1
* Chrome 85.0.4183.121


### Installation

**Please note that operation under Windows is not guaranteed due to some sqlite3 issues, see the Known Issues section.**

**This app was developed under Linux Ubuntu 20**

* First, you need to install [NodeJS]( https://nodejs.org/en/download/).

To check that Node.js was installed correctly, type the following commands in your terminal client:

```
node -v

npm -v

```

* Then clone the project.

```
git clone https://github.com/UlrichTheKeeper/UTK_password_manager.git
```

* Now install dependencies.

```
cd /UTK_password_manager/

npm install

npm run postinstall
```
* (Optional) lost database ? don't worry and run these scripts to init a new database.

```
node src/webapp/mvc/model/init_database_create_database.js
node src/webapp/mvc/model/init_database_create_tables.js
```

* And to finish.

```
npm start
```

### Package app with Electron-Packager

Electron Packager is a command line tool and Node.js library that bundles Electron-based application source code with a renamed Electron executable and supporting files into folders ready for distribution.

#### LINUX (From Linux to Linux):

* Example with Linux and x64 arch

```
cd /UTK_password_manager/

electron-packager . ulrich_the_keeper --overwrite --asar=true --platform=linux --arch=x64 --icon=src/webapp/public/assets/img/menu_icon.png --prune=true --out=release-builds
```

#### WINDOWS (From Linux to Windows -> Don't works -> see Known Issues):

**If we package this app from Linux to Windows we need to install wine first.**

* Example with Windows arch 64

```
cd /UTK_password_manager/

electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=x64 --icon=src/webapp/public/assets/img/ico_app.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Tutorial App"
```


- FONCTIONNE PAS : SQLIETE 3 REQUIRE 2 FOIS DANS 2 FICHIER DIFFERENT-> TJR LE MEME BUG, JAI ESSAYER AVEC DES REQUETES SIMPLE AVEC SERIALIZE BD.EACH ET AUTRE : essayer utiliser autre methode pour select et insert data sqlite3 ne pas utilser db.all()


### Known Issues

Feel free to help me and clone this project !

* **Error Require Sqlite3** :  When I required 2 times or more sqlite3 lib, I have a white screen error without any logs. Example : going from Index.html to Main.html and search password (or whatever that need to use the database a second time). I put 2 db.close() in search_user_exist() to make sure that de database is closed but it's works but is really ugly. I don't know how to resolve this issue.

* **Electron-Packager from Linux to Windows** : I am not able to package this app for Windows Platform because there is some issues with Sqlite3 on Windows. I got an error "No module sqlite found". Some stackoverflow post say that we need to rebuild sqlite3 on Windows and then use electron-packager. I already try but I have no result -> same error. See -> https://stackoverflow.com/questions/38600940/packaged-electron-app-cannot-find-module-sqlite3 

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Licence

Distributed under the Apache2 License. See `LICENSE` for more information.

## Contact

Pateyron Sacha - sachapateyron@gmail.com

## Links and Resources

* ElectronJS -> [Documentation]( https://www.electronjs.org/)
* NodeJS -> [Documentation]( https://nodejs.org/)
* The icons I use -> GNU General Public License v3.0 -> [Source]( https://iconarchive.com/show/papirus-apps-icons-by-papirus-team/pingus-icon-icon.html)
* Image font -> Pixabay Licence -> https://pixabay.com/fr/photos/voie-lact%C3%A9e-galaxie-nuit-ciel-984050/
