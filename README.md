########
#DOCUMENTATION
########

#gros problème pour faire tourner l'app autre que root dans un container mais les soluces que j'ai vu
#sur le net ne fonctionne pas -> problème connu
#source icon : https://iconarchive.com/show/papirus-apps-icons-by-papirus-team/pingus-icon-icon.html

Host version :
Ubuntu 20.04.4
node v14.13.1
npm  v6.14.8
Electron 10.1.3
Electron-builder 22.9.1
Sqlite3 5.0.0
mysql-server 8.0.21
mysql npm 2.18.1
bcrypt 2.4.3
crypto 1.0.1

Using version :
node 12.16.3
Chrome 85.0.4183.121
Electron 10.1.3

######
#standard build
######

sudo docker build . -t electron_password_generator_ubuntu_20:1.0

sudo docker run --name ubvnc -p 6080:80 -p 5900:5900 -v /home/sacha/documentation/electron_password_generator:/home/sacha/ electron_password_generator_ubuntu_20:1.0

Ensuite dans le container faire :
su - sacha

apt install mysql-server -> tuto https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
ATTENTION : creation user bien faire : CREATE USER 'username'@'host' IDENTIFIED WITH authentication_plugin BY 'password';
sinon j'ai une error auth methode non accepté

npm install --save-dev electron

Fichier de base : package.json ; index.html ; main.js -> voir la doc electron

#first time ? need to init database
node src/webapp/mvc/model/init_database_create_database.js
node src/webapp/mvc/model/init_database_create_tables.js

Puis en root dans le home de l'application (avant éditer le fichier package.json) chez /home/sacha sacha faire :
npm start

#######


#####
#Add dependencies
#####

#Add this line in package.json :
"scripts": {
   "postinstall": "install-app-deps"
   ...
}
####

npm install --save-dev electron-builder
npm install --save mysql
npm install --save bcryptjs
npm install --save crypto
npm install --save sqlite3
npm run postinstall

#CLI sqlite3 utils
apt-get install sqlite3 libsqlite3-dev


//Error Sqlite3
//si je require 2 fois sqlite 3 = error page blanche dés que je require
//le truc j'ai reussi a pseudo regler en forcant le db.close dans l'index
//mais de base j'ai l'impression que ça close pas la database du coup je met 2 db.close pour clore la databases
//mais ça me met une error dans la console
//je ne sais pas comment regler ça car : j'ai limpression que si je met pas 2 fois db.close la connection database ne se close pas et d'une autre part dés que je require sqlite3 j'a iune page blanche sans aucun message error et j'ai aucun moyen de savoir

####
#BUILD APP
####

electron-tutorial-app = app name

For windows only we need to add product name

#LINUX :

electron-packager . ulrich_the_keeper --overwrite --asar=true --platform=linux --arch=x64 --icon=src/webapp/public/assets/img/menu_icon.png --prune=true --out=release-builds

#WINDOWS (before if we dev on linux or mac and we want build for windows we need ton install wine):
Il faut absolument un .ico pour windows.

j'ai essayer avec packager + rebuild avec l'api complete mais marche pas -> https://busymind101.wordpress.com/2018/11/24/make-electronjs-work-with-sqlite3/

ATTENTION : IMPOSSIBLE DE BUILD AVEC electron-packager + sqlite3 sous windows 10 car y'a un bug, j'ai essayé mais trop galere je ne trouve pas.https://stackoverflow.com/questions/38600940/packaged-electron-app-cannot-find-module-sqlite3. J'ai essayer sur un pc windows de rebuild, avec tout le necessaire (j'ai du instal visual studio code, rebuild,python et git) mais marche pas.
Pourtant le rebuild et le postinstall fonctionne bien. j'ai plus d'idées.

ATTENTION Raison bug :

Error: Cannot find module node_modules/sqlite3/lib/binding/node , You have just installed the sqlite3 module but you need to rebuild it to run on a specific platform. You'll need electron-rebuild package to rebuild the binary. Run Command npm i --save-dev electron-rebuild from your project directory. After Installing the ˚ electron-rebuild . That means putting "postinstall": "electron-builder install-app-deps" in my npm scripts in package.json. As to why the issue happens: node-sqlite3's main module uses node-pre-gyp to figure out which compiled sqlite binary to require; node-pre-gyp tries to detect the process runtime to return the path to the correct binary for the process/platform.

Electron app cant find sqlite3 module, Electron end SQLite and make them work together without any problems, this also includes Duration: 9:12 Posted: May 3, 2017 Hello, I try to install sqlite3 via npm. Everything is OK. But when I try to use it, I've got an error : Cannot find module

electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=x64 --icon=src/webapp/public/assets/img/ico_app.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Tutorial App"

####
#POUR CHANGER ENVIRONNEMENT DE DEV
#OU FAIRE TOURNER LES SOURCES AUTRES PART
####

#LINUX source git hub
Il faut install nodejs 14.
git clone https://github.com/UlrichTheKeeper/UTK_password_manager.git
cd UTK_password_manager
npm install
npm postinstall
npm start


#LINUX source + node_modules directory
Aller sur un os linux neuf.
Ubuntu 20 OK
en etant un user normal et non root.
install nodejs 14
ensuite install electron (avant faudra surement delete le fichier ./nodemodules/.bin/electron)
car il gueule car electron est deja présent mais si je lance ça me fait une erreur aussi.
ensuite
npm start
et c'est ok !
j'ai meme enlever (uniquement dans la version dev de l'autre pc portable) le --no-sandbox dans le package .json, car comme il tourne dans un environnement utilisateur classic et non avec root (pas comme dans le docker) et bien electron peut tourner normalement pas besoin de forcer le no-sandbox.
il faut seulement le forcer quand on fait tourner electron en root.
De toute façon de base electron est sans la sandbox mais quand on est en root c'est une securité de bien forcer le no-sandbox car faire tourner l'app en root peut etre encore plus dangeureux.
#

#WINDOWS source + node_modules directory
ATTENTION : ça fonctionne, meme avec sqlite3 mais le truc c'est que pour l'instant avec le bug actuel de require 2 fois sqlite et du coup j'ai un écran blanc, mon petit hack (de mettre 2 fois db.close) ne marche pas sur windows et du coup dés le début j'ai un écran blanc

Install visual studio c++ ???

Must install nodejs first

rm ./node_modules/.bin/node-pre-gyp

rm ./node_modules/.bin/rimraf

npm install --save-dev node-pre-gyp

npm install --save-dev sqlite3

npm install --save-dev rimraf

npm install --save-dev electron-rebuild

add dans package.json

"rebuild": "electron-rebuild -f -w sqlite3"

ensuite

rpm run rebuild

puis

npm start
#

TODO :
- RESOLU VOIR database_function.js -> search_password() j'ai essayer une autre methode et ca fonctionne :  ERREUR viens que quand je veux destroy la table puis la reconstruire
je vais pouvoir avoir les nouvelles data a afficher mais impossbile d'avoir les data on click ça me met undefined voir lien : https://stackoverflow.com/questions/32713612/jquery-datatables-destroy-re-create
MARCHE PAS QUAND JE REGARDE PUIS JE REMPLI PUIS JE RE REGARDE CAR INDICE DU TABLEAU SE BARRE JE NE SAIS PAS PK mais peut etre trouver un truc un peu plus stylisé : sur search password affiché seulement quand click ou passer la souris dessus sinon cacher et mettre des étoiles
OK mais voir test sur le long terme : voir si les lib pour tableau son toute indispensable
j'ai essayer plein d'autre methode pour refresh data etc. mais fonctionne uniquement pour list les data mais quand je veux avoir les indices marche pas ...  meme quand je veux hide and show une column dynamiquement. En gros soit j'ai les data et pas les indices, soit j'ai les indices mais pas les data a jours surtout quand j'insert des data et ensuite que je search

- FONCTIONNE PAS : SQLIETE 3 REQUIRE 2 FOIS DANS 2 FICHIER DIFFERENT-> TJR LE MEME BUG, JAI ESSAYER AVEC DES REQUETES SIMPLE AVEC SERIALIZE BD.EACH ET AUTRE : essayer utiliser autre methode pour select et insert data sqlite3 ne pas utilser db.all()


######
#Bonne pratique git
#####
git clone https://github.com/UlrichTheKeeper/UTK_password_manager.git
10128  git log
10139  git add README.md
10140  git commit -m "init readme"
10141  git branch
10142  git push
10143  git checkout -b dev
10144  git branch
10145  git push origin dev
10146  git branch
10147  git add src/
10148  git commit -m "add init src"
10149  git add Dockerfile
10150  git commit -m "add init dockerfile"
10151  git add package*
10152  git status
10153  git commit -m "add init package"
10154  git push origin dev
10155  git checkout master
10156  git status
10157  git pull
