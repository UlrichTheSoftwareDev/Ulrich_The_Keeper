//Error Sqlite3
//si je require 2 fois sqlite 3 = error page blanche dés que je require
//le truc j'ai reussi a pseudo regler en forcant le db.close dans l'index
//mais de base j'ai l'impression que ça close pas la database du coup je met 2 db.close pour clore la databases
//mais ça me met une error dans la console
//je ne sais pas comment regler ça car : j'ai limpression que si je met pas 2 fois db.close la connection database ne se close pas et d'une autre part dés que je require sqlite3 j'a iune page blanche sans aucun message error et j'ai aucun moyen de savoir

function insert_user(form_user, form_password) {

  //require lib
  var bcrypt = require('bcryptjs');
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;

  //import sqlite3
  var sqlite3 = require('sqlite3').verbose();

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //create sqlite3 database if not exist
  var db = new sqlite3.Database(db_path);

  //format date to string
  var today = new Date();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
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

  let sql = "INSERT INTO users(username,user_password,date_user) VALUES (?,?,?) "
  db.all(sql, [form_user_string_replace, form_password_string_hash, date_string], (err, rows) => {
    if (err) {
      alert(err);
      return;
    }
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'Registration done',
      buttons: ['Ok \!']
    });
    db.close();
    window.location.href = "index.html";

  });

  db.close();

}

//Login : check user exist from index.html
function check_user_exist(form_user, form_password) {

  //require lib
  var bcrypt = require('bcryptjs');
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  var sqlite3 = require('sqlite3').verbose();

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //create sqlite3 database if not exist
  var db = new sqlite3.Database(db_path);

  //format user and password to string
  var form_user_string = String(form_user);
  var form_password_string = String(form_password);

  //replace special charactere
  var form_user_string_replace = form_user_string.replace(/[^a-zA-Z0-9]/g, '');


  //search user in database
  var select_users_table = "SELECT id_user,username, user_password from users where username=?";


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
      if (row.username == form_user_string_replace && form_password_dehash == true) {
        var user_id = row.id_user;

        const cookie = {
          url: 'http://ulrichthekeeper.com',
          name: form_user_string_replace,
          value: String(row.id_user)
        }
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


}


//search data in database come from main.html
function search_data() {
  //require lib
  // var mysql = require('mysql');
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  const algorithm = 'aes-256-cbc';
  var crypt = require('crypto');
  var sqlite3 = require('sqlite3').verbose();

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //create sqlite3 database if not exist
  var db = new sqlite3.Database(db_path);
  var result_table_array = [];
  let table = "";
  // get cookies
  remote.session.defaultSession.cookies.get({
      url: 'http://ulrichthekeeper.com'
    })
    .then((cookies) => {
      //here
      var cookie_user = cookies[0].name;
      console.log(cookies[0].name)

      //search organisation with cookie in database
      var select_users_table = "SELECT passwords.organisation, passwords.email, passwords.date_password, passwords.hash_password, passwords.key_password, passwords.iv FROM users INNER JOIN passwords ON users.id_user = passwords.id_user_fk WHERE users.username=?";

      let result_string = 'Organisation: ';


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
          result_string = result_string + " " + row.organisation + " ; ";

          table += row.organisation + ',' + row.email + ',' + decrypted.toString() + ',' + row.date_password + ',';

        });

        table = table.split(',');
        while (table[0]) {
          result_table_array.push(table.splice(0, 4));
        }
        document.getElementById("organisation").innerHTML = result_string;


        $(document).ready(function() {
          $('#table_id').DataTable({
            data: result_table_array,
            destroy: true,


                columns: [{
                name:'organisation',
                title: "Organisation",
                targets: 0
              },
              {
                name:'email',
                title: "Email",
                targets: 1

              },
              {
                name:'password',
                title: "Password",
                visible : false,
                targets: 2


              },
              {
                name:'date',
                title: "Date",
                targets: 3
              }

            ]


            // ,
            // "columnDefs": [{
            //   "targets": [0],
            //   "visible": true,
            //   "searchable": false,
            //   "className": 'select-checkbox',
            // }]

          });

          //insert click listener here
          var table_select = $('#table_id').DataTable();
          $('#table_id tbody').on('click', 'tr', function(e) {

            //show or hide column
            // var column = table_select.column( [2] );
            // column.visible( ! column.visible() );

            //show or hide row value select by click
            table_select.rows().every(function() {
              this.child('Your password : ' + this.data()[2]);
            });
            var child = table_select.row(this).child;
            if (child.isShown()) {
              child.hide();
            } else {
              child.show();
            }

          });




        });

      });


    }).catch((erreur) => {
      console.log(error)

    })


}




function input_password(insert_email, insert_organisation, insert_password) {

  //require lib
  var crypt = require('crypto');
  const algorithm = 'aes-256-cbc';
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;

  //import sqlite3
  var sqlite3 = require('sqlite3').verbose();

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //create sqlite3 database if not exist
  var db = new sqlite3.Database(db_path);

  //cast form element
  var insert_email_string = String(insert_email);
  var insert_organisation_string = String(insert_organisation);
  var insert_password_string = String(insert_password);

  // get cookies
  remote.session.defaultSession.cookies.get({
      url: 'http://ulrichthekeeper.com'
    })
    .then((cookies) => {
      var cookie_user_id = Number(cookies[0].value);

      console.log(cookies[0].name)

      //format date to string
      var today = new Date();
      var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
      var date_string = String(date);

      const key = crypt.randomBytes(32);
      const iv = crypt.randomBytes(16);

      let cipher = crypt.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
      let encrypted = cipher.update(insert_password_string);
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      var result = {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
      };
      var result_iv = result.iv;
      var result_encrypted = result.encryptedData;
      var result_key = key.toString('hex');


      //insert query in database
      var insert_password_table = "INSERT INTO passwords (email,organisation,hash_password,key_password,iv,date_password,id_user_fk) values (?,?,?,?,?,?,?)";
      var value_passwords_table = [insert_email_string, insert_organisation_string, result_encrypted, result_key, result_iv, date_string, cookie_user_id];

      db.all(insert_password_table, value_passwords_table, (err, rows) => {
        if (err) {
          alert(err);
          return;
        }
        remote.dialog.showMessageBox({
          type: 'info',
          title: 'Attention !',
          message: 'Input password successful \! ',
          buttons: ['Ok \!']
        });

      });

    }).catch((erreur) => {
      console.log(error)
    })
}

function generate_password(insert_email, insert_organisation) {

  //require lib
  //import sqlite3
  var sqlite3 = require('sqlite3').verbose();
  var crypt = require('crypto');
  const algorithm = 'aes-256-cbc';
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  var min_pass = db_config.min_generate;
  var max_pass = db_config.max_generate;

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  var length_password = getRandomIntInclusive(min_pass, max_pass)


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
  remote.session.defaultSession.cookies.get({
      url: 'http://ulrichthekeeper.com'
    })
    .then((cookies) => {
      var cookie_user_id = Number(cookies[0].value);

      console.log(cookies[0].name)

      //format date to string
      var today = new Date();
      var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
      var date_string = String(date);

      const key = crypt.randomBytes(32);
      const iv = crypt.randomBytes(16);

      let cipher = crypt.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
      let encrypted = cipher.update(insert_password_string);
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      var result = {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
      };
      var result_iv = result.iv;
      var result_encrypted = result.encryptedData;
      var result_key = key.toString('hex');

      //insert query in database
      var insert_password_table = "INSERT INTO passwords (email,organisation,hash_password,key_password,iv,date_password,id_user_fk) values (?,?,?,?,?,?,?)";
      var value_passwords_table = [insert_email_string, insert_organisation_string, result_encrypted, result_key, result_iv, date_string, cookie_user_id];

      db.all(insert_password_table, value_passwords_table, (err, rows) => {
        if (err) {
          alert(err);
          return;
        }
        remote.dialog.showMessageBox({
          type: 'info',
          title: 'Attention !',
          message: 'Insert password successful \! ',
          buttons: ['Ok \!']
        });

      });

    }).catch((erreur) => {
      console.log(error)
    })


}
