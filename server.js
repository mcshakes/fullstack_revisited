"use strict"

const express = require("express");
const router = express.Router({mergeParams: true});
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const path = require("path");
const morgan = require("morgan");
const expressValidator = require('express-validator');
const { localStrategy } = require("./middleware/auth");
const { parseString } = require("xml2js");
const cors = require("cors");
const request = require("request-promise");
const $ = require('jquery');
require('dotenv').config()

const {PORT, DATABASE_URL} = require("./config");
mongoose.Promise = global.Promise;
const { Book } = require("./models/book")


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));

const bookRouter = require("./routes/book-routes")
const userRouter = require("./routes/user-routes")

app.use(expressValidator());

app.use(bookRouter);
app.use(userRouter);

app.use(session({
  secret: "password1",
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false
}));

passport.use("local", localStrategy);
app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname + "/client/public/index.html"));
  // send back index.html => ajax to get all book data /books
  res.redirect("/books")
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
