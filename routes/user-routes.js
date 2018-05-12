"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

const { Book } = require("../models/book")
const { User } = require("../models/user")
const { localStrategy } = require("../middleware/auth")
const books = require("../routes/book-routes");


router.get("/users", (req, res) => {
  res.send("Index for users?")
});

router.get("/users/:id", (req, res) => {
  let userId = req.body.id
  let userName = req.body.username

  res.send(`Page of ${userName}`)

})

passport.use("local", localStrategy);
const localAuth = passport.authenticate("local", { session: false });

router.get("/login", (req, res) => {

})


router.post("/login", localAuth, (req, res) => {
  // console.log(req.body)
  return res.status(200).json(req.user.serialize())
})

router.post("/users/:id/books", (req, res) => {
  let bookId = req.body.bookId;
  let userId = req.params.id;

  let book = Book.findById(bookId, (err, book) => {
    if (err) throw err;

    User.findByIdAndUpdate(userId,
      { "$push": { "library": book} },
      { "new": true, "upsert": true},
      function (err, user) {
        if (err) throw err;
        console.log(user)

        return res.status(201).json(user);
      }
    );
  })

});

router.post("/signup", (req, res) => {
  const reqFields = ["email", "password"];

  for (let i = 0; i < reqFields.length; i++) {
    const field = reqFields[i];

    if (!field in req.body) {
      const message = `Missing ${field} in the request body`;
      console.log(message)
      return res.status(400).send(message)
    }

    return User.hashPassword(req.body.password)
      .then(hash => {
        { hash }

        return User.create({
            email: req.body.email,
            password: hash
        })
        .then(user => {
          res.status(201).json(user.serialize())
        })
        .catch(err => {
          console.log(err);
        })
      })
  }
})


module.exports = router;
