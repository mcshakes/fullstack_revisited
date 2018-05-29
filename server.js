"use strict"

const express = require("express");
const router = express.Router({mergeParams: true});
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("cookie-session");
const path = require("path");
const expressValidator = require('express-validator');
const { localStrategy } = require("./middleware/auth");
const { parseString } = require("xml2js");
const cors = require("cors");
const request = require("request-promise");

const {PORT, DATABASE_URL, GOODREADS_KEY, GOODREADS_SECRET} = require("./config");
mongoose.Promise = global.Promise;
const { Book } = require("./models/book")


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));

const bookRouter = require("./routes/book-routes")
const userRouter = require("./routes/user-routes")

app.use(expressValidator());

app.use(bookRouter);
app.use(userRouter);

app.use(session({ secret: "password1" }));
passport.use("local", localStrategy);
app.use(passport.initialize());



app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname + "/client/public/index.html"));
  // send back index.html => ajax to get all book data /books
  res.render("index")
})

app.get("/search", (req, res) => {

  res.send("Index!! Only place a user can come unauthenticated")

  let searchQuery = "stephen king";
  request
    .get(`https://www.goodreads.com/search/index.xml?key=${GOODREADS_KEY}&q=${searchQuery}`)
    .then(result =>
      parseString(result, (err, goodResult) =>
        goodResult.GoodreadsResponse.search[0].results[0].work.map( work => {
          console.log(work)
        })
      )
    );
})


// ************************ SERVER *****************************

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on ${port}`)
        resolve();
      })

      .on("error", err => {
        mongoose.disconnect();
        reject(err)
      })
    })
  })
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
