"use strict"

const express = require("express");
const router = express.Router({mergeParams: true});
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {PORT, DATABASE_URL} = require("./config");
mongoose.Promise = global.Promise;
const { Book } = require("./models/book")


const app = express();
app.use(bodyParser.json());

const bookRouter = require("./routes/book-routes")
const userRouter = require("./routes/user-routes")

app.use(bookRouter);
app.use("/users", userRouter);
// NOTE User GET will be app.get("/:user_id") ?

// So what is app.get("/")


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
