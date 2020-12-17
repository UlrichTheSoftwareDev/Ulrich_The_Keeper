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
* lodash-id 0.14.0
* lowdb 1.0.0
* bcrypt 2.4.3
* crypto 1.0.1
* datatables.net-dt 1.10.22
* electron-packager 15.1.0
* jquery 3.5.1
* Chrome 85.0.4183.121


### Installation

**This app was developed under Linux Ubuntu 20**

* First, you need to install [NodeJS]( https://nodejs.org/en/download/).

To check that Node.js was installed correctly, type the following commands in your terminal client:

```
node -v

npm -v

```

* Then clone the project.

```
git clone https://github.com/UlrichTheSoftwareDev/Ulrich_The_Keeper.git
```

* Now install dependencies.

```
cd /UTK_password_manager/

npm install

npm run postinstall
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

npm install electron-packager -g

electron-packager . ulrich_the_keeper --overwrite --asar=true --platform=linux --arch=x64 --icon=src/webapp/public/assets/img/menu_icon.png --prune=true --out=release-builds

#DO NOT DELETE /src folder
#you need to keep /src/webapp/databases/ folder and /src/webapp/public/assets/ folder
#you can delete anything else
#you must launch app under Ulrich_The_Keeper/ folder like below

./release-builds/ulrich_the_keeper-linux-x64/ulrich_the_keeper
```

#### WINDOWS (From Linux to Windows (same process from Windows to Windows)):

**If we package this app from Linux to Windows we need to install wine first.**

* Example with Windows arch 64

```
cd /UTK_password_manager/

npm install electron-packager -g

electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=x64 --icon=src/webapp/public/assets/img/ico_app.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Tutorial App"

#DO NOT DELETE /src folder
#you need to keep /src/webapp/databases/ folder and /src/webapp/public/assets/ folder
#you can delete anything else
#you must launch app under Ulrich_The_Keeper/ folder like below

./release-builds/ulrich_the_keeper

```

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
