//Variables

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let login = null;
const loginAdmin = 'admin';
const loginPassword = 'admin';
let previewTitle = 'hello world';
let previewText = 'is the first app of any programmer' 
const sqlite = require('sqlite3').verbose();
const fs = require('fs');
var posts_count = null;
//first post
var title1 = null;
var preview_text1 = null;
var main_text1 = null;
var preview_photo1 = null;
var photo1_1 = null;
var photo1_2 = null;
var day1 = null;
var month1 = null;
var year1 = null;
//end if the first post
var date = new Date();
//second post
var title2 = null;
var preview_text2 = null;
var main_text2 = null;
var preview_photo2 = null;
var photo2_1 = null;
var photo2_2 = null;
var day2 = null;
var month2 = null;
var year2 = null;
//end of the second post
//all the posts
var post1 = null;
var post2 = null;
var post3 = null;
var post4 = null;
var post5 = null;
var post6 = null;

let db = new sqlite.Database('./posts.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the posts SQLite database');
});

//All the domens

//Connecting app to the public and views folders
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

db.all("SELECT * FROM posts WHERE id = ?", [1], function (err, rows) {
  rows.forEach(function (row) {
    day1 = row.day;
    month1 = row.month;
    year1 = row.year;
    title1 = row.title_text;
    preview_text1 = row.desc_text;
    main_text1 = row.main_text;
    preview_photo1 = row.preview_photo;
    photo1_1 = row.photo1;
    photo1_2 = row.photo2;
    post1 = {
      'title': title1,
      'preview_text': preview_text1,
      'main_text': main_text1,
      'preview_photo': preview_photo1,
      'photo1': photo1_1,
      'photo2': photo1_2,
      'photo3': null,
      'photo4': null,
      'day': day1,
      'month': month1,
      'year': year1
    }     
 });
});



db.all("SELECT * FROM posts WHERE id = ?", [2], function (err, rows) {
  rows.forEach(function (row) {
    day2 = row.day;
    month2 = row.month;
    year2 = row.year;
    title2 = row.title_text;
    preview_text2 = row.desc_text;
    main_text2 = row.main_text;
    preview_photo2 = row.preview_photo;
    photo2_1 = row.photo1;
    photo2_2 = row.photo2;
    post2 = {
      'title': title2,
      'preview_text': preview_text2,
      'main_text': main_text2,
      'preview_photo': preview_photo2,
      'photo1': photo2_1,
      'photo2': photo2_2,
      'photo3': null,
      'photo4': null,
      'day': day2,
      'month': month2,
      'year': year2
    }     
 });
});

app.get('/', function(req, res) {
  res.render('index', {title: post2['title'], desc: post2['preview_text'], photo1: post2['preview_photo']});
  console.log(post1['title']);
  console.log(post2['title']);
  db.all("SELECT count(*) as count FROM posts", function (err, rows) {
    rows.forEach(function(row) {
      posts_count = row.count;
      console.log(posts_count);
    });
  });
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
app.get('/contacts', function(req, res) {
  res.render('contacts');
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

app.post('/new_post', function(req, res) {
  var title = req.body.title;
  var mainText = req.body.mainText;
  var description = req.body.textThatWillBeShownOnThePreview;
  var previewPhoto = req.body.preview_photo;
  var photo1 = req.body.photo1;
  var photo2 = req.body.photo2;
  var photo3 = req.body.photo3;
  var photo4 = req.body.photo4;
  db.run('INSERT INTO posts(id, title_text, desc_text, main_text, preview_photo, photo1, photo2, photo3, photo4, day, month, year) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [2, title, description, mainText, previewPhoto, photo1, photo2, photo3, photo4, date.getDate(), date.getMonth(), date.getFullYear()]);
  res.redirect('/');
});




//Connecting app to the post 7000
app.listen(7000, function () {
  console.log('Example app listening on port 7000!');
});