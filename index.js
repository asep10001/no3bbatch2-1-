const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const hbs = require('hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'hbs');


//konfigurasi koneksi
var db = mysql.createPool({
  host: 'remotemysql.com',
  user: 'NmMApBVao4',
  password: 'wdugjGF98y',
  database: 'NmMApBVao4'
});

db.getConnection((err) => {
  if (err) throw (err);
  console.log('terkoneksi ke database!')
});

module.exports = db;
// connect ke database
db.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

//get halaman pertama
app.get('/', (req, res) => {

  var sql = `SELECT * FROM hasil`;
  var query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('view', { results: results });
    console.log(results);
  });
});

//add
app.post("/save", function(req, res) {
  let data = { cashier: req.body.cashier, product: req.body.product, category: req.body.category, price: req.body.price };
  let sql = "INSERT INTO hasil  SET?";
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route untuk update data
app.post('/update', (req, res) => {
  let sql = `UPDATE hasil SET cashier=${req.body.cashier},product='${req.body.product}', category='${req.body.category}', price=${req.body.price} WHERE No=${req.body.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route untuk delete data
app.post('/delete', (req, res) => {
  let sql = `DELETE FROM hasil WHERE No=${req.body.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
