// // // // ///////////////
// // // // //TEMPLATE TEST
// // // // ///////////////
// // // //


// $("#test").hide();

// $("#table_id td").remove();
// $("#table_id th").remove();
// $("#table_id td").html("");
// $("#table_id td").empty();
// $("#table_id").DataTable().destroy();
// $("#table_id tr").remove();
// $("#table_id").DataTable().destroy();


//////////////DATATABLE CLICK////////////////////////////////////////
var table_select = $('#table_id').DataTable();

$('#table_id tbody').on('click', 'td', function(e) {

// ok
  // var columns = table_select.settings().init().columns;
  // var colIndex = table_select.cell(this).index().column;
  //     alert('you clicked on the column with the name '+columns[colIndex].name);

  // table_select.columns('.password').visible( true );
//ok
// var currentRow = $(this).closest("tr");
// var data = $('#table_id').DataTable().row(currentRow).data();
// alert(data)
//ok
// table_select.columns( [2] ).visible( true );
//     alert(names);


//    e.preventDefault();
//
// // Get the column API object
// var column = table_select.column( $(this).at tr('data-column') );
//
// // Toggle the visibility
// column.visible( ! column.visible() );
    var data = table_select.row(this).data();
    alert(data)
    alert(data[2]);
  // alert(data)
  // remote.dialog.showMessageBox({
  //   type: 'info',
  //   title: 'Attention !',
  //   message: 'Your decrypted password : '+ data[0] +" | " + data[1]+ " | " + data[2],
  //   buttons: ['Ok \!']
  // });

});

/////////////////////////////////////////////////////////////////////////////


// // Create one dimensional array
// var gfg = new Array(3);
//
// const arr = Array.from({length: 5}, (v, k) => k+1);
//
// const twodArray = arr.map((e,i)=>{
//         return ['1','2','3','4']
// })

// var toto = Math.floor(Math.random() * 10) + 5
// console.log(toto)
// function randomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// var toto = randomInteger(20,30)
// // console.log(toto)
// function randomIntFromInterval(min, max) { // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
// var toto = randomIntFromInterval(10,20)
// console.log(toto)
// var a = "1,hi,0,-1,bye,2,3,ho,5,";
//
// var result = [];
//
// a = a.split(',');
//
// while(a[0]) {
//     result.push(a.splice(0,3));
// }
//
// console.log(result);
// // Loop to create 2D array using 1D array
// for (var i = 0; i < gfg.length; i++) {
//     gfg[i] = [];
// }
// var h = 0;
// var s = "GeeksforGeeks";
//
// // Loop to initilize 2D array elements.
// for (var i = 0; i < 3; i++) {
//     for (var j = 0; j < 3; j++) {
//
//         gfg[i][j] = s[h++];
//     }
// }
//
// console.log(gfg)
// // Loop to display the elements of 2D array.
// for (var i = 0; i < 3; i++) {
//     for (var j = 0; j < 3; j++)
//
//     {
//         console.log(gfg[i][j] + " ");
//     }
//
// }

// const m = 4;
// const  n = 5;
// let arr = new Array(m); // create an empty array of length n
// for (var i = 0; i < m; i++) {
//   arr[i] = new Array(n); // make each element an array
//   arr.push(['Sadie', 15], ['Caleb', 18]);
//
//
// }
// console.log(arr);
// console.log(arr);
// console.table(arr);
// //var db = new sqlite3.Database('./src/webapp/mvc/databases/mydb.db')
// var sqlite3 = require('sqlite3').verbose();
//
// //create database if not exist
// var db = new sqlite3.Database('../databases/electron_db.db');
// db.each("SELECT username FROM users", function(err, row) {
//           console.log(row.username);
//       });
// // // Nodejs encryption with CTR
// // const crypt = require('crypto');
// // const algorithm = 'aes-256-cbc';
// // const key = crypt.randomBytes(32);
// // const iv = crypt.randomBytes(16);
// //
// //  let cipher = crypt.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
// //  let encrypted = cipher.update("toto");
// //  encrypted = Buffer.concat([encrypted, cipher.final()]);
// //  var result =  { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// //  console.log('###########CRYPT################');
// //  console.log(result);
// //  console.log(result.iv);
// //  console.log(typeof result.iv);
// //  console.log(result.encryptedData);
// //  console.log(typeof result.encryptedData);
// //  console.log(result.encryptedData.length);
// //  console.log(typeof key)
// //  console.log( key)
// //
// //  console.log(typeof key.toString('hex'));
// //  console.log( key.toString('hex'));
// //  var key2 = key.toString('hex');
// //
// //
// //  console.log('###########ENDCRYPT################');
// //
// //
// //  let iv2 = Buffer.from(result.iv, 'hex');
// //  let encryptedText = Buffer.from(result.encryptedData, 'hex');
// //  let decipher = crypt.createDecipheriv('aes-256-cbc', Buffer.from(key2, 'hex'), iv2);
// //  let decrypted = decipher.update(encryptedText);
// //  decrypted = Buffer.concat([decrypted, decipher.final()]);
// //  console.log('##########DECRYPT#################');
// //  console.log(decrypted.toString())
// //  decrypted = String(decrypted)
// //  console.log(decrypted)
// //  console.log('###########ENDDECRYPT################');
// //
// //  for (let i = 0; i < 10; i++) {
// //    let toto = i;
// //    console.log(toto);
// // }
// // var hw = encrypt("Some serious stuff")
// // console.log(hw)
// // console.log(decrypt(hw))
//
//
// // for (let i = 0; i <= 10; i++) {
// // var key = crypt.createCipher('aes-128-cbc', 'password_key');
// // var encrypted_str = key.update('Welcome to CodeSpeedy' +i , 'utf8', 'hex')
// // encrypted_str += key.final('hex');
// // console.log(encrypted_str);
// //
// // var key = crypt.createDecipher('aes-128-cbc', 'password_key');
// // var decrypted_str = key.update(encrypted_str, 'hex', 'utf8')
// // decrypted_str += key.final('utf8');
// // console.log(decrypted_str); // Welcome to CodeSpeedy
// // }
// // const crypt = require('crypto')
// // var titi = 20;
// // const generatePassword = (
// //   length = titi,
// //   wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz()&[]=^*~!@-#$'
// // ) =>
// //   Array.from(crypt.randomFillSync(new Uint32Array(length)))
// //     .map((x) => wishlist[x % wishlist.length])
// //     .join('')
// //
// // var toto = generatePassword();
// // console.log(toto)
// // console.log(typeof toto)
// // console.log(generatePassword())
//
// // // Nodejs encryption with CTR
// // const crypto = require('crypto');
// // const algorithm = 'aes-256-cbc';
// // const key = crypto.randomBytes(32);
// // const iv = crypto.randomBytes(16);
// //
// //
// //
// // function encrypt(text) {
// //  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
// //  let encrypted = cipher.update(text);
// //  encrypted = Buffer.concat([encrypted, cipher.final()]);
// //  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// // }
// //
// // function decrypt(text) {
// //  let iv = Buffer.from(text.iv, 'hex');
// //  let encryptedText = Buffer.from(text.encryptedData, 'hex');
// //  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
// //  let decrypted = decipher.update(encryptedText);
// //  decrypted = Buffer.concat([decrypted, decipher.final()]);
// //  return decrypted.toString();
// // }
// //
// // var hw = encrypt("Some serious stuff")
// // console.log(hw)
// // console.log(decrypt(hw))
//
//
//
//
//
// //
// // const crypto = require('crypto');
// // const algorithm = 'aes-256-ctr';
// // const ENCRYPTION_KEY =  Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
// // // const secret = "totozaeazeaeazeazeazeazeazeazeazeazeaez";
// // // const ENCRYPTION_KEY = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
// // const IV_LENGTH = 16;
// //
// // function encrypt(text) {
// //     let iv = crypto.randomBytes(IV_LENGTH);
// //     let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
// //     let encrypted = cipher.update(text);
// //     encrypted = Buffer.concat([encrypted, cipher.final()]);
// //     return iv.toString('hex') + ':' + encrypted.toString('hex');
// // }
// //
// // function decrypt(text) {
// //     let textParts = text.split(':');
// //     let iv = Buffer.from(textParts.shift(), 'hex');
// //     let encryptedText = Buffer.from(textParts.join(':'), 'hex');
// //     let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
// //     let decrypted = decipher.update(encryptedText);
// //     decrypted = Buffer.concat([decrypted, decipher.final()]);
// //     return decrypted.toString();
// // }
// // var titi = encrypt("toto");
// // console.log(titi);
// // var tata = decrypt("toto");
// // console.log(tata);
// // function doFunction() {
// //   alert('Hello\nHow are you?');
// //   console.log("ma "+"chaine");
// //
// // }
// //
// // function doFunction2() {
// //   alert('Hello\nHow are you?');
// // }
// // alert("toto");
// // var sqlite3 = require('sqlite3');
// //
// //   //create database if not exist
// // var db = new sqlite3.Database('./src/webapp/mvc/databases/mydb.db')
// //
// //
// // db.run('INSERT INTO users(username,user_password) VALUES(?,?)', ["toto","pouet"]);
// //
// // alert("titi");
// // document.getElementById("myForm_register").action = "index.html"
// // window.location = "index.html"
//  // db.close();
//
//  // document.getElementById("myForm_register").action = "index.html";
//
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// /////////BUTTON CLICK EVENT LISTENER HTML
// // document.getElementById("clickMe").onclick = function () { alert('hello!'); };
//
// //attach one or more function to one element
// //attechEvent is for IE browser
// // var el = document.getElementById("clickMe");
// // if (el.addEventListener)
// //     el.addEventListener("click", doFunction, false);
// // else if (el.attachEvent)
// //     el.attachEvent('onclick', doFunction2);
// ///////////
//
//
//
// ////////IPC COMMUNICATION
// // const ipc = require('electron').ipcRenderer;
// //const remote = require('electron').remote;
// //
// // document.getElementById('ipc').addEventListener('click', () => {
// //     ipc.send('log-error', 'Fichier introuvable');
// // });
// //
// // ipc.on('error-logged', () => {
// //     alert('Une erreur a été rencontrée. Consultez le terminal pour plus de détails.');
// // });
// //
// // // L’objet dialog n’est normalement pas accessible depuis les scripts de rendu.
// // remote.dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');
// /////////
