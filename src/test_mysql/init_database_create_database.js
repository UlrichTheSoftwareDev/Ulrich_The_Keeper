// //init MYSQL database
// var mysql = require('mysql');
// var db_config = require('../../../server/database_config.js')
//
// var host = db_config.db_host;
// var user = db_config.db_user;
// var password = db_config.db_password;
// var name_database = db_config.db_name;
//
// //init database connection
// var con = mysql.createConnection({
//   host: host,
//   user: user,
//   password: password
// });
//
// //connect database
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//
//   //create database if not exists
//   con.query("CREATE DATABASE IF NOT EXISTS electron_db", function (err, result) {
//   if (err) throw err;
//   console.log("Database created");
// });
//
// con.end();
//
// });


//import sqlite3
var sqlite3 = require('sqlite3').verbose();

//create database if not exist
var db = new sqlite3.Database('../databases/electron_db.db');
