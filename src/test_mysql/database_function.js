//insert user in database from register.html : string, string
//je n'arrive pas a rentrer dans le else de la query meme si c'est ok au niveau de la bdd
//je nai donc pas le alert(registration validate)
//parcontre si je provoque une error je vais avoir le alter(eroor) et que ensuite je fais un test ok je vais avoir le alert(registration validate)
//je dois recharger la page 2 fois avec ctrl R pour que tout fonctionne sinon marche pas et ça marche qu'au bout de 3 fois

function insert_user(form_user, form_password){
//require lib
// var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var db_config = require('../../../server/database_config.js');
//import sqlite3
var sqlite3 = require('sqlite3').verbose();


//get config database MYSQL
// var host = db_config.db_host;
// var user = db_config.db_user;
// var password = db_config.db_password;
// var name_database = db_config.db_name;

//get sqlite3 db path
var db_path = db_config.db_path;

//create sqlite3 database if not exist
var db = new sqlite3.Database(db_path);

//format date to string
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var date_string = String(date);

//format user and password to string
var form_user_string = String(form_user);
var form_password_string = String(form_password);

//replace special charactere
var form_user_string_replace = form_user_string.replace(/[^a-zA-Z0-9]/g, '');

//hash password with bcryptjs
const rounds = 10;
var form_password_hash = bcrypt.hashSync(form_password_string, rounds);

//format hash password to string
var form_password_string_hash = String(form_password_hash);

//prepare database connection MYSQL
// var con = mysql.createConnection({
//   host: host,
//   user: user,
//   password: password,
//   database: name_database
// });

//connect database MYSQL
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

  //insert data into users table MYSQL
  // var insert_users_table = "INSERT users(username,user_password, date_user) VALUES (?,?,?)";
  // var value_users_table=[form_user_string_replace,form_password_string_hash, date_string];
  // alert("Registration ...");
  //
  // //sql query MYSQL
  // con.query(insert_users_table, value_users_table, function (err, result, fields) {
  //   if (err) {
  //   alert("Error insert : " + err);
  // }
  // else {
  //   alert("Registration validate ! ");
  // }
  // });
  // con.end();

  // var query_user = db.prepare("INSERT OR REPLACE INTO users(username,user_password,date_user) VALUES (?,?,?) ");
  // query_user.run(form_user_string_replace,form_password_string_hash,date_string);
  // query_user.finalize();

let sql = "INSERT INTO users(username,user_password,date_user) VALUES (?,?,?) "
  db.all(sql, [form_user_string_replace,form_password_string_hash,date_string], (err, rows) => {
  if (err) {
    alert(err);
    return;
  }
  alert("Register Ok !");
  db.close();
  window.location.href = "index.html";

});

  db.close();

}

//check user exist from index.html
function check_user_exist(form_user,form_password){

  //require lib
  // var mysql = require('mysql');
  var bcrypt = require('bcryptjs');
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  var sqlite3 = require('sqlite3').verbose();


  //get mysql config database
  // var host = db_config.db_host;
  // var user = db_config.db_user;
  // var password = db_config.db_password;
  // var name_database = db_config.db_name;

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //create sqlite3 database if not exist
  var db = new sqlite3.Database(db_path);

  //format user and password to string
  var form_user_string = String(form_user);
  var form_password_string = String(form_password);

  //replace special charactere
  var form_user_string_replace = form_user_string.replace(/[^a-zA-Z0-9]/g, '');

// MYSQL prepare database connection
// var con = mysql.createConnection({
//   host: host,
//   user: user,
//   password: password,
//   database: name_database
// });

// MYSQL
//   con.connect(function(err) {
//
//     if (err) throw console.log(err);
//
//     console.log("Connected!");
// });

    //search user in database
    var select_users_table = "SELECT id_user,username, user_password from users where username=?";
    //MYSQL
    // var value_users_table=[form_user_string_replace];

    db.all(select_users_table, [form_user_string_replace], (err, rows) => {
      if (err) {
        alert(err);
        return;
      }

      rows.forEach((row) => {
        //verify password
        var form_password_dehash = bcrypt.compareSync(form_password_string, row.user_password);
        console.log("Users exist !");
        //if user exist and verify password is true redirect to main.html
          if (row.username == form_user_string_replace && form_password_dehash == true){
             var user_id = row.id_user;

             const cookie = { url: 'http://ulrichthekeeper.com', name: form_user_string_replace, value: String(row.id_user) }
             remote.session.defaultSession.cookies.set(cookie)
          .then(() => {
              // succès
              console.log("success OK ")
              }, (erreur) => {
                 console.error(erreur)
              })
              db.close();

              window.location.href = "main.html";
              }
              db.close();

      });

    });
// db.close();

//     //sql query
//    con.query(select_users_table, value_users_table, function (err, result, fields) {
//       if (err) throw alert("Error select sql : " + err);
//       alert('7')
//
//       //if user does not exist return false
//       //get object result instead of result.username because if result is empty it return juste [] ; result.unsername get an error
//       if (result == ""){
//         alert("Error User or Password does not match");
//         alert('8')
//
//         return false;
//       }
//
//       //verify password
//       var form_password_dehash = bcrypt.compareSync(form_password_string, result[0].user_password);
//       console.log("Users exist !");
//       alert('9')
//
//
//       //if user exist and verify password is true redirect to main.html
//       if (result[0].username == form_user_string_replace && form_password_dehash == true){
//         var user_id = result[0].id_user;
//         alert('10')
//
//         const cookie = { url: 'http://ulrichthekeeper.com', name: form_user_string_replace, value: String(result[0].id_user) }
//         remote.session.defaultSession.cookies.set(cookie)
//           .then(() => {
//             // succès
//             alert('11')
//
//             alert(user_id)
//             console.log("success OK ")
//           }, (erreur) => {
//             console.error(erreur)
//           })
//
//           alert('12')
//
//         window.location.href = "main.html";
//       }
//
//     });
// con.end();

}


//search data in database come from main.html
function search_data(){
  //require lib
  // var mysql = require('mysql');
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  const algorithm = 'aes-256-cbc';
  var crypt = require('crypto');
  var sqlite3 = require('sqlite3').verbose();



  //get MYSQL config database
  // var host = db_config.db_host;
  // var user = db_config.db_user;
  // var password = db_config.db_password;
  // var name_database = db_config.db_name;

  // //deprecated
  // var key_password = db_config.key_password;
  // key_password = String(key_password);

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //create sqlite3 database if not exist
  var db = new sqlite3.Database(db_path);

  // get cookies
  remote.session.defaultSession.cookies.get({ url: 'http://ulrichthekeeper.com' })
    .then((cookies) => {
      //here
      var cookie_user = cookies[0].name;
      console.log(cookies[0].name)

      // prepare MYSQL database connection
      // const con = mysql.createConnection({
      //   host: host,
      //   user: user,
      //   password: password,
      //   database: name_database
      // });
      //
      // MYSQL CONNECT
      // con.connect(function(err) {
      //
      //   if (err) throw console.log(err);
      //
      //   console.log("Connected!");
      // });

        //search organisation with cookie in database
        var select_users_table = "SELECT passwords.organisation, passwords.email, passwords.date_password, passwords.hash_password, passwords.key_password, passwords.iv FROM users INNER JOIN passwords ON users.id_user = passwords.id_user_fk WHERE users.username=?";
        // MYSQL
        // var value_users_table=[cookie_user];
        let result_string ='Organisation: ';
        var table = '';
        db.all(select_users_table, [cookie_user], (err, rows) => {
          if (err) {
            alert(err);
            return;
          }

          rows.forEach((row) => {
            let iv2 = Buffer.from(row.iv, 'hex');
            let encryptedText = Buffer.from(row.hash_password, 'hex');
            let decipher = crypt.createDecipheriv('aes-256-cbc', Buffer.from(row.key_password, 'hex'), iv2);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            result_string = result_string +" "+ row.organisation + " ; ";
            table += '<tr><td>' + row.organisation + '<td>' + row.email + '</td>' + '<td>' + decrypted.toString() + '</td>' + '<td>' + row.date_password + '</td></tr>';


          });
          table = '<table id=table_data class="table "><thread> <tr> <th> Organisation </th> <th> Email </th> <th> Password </th> <th> Date création </th></tr></thread> <tbody> ' + table + '</tbody></table>';
          document.getElementById("organisation").innerHTML = result_string;
          document.getElementById("table_data").innerHTML = table;

        });

        // db.close();

      //   sql query
      //  con.query(select_users_table, value_users_table, function (err, result, fields) {
      //     if (err) throw alert("Error select sql : " + err);
      //     let result_string ='Organisation: ';
      //     var table = '';
      //     //deprecated
      //     // var decrypted_str= ''
      //
      //     for (let i = 0; i < result.length; i++) {
      //       //deprecated
      //       // decrypted_str= ' ';
      //
      //       let iv2 = Buffer.from(result[i].iv, 'hex');
      //       let encryptedText = Buffer.from(result[i].hash_password, 'hex');
      //       let decipher = crypt.createDecipheriv('aes-256-cbc', Buffer.from(result[i].key_password, 'hex'), iv2);
      //       let decrypted = decipher.update(encryptedText);
      //       decrypted = Buffer.concat([decrypted, decipher.final()]);
      //
      //       //deprecated
      //       // var key = crypt.createDecipher('aes-256-cbc', key_password);
      //       // decrypted_str = key.update(result[i].hash_password, 'hex', 'utf8')
      //       // decrypted_str += key.final('utf8');
      //
      //       result_string = result_string +" "+ result[i].organisation + " ; ";
      //       table += '<tr><td>' + result[i].organisation + '<td>' + result[i].email + '</td>' + '<td>' + decrypted.toString() + '</td>' + '<td>' + result[i].date_password + '</td></tr>';
      //       }
      //       table = '<table id=table_data class="table "><thread> <tr> <th> Organisation </th> <th> Email </th> <th> Password </th> <th> Date création </th></tr></thread> <tbody> ' + table + '</tbody></table>';
      //     document.getElementById("organisation").innerHTML = result_string;
      //     document.getElementById("table_data").innerHTML = table;
      //
      //   });
      //
      // con.end();


    }).catch((erreur) => {
      console.log(error)

    })

}




function input_password(insert_email,insert_organisation,insert_password){
  //require lib
  // var mysql = require('mysql');

  var crypt = require('crypto');
  const algorithm = 'aes-256-cbc';
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;

  //import sqlite3
  var sqlite3 = require('sqlite3').verbose();

  //get MYSQL config database
  // var host = db_config.db_host;
  // var user = db_config.db_user;
  // var password = db_config.db_password;
  // var name_database = db_config.db_name;
  //deprecated
  // var key_password = db_config.key_password;
  // key_password=String(key_password);

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //create sqlite3 database if not exist
  var db = new sqlite3.Database(db_path);

  //cast form element
  var insert_email_string = String(insert_email);
  var insert_organisation_string = String(insert_organisation);
  var insert_password_string = String(insert_password);

  // get cookies
  remote.session.defaultSession.cookies.get({ url: 'http://ulrichthekeeper.com' })
    .then((cookies) => {
      var cookie_user_id = Number(cookies[0].value);

      console.log(cookies[0].name)

      //prepare MYSQL database connection
      // const con = mysql.createConnection({
      //   host: host,
      //   user: user,
      //   password: password,
      //   database: name_database
      // });

      // MYSQL
      // con.connect(function(err) {
      //
      //   if (err) throw console.log(err);
      //
      //   console.log("Connected!");
      // });

      //format date to string
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
      var date_string = String(date);

      //encrypt deprecated
      // var key = crypt.createCipher('aes-256-cbc', key_password);
      // var encrypted_str = key.update(insert_password_string, 'utf8', 'hex')
      // encrypted_str += key.final('hex');

      const key = crypt.randomBytes(32);
      const iv = crypt.randomBytes(16);

      let cipher = crypt.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
      let encrypted = cipher.update(insert_password_string);
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      var result =  { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
      var result_iv = result.iv;
      var result_encrypted = result.encryptedData;
      var result_key = key.toString('hex');


      //insert query in database
      var insert_password_table = "INSERT INTO passwords (email,organisation,hash_password,key_password,iv,date_password,id_user_fk) values (?,?,?,?,?,?,?)";
      var value_passwords_table=[insert_email_string,insert_organisation_string,result_encrypted,result_key,result_iv,date_string,cookie_user_id];

        db.all(insert_password_table, value_passwords_table, (err, rows) => {
        if (err) {
          alert(err);
          return;
        }
        alert("Input password OK !")
        // db.close();

      });

      // db.close();
      //   //sql  MYSQL query
      //  con.query(insert_password_table, value_passwords_table, function (err, result, fields) {
      //     if (err) throw alert("Error select sql : " + err);
      //     console.log('Insert OK');
      //
      //   });
      //
      // con.end();


    }).catch((erreur) => {
      console.log(error)
    })
// db.close();
}

function generate_password(insert_email,insert_organisation){

  //require lib
  // var mysql = require('mysql');
  //import sqlite3
  var sqlite3 = require('sqlite3').verbose();
  var crypt = require('crypto');
  const algorithm = 'aes-256-cbc';
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  var length_password= 20;

  //get MYSQL config database
  // var host = db_config.db_host;
  // var user = db_config.db_user;
  // var password = db_config.db_password;
  // var name_database = db_config.db_name;
  // var key_password = db_config.key_password;
  // key_password=String(key_password);

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //create sqlite3 database if not exist
  var db = new sqlite3.Database(db_path);

  //cast form element
  var insert_email_string = String(insert_email);
  var insert_organisation_string = String(insert_organisation);
  var insert_password_string = '';

  const generatePassword = (
    length = length_password,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz()&[]=^*~!@-#$'
  ) =>
    Array.from(crypt.randomFillSync(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join('')

  insert_password_string = generatePassword();

  // get cookies
  remote.session.defaultSession.cookies.get({ url: 'http://ulrichthekeeper.com' })
    .then((cookies) => {
      var cookie_user_id = Number(cookies[0].value);

      console.log(cookies[0].name)

      //prepare MYSQL database connection
      // const con = mysql.createConnection({
      //   host: host,
      //   user: user,
      //   password: password,
      //   database: name_database
      // });

      // MYSQL
      // con.connect(function(err) {
      //
      //   if (err) throw console.log(err);
      //
      //   console.log("Connected!");
      // });

      //format date to string
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
      var date_string = String(date);

      //encrypt deprecated
      // var key = crypt.createCipher('aes-256-cbc', key_password);
      // var encrypted_str = key.update(insert_password_string, 'utf8', 'hex')
      // encrypted_str += key.final('hex');

      const key = crypt.randomBytes(32);
      const iv = crypt.randomBytes(16);

      let cipher = crypt.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
      let encrypted = cipher.update(insert_password_string);
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      var result =  { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
      var result_iv = result.iv;
      var result_encrypted = result.encryptedData;
      var result_key = key.toString('hex');

        //insert query in database
        var insert_password_table = "INSERT INTO passwords (email,organisation,hash_password,key_password,iv,date_password,id_user_fk) values (?,?,?,?,?,?,?)";
        var value_passwords_table=[insert_email_string,insert_organisation_string,result_encrypted,result_key,result_iv,date_string,cookie_user_id];

      //   //sql query
      //  con.query(insert_password_table, value_passwords_table, function (err, result, fields) {
      //     if (err) throw alert("Error select sql : " + err);
      //     console.log('Insert OK');
      //
      //   });
      //
      // con.end();
      db.all(insert_password_table, value_passwords_table, (err, rows) => {
      if (err) {
        alert(err);
        return;
      }
      alert("Input password OK !")
      // db.close();

    });

    }).catch((erreur) => {
      console.log(error)
    })


}



//unit test : node database_function.js
// check_user_exist("ww","ww")
// insert_user("sacha11","sacha11")
