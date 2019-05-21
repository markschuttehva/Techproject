const express = require("express");
const app = express();
const port = 9999;
const db = require("./server/data.js");
let volgende = 1;

//Define the routes
app
    .set("view engine", "pug")
    .use("/static", express.static("static"))
    .get("/", home)
    .get("/register", register)
    .get("/:id", matches)
    .get("*", error404);

//goes to the home page (index)
function home(req, res) {
  res.render("home.pug");
}
//goes to the register page
function register(req, res) {
  res.render("register.pug");
}
//goes to the next match, next is used for the new match, partner is to load the data from the database
function matches(req, res) {
  volgende++;
  const partner = match(req);
  res.render("matches.pug", { data: partner, next: volgende });  
}

function error404(req, res) {
  res.status(404).send("404: De pagina is helaas niet gevonden");
}

app.listen(port, note());
function note() {
  /* eslint-disable no-console */ 
    console.log("Server is gestart op port:" + port);
  /* eslint-enable no-console */
}

//Get values from the database
function match() {
  //es4 const id = req.params.id;
  //es4 const partner = db.filter(function(value) {return value.id == id;} );
  
  //get the value of one user in the database
  //const {id} = req.params;
  //const partner = db.filter (value => value.id == id);
  
  //get the value of all users in the database
  const partner = db.filter(value => value);
  return partner;
}