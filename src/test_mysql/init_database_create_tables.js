//init MYSQL database create tables and insert test dataset
// var mysql = require('mysql');
// var db_config = require('../../../server/database_config.js')
//
// var host = db_config.db_host;
// var user = db_config.db_user;
// var password = db_config.db_password;
// var name_database = db_config.db_name;
//
//
// //init database connection with some dataset
// var con_dataset = mysql.createConnection({
//   host: host,
//   user: user,
//   password: password,
//   database: name_database
// });
//
// con_dataset.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//
// //create users table
// var create_users_table = "CREATE TABLE if not exists users (id_user INTEGER PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL UNIQUE, user_password TEXT NOT NULL, date_user TEXT)";
// con_dataset.query(create_users_table, function (err, result) {
//   if (err) throw err;
//   console.log("Table users created");
// });
//
// //create passwords table
// var create_passwords_table = "CREATE TABLE if not exists passwords (id_password INTEGER PRIMARY KEY AUTO_INCREMENT, email TEXT NOT NULL, organisation TEXT, hash_password TEXT NOT NULL, key_password TEXT, iv TEXT, date_password TEXT, id_user_fk INTEGER, FOREIGN KEY(id_user_fk) REFERENCES users(id_user))";
// con_dataset.query(create_passwords_table, function (err, result) {
//   if (err) throw err;
//   console.log("Table passwords created");
// });
//
//
// //insert test data into users table
// var insert_users_table = "INSERT users(username,user_password, date_user) VALUES (?,?,?)";
// var value_users_table=["toto","pass", "01-01-2000"];
// con_dataset.query(insert_users_table, value_users_table, function (err, result, fields) {
//   if (err) throw err;
//   console.log("Insert row users tables");
// });
//
// //insert test data into passwords table
// var insert_passwords_table = "INSERT passwords(email,organisation,hash_password,key_password, iv, date_password,id_user_fk) VALUES (?,?,?,?,?,?,?)";
// var value_passwords_table=['toto@toto.com','toto_company','password_toto_hash','key_passwords','iv_password','01-01-2020','1'];
// con_dataset.query(insert_passwords_table, value_passwords_table, function (err, result) {
//   if (err) throw err;
//   console.log("Insert row passwords tables");
// });
//
// con_dataset.end();
//
// });


//import sqlite3
var sqlite3 = require('sqlite3').verbose();

//create database if not exist
var db = new sqlite3.Database('../databases/electron_db.db');

//create tables
db.run("CREATE TABLE if not exists users (id_user INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, user_password TEXT NOT NULL, date_user TEXT)");
db.run("CREATE TABLE if not exists passwords (id_password INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, organisation TEXT, hash_password TEXT NOT NULL, key_password TEXT, iv TEXT, date_password TEXT , id_user_fk INTEGER, FOREIGN KEY(id_user_fk) REFERENCES users(id_user))");

//init db with some random data for dev ONLY
var query_user = db.prepare("INSERT OR REPLACE INTO users(username,user_password,date_user) VALUES (?,?,?) ");
query_user.run("toto","passwordtoto","01-01-2020");
query_user.finalize();

var query_password = db.prepare("INSERT OR REPLACE INTO passwords(email,organisation,hash_password,key_password,iv,date_password,id_user_fk) VALUES (?,?,?,?,?,?,?)");
query_password.run("toto@toto.com","facetoto","hash_toto_password","key_toto","iv_toto","01-01-2020","1");
query_password.finalize();

db.close();
