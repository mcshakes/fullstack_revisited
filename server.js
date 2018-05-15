"use strict"

const express = require("express");
const router = express.Router({mergeParams: true});
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("cookie-session");
const { localStrategy } = require("./middleware/auth")
const request = require("request");
const Client = require("node-rest-client").Client;
const client = new Client();

const {PORT, DATABASE_URL, GOODREADS_KEY, GOODREADS_SECRET} = require("./config");
mongoose.Promise = global.Promise;
const { Book } = require("./models/book")


const app = express();
app.use(bodyParser.json());

const bookRouter = require("./routes/book-routes")
const userRouter = require("./routes/user-routes")

app.use(bookRouter);
app.use(userRouter);
// NOTE User GET will be app.get("/:user_id") ?

// So what is app.get("/")

app.use(session({ secret: "password1" }));
passport.use("local", localStrategy);
app.use(passport.initialize());

app.get("/", (req, res) => {

  // <Buffer 49 6e 76 61 6c 69 64 20 41 50 49 20 6b 65 79 2e 0a 3c 21 2d 2d 20 54 68 69 73 20 69 73 20 61 20 72 61 6e 64 6f 6d 2d 6c 65 6e 67 74 68 20 48 54 4d 4c ... >

  res.send("Index!! Only place a user can come unauthenticated")

  let args = {
    mimetypes: {
       json: ['application/json', 'application/json; charset=utf-8'],
       xml: ['application/xml', 'application/xml; charset=utf-8']
     },
    q: "Stephen King",
    key: GOODREADS_KEY,
    secret: GOODREADS_SECRET,
    search: "all"
  };

  let options = {

  };

  client.get("https://www.goodreads.com/search/index.xml", args, (err, data, response) => {
    if (err) {
      return console.log(err);
    }
    console.log(response)
    // console.dir(JSON.parse(data));
  })

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
