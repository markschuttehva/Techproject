const express = require('express');
const app = express();
const port = 9999;
const db = require('./server/data.js');

app
    .set('view engine', 'pug')
    .use('/static', express.static('static'))
    .get('/', home)
    .get('/matches', matches)
    .get('/:id', match)
    .get('*', error404);

function home(req, res){
  res.render("home.pug");
}
function matches(req, res){
  res.render("matches.pug");
}
function next(req, res){
  res.render("next.pug");
}
function error404(req, res){
  res.status(404).send('404: De pagina is helaas niet gevonden');
}

app.listen(port, note())
function note() {
  console.log('Server is gestart op port:' + port);
}

// function matches(req, res) {
//   res.render('matches.pug', {data: partner})
// }

function match(req, res) {
  var id = req.params.id
  var partner = db.filter(function (value) {
    return value.id == id
  })
  console.log(db);
  console.log(partner);
  res.render("matches.pug", { data: partner });
  res.render("home.pug", { data: partner });
}