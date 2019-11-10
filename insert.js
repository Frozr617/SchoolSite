let mysql  = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);
 
// insert statment
let sql = `INSERT INTO todos(title,completed)
           VALUES('Learn how to insert a new row',true)`;
 
// execute the insert statment
connection.query(sql);
 
connection.end();