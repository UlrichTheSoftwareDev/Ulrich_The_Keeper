//register.html -> registration
function insert_user(form_user, form_password) {
  //require lib
  var bcrypt = require('bcryptjs');
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  const low = require('lowdb')
  const FileSync = require('../../../../node_modules/lowdb/adapters/FileSync.js')
  const lodashId = require('lodash-id')

  //get db path
  var db_path = db_config.db_path;

  //lowdb init db config
  const adapter = new FileSync(db_path)
  const db = low(adapter)
  db._.mixin(lodashId)

  //init db schema and get users schema
  const collection = db
    .defaults({ users: [], passwords:[] })
    .get('users')

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

  //check if user exist -> if true -> do not insert user
  var user_exist = db.get('users').find({'username':form_user_string_replace}).value()
  if (user_exist){
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'User already registered !',
      buttons: ['Ok \!']
    });
    return;
  }

  //insert user in db
  const insert_user_db = collection
    .insert({ username: form_user_string_replace, user_password:form_password_string_hash, date:date_string })
    .write()

  //test user's insertion
  if (insert_user_db){

    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'Registration done',
      buttons: ['Ok \!']
    });
    window.location.href = "index.html";
  }
  else{
    alert("Error Insert User in Database")
  }

//end insert_user function
}

//Login : check user exist from index.html
function check_user_exist(form_user, form_password) {
  //require lib
  var bcrypt = require('bcryptjs');
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  const low = require('lowdb')
  const FileSync = require('../../../../node_modules/lowdb/adapters/FileSync.js')
  const lodashId = require('lodash-id')

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //lowdb init db config
  const adapter = new FileSync(db_path)
  const db = low(adapter)

  //format user and password to string
  var form_user_string = String(form_user);
  var form_password_string = String(form_password);

  //replace special charactere
  var form_user_string_replace = form_user_string.replace(/[^a-zA-Z0-9]/g, '');

  //check if user exist -> if true -> do not insert user
  var user_exist = db.get('users').find({'username':form_user_string_replace}).value();

  //test user exist
  if (user_exist){

    //and get some value from user
    var get_user_id = user_exist.id;
    var get_user_username = user_exist.username;
    var get_user_password = user_exist.user_password;
    var form_password_dehash = bcrypt.compareSync(form_password_string, get_user_password);

    if(get_user_username == form_user_string_replace && form_password_dehash == true){
      //init cookie config
      const cookie = {
        url: 'http://ulrichthekeeper.com',
        name: form_user_string_replace,
        value: String(get_user_id)
      }
      //create cookie
      remote.session.defaultSession.cookies.set(cookie)
        .then(() => {
          // succès
          console.log("success OK ")
        }, (erreur) => {
          console.error(erreur)
        })
        window.location.href = "main.html";
    }
  }
  else{
    //if user not exist get message
    remote.dialog.showMessageBox({
      type: 'info',
      title: 'Attention !',
      message: 'Wrong Login or Password !',
      buttons: ['Ok \!']
    });
    return;
  }

//end check_user_exist function
}


//search data in database come from main.html
function search_data() {
  //require lib
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  const algorithm = 'aes-256-cbc';
  var crypt = require('crypto');
  const low = require('lowdb')
  const FileSync = require('../../../../node_modules/lowdb/adapters/FileSync.js')
  const lodashId = require('lodash-id')

  //get sqlite3 db path
  var db_path = db_config.db_path;

  //lowdb init db config
  const adapter = new FileSync(db_path)
  const db = low(adapter)
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

      //get some value from database
      var get_cookie_user_id = cookies[0].value;

      var get_user_organisation = db.get('passwords').filter({'id': get_cookie_user_id}).map('organisation').value();
      var get_user_email = db.get('passwords').filter({'id': get_cookie_user_id}).map('email').value();
      var get_user_hash_password = db.get('passwords').filter({'id': get_cookie_user_id}).map('hash_password').value();
      var get_user_date_password = db.get('passwords').filter({'id': get_cookie_user_id}).map('date_password').value();
      var get_user_iv = db.get('passwords').filter({'id': get_cookie_user_id}).map('iv').value();
      var get_user_key_password = db.get('passwords').filter({'id': get_cookie_user_id}).map('key_password').value();

      let result_string = 'Organisation: ';

      //i for loop
      var i;

      //loop for decrypt password and create data table
      for(i=0;i<get_user_organisation.length;i++){
        let iv2 = Buffer.from(get_user_iv[i], 'hex');
        let encryptedText = Buffer.from(get_user_hash_password[i], 'hex');
        let decipher = crypt.createDecipheriv('aes-256-cbc', Buffer.from(get_user_key_password[i], 'hex'), iv2);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        result_string = result_string + " " + get_user_organisation[i] + " ; ";

        table += get_user_organisation[i] + ',' + get_user_email[i] + ',' + decrypted.toString() + ',' + get_user_date_password[i] + ',';
      }

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

    //end documentReady
        });

    //end success get cookie
    }).catch((erreur) => {
      console.log(error)

    })

//end search_password function
}




function input_password(insert_email, insert_organisation, insert_password) {

  //require lib
  var crypt = require('crypto');
  const algorithm = 'aes-256-cbc';
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote
  const low = require('lowdb')
  const FileSync = require('../../../../node_modules/lowdb/adapters/FileSync.js')
  const lodashId = require('lodash-id')

  //get db path
  var db_path = db_config.db_path;

  //lowdb init db config
  const adapter = new FileSync(db_path)
  const db = low(adapter)

  //cast form element
  var insert_email_string = String(insert_email);
  var insert_organisation_string = String(insert_organisation);
  var insert_password_string = String(insert_password);

  // get cookies
  remote.session.defaultSession.cookies.get({
      url: 'http://ulrichthekeeper.com'
    })
    .then((cookies) => {
      // var cookie_user_id = Number(cookies[0].value);
      var cookie_user_id = cookies[0].value;

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

      //insert user in db
      const insert_user_db = db
        .get('passwords')
        .push({ email: insert_email_string, organisation:insert_organisation_string, hash_password:result_encrypted, key_password:result_key, iv:result_iv,date_password:date_string,id:cookie_user_id })
        .write()


      if(insert_user_db){
        remote.dialog.showMessageBox({
          type: 'info',
          title: 'Attention !',
          message: 'Input password successful \! ',
          buttons: ['Ok \!']
        });
      }

    }).catch((erreur) => {
      console.log(error)
    })
//end input_password function
}

function generate_password(insert_email, insert_organisation) {
  //require lib
  var crypt = require('crypto');
  const algorithm = 'aes-256-cbc';
  var db_config = require('../../../server/database_config.js');
  const remote = require('electron').remote;
  var min_pass = db_config.min_generate;
  var max_pass = db_config.max_generate;
  const low = require('lowdb')
  const FileSync = require('../../../../node_modules/lowdb/adapters/FileSync.js')
  const lodashId = require('lodash-id')

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  var length_password = getRandomIntInclusive(min_pass, max_pass)

  //get db path
  var db_path = db_config.db_path;

  //lowdb init db config
  const adapter = new FileSync(db_path)
  const db = low(adapter)

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
      var cookie_user_id = cookies[0].value;

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

      //insert user in db
      const insert_user_db = db
        .get('passwords')
        .push({ email: insert_email_string, organisation:insert_organisation_string, hash_password:result_encrypted, key_password:result_key, iv:result_iv,date_password:date_string,id:cookie_user_id })
        .write()

        if(insert_user_db){
          remote.dialog.showMessageBox({
            type: 'info',
            title: 'Attention !',
            message: 'Input password successful \! ',
            buttons: ['Ok \!']
          });
        }

    }).catch((erreur) => {
      console.log(error)
    })

//end generate_password function
}
