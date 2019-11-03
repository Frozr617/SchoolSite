//Variables

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let login = null;
const loginAdmin = 'admin';
const loginPassword = 'admin';
let previewTitle = 'hello world';
let previewText = 'is the first app of any programmer' 

// app.js
const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'posts'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


//All the domens

//Connecting app to the public and views folders
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  res.render('index');
});


app.get('/login', function (req, res) {
  res.render('login');
});

//loging in
app.post('/login', function (req, res) {
  const loginLogin = req.body.login;
  const password = req.body.password;
  console.log(loginLogin);
  console.log(password);
  if (loginLogin == loginAdmin && password == loginPassword) {
    login = true;
    res.redirect('/admin');
    console.log(login);
    console.log('right!');
    console.log("Welcome, admin!");
  }
  else if (loginLogin != loginAdmin || password != loginPassword) {
    login = null;
    console.log(login);
    console.log("Try again");
  }
  else {
    console.log('Error');
  };
});

//if login succesfully, open admin page
app.get('/admin', function (req, res) {
    res.render('admin');
});

//About school parts{
app.get('/businesscard', function(req, res) {
  res.render('businesscard');
});
app.get('/symbols', function(req, res) {
  res.render('symbols');
});
app.get('/history', function(req, res) {
  res.render('history');
});
app.get('/administration', function(req, res) {
  res.render('administration');
});
app.get('/team', function(req, res) {
  res.render('team');
});
app.get('/conception', function(req, res) {
  res.render('conception');
});
app.get('/goals', function(req, res) {
  res.render('goals');
});
app.get('/statut', function(req, res) {
  res.render('statut');
});
//} About pages ending



//Admin dashboard
app.get('/admin', function(req, res) {
  res.redirect('admin');
});
app.get('/new_post', function(req, res) {
  if(login == true) {
    res.render('new_post');
  }
  if(login == null) {
    res.redirect('/login');
  }
});


//Connecting app to the post 7000
app.listen(7000, function () {
  console.log('Example app listening on port 7000!');
});