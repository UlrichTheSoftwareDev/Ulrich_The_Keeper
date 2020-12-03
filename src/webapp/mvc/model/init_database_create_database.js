//import sqlite3
var sqlite3 = require('sqlite3').verbose();

//create database if not exist
var db = new sqlite3.Database('../databases/electron_db.db');
