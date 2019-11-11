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
app.use(express.static('пости'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

db.all("SELECT count(*) as count FROM posts", function (err, rows) {
  rows.forEach(function(row) {
    posts_count = row.count;
    console.log(posts_count);
  });
});

app.get('/', function(req, res) {
  db.all("SELECT title_text, desc_text, preview_photo, day, month, year FROM posts WHERE id = ?", [posts_count], function(err, rows) {
    rows.forEach(function(row) {
      post1 = {
        'title': row.title_text,
        'preview_text': row.desc_text,
        'preview_image': row.preview_photo,
        'day': row.day,
        'month': row.month,
        'year': row.year
      }
    });
  });
  db.all("SELECT title_text, desc_text, preview_photo, day, month, year FROM posts WHERE id = ?", [posts_count - 1], function(err, rows) {
    rows.forEach(function(row) {
      post2 = {
        'title': row.title_text,
        'preview_text': row.desc_text,
        'preview_image': row.preview_photo,
        'day': row.day,
        'month': row.month,
        'year': row.year
      }
    });
  });
  db.all("SELECT title_text, desc_text, preview_photo, day, month, year FROM posts WHERE id = ?", [posts_count - 2], function(err, rows) {
    rows.forEach(function(row) {
      post3 = {
        'title': row.title_text,
        'preview_text': row.desc_text,
        'preview_image': row.preview_photo,
        'day': row.day,
        'month': row.month,
        'year': row.year
      }
    });
  });
  db.all("SELECT title_text, desc_text, preview_photo, day, month, year FROM posts WHERE id = ?", [posts_count - 3], function(err, rows) {
    rows.forEach(function(row) {
      post4 = {
        'title': row.title_text,
        'preview_text': row.desc_text,
        'preview_image': row.preview_photo,
        'day': row.day,
        'month': row.month,
        'year': row.year
      }
    });
  });
  db.all("SELECT title_text, desc_text, preview_photo, day, month, year FROM posts WHERE id = ?", [posts_count - 4], function(err, rows) {
    rows.forEach(function(row) {
      post5 = {
        'title': row.title_text,
        'preview_text': row.desc_text,
        'preview_image': row.preview_photo,
        'day': row.day,
        'month': row.month,
        'year': row.year
      }
    });
  });
  db.all("SELECT title_text, desc_text, preview_photo, day, month, year FROM posts WHERE id = ?", [posts_count - 5], function(err, rows) {
    rows.forEach(function(row) {
      post6 = {
        'title': row.title_text,
        'preview_text': row.desc_text,
        'preview_image': row.preview_photo,
        'day': row.day,
        'month': row.month,
        'year': row.year
      }
    });
  });
  if(posts_count > 0) {
    res.render('index', {
      post1Title: post1['title'],
      post1Preview: post1['preview_image'],
      post1Desc: post1['preview_text'],
      post1Day: post1['day'],
      post1Month: post1['month'],
      post1Year: post1['year'],
      //second post
      post2Title: post2['title'],
      post2Preview: post2['preview_image'],
      post2Desc: post2['preview_text'],
      post2Day: post2['day'],
      post2Month: post2['month'],
      post2Year: post2['year'],
      //third post
      post3Title: post3['title'],
      post3Preview: post3['preview_image'],
      post3Desc: post3['preview_text'],
      post3Day: post3['day'],
      post3Month: post3['month'],
      post3Year: post3['year'],
      //fourth post
      post4Title: post4['title'],
      post4Preview: post4['preview_image'],
      post4Desc: post4['preview_text'],
      post4Day: post4['day'],
      post4Month: post4['month'],
      post4Year: post4['year'],
      //fifth post
      post5Title: post5['title'],
      post5Preview: post5['preview_image'],
      post5Desc: post5['preview_text'],
      post5Day: post5['day'],
      post5Month: post5['month'],
      post5Year: post5['year'],
      //sixth post
      post6Title: post6['title'],
      post6Preview: post6['preview_image'],
      post6Desc: post6['preview_text'],
      post6Day: post6['day'],
      post6Month: post6['month'],
      post6Year: post6['year']
    });
  }
  else if(posts_count == 0) {
    res.render('index');
  }
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
  db.run('INSERT INTO posts(id, title_text, desc_text, main_text, preview_photo, photo1, photo2, photo3, photo4, day, month, year) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [posts_count + 1, title, description, mainText, previewPhoto, photo1, photo2, photo3, photo4, date.getDate(), date.getMonth(), date.getFullYear()]);
  res.redirect('/');
});




//Connecting app to the post 7000
app.listen(7000, function () {
  console.log('Example app listening on port 7000!');
});