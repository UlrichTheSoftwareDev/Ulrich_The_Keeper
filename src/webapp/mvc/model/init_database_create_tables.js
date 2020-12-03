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
