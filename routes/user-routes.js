"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { Book } = require("../models/book")
const books = require("../routes/book-routes");

// router.use("/books", books)
router.use("/users/:id/books", books)

router.get("/users", (req, res) => {
  res.send("Index for users?")
});

router.get("/users/:id", (req, res) => {
  let userId = req.body.id
  let userName = req.body.username

  res.send(`Page of ${userName}`)

})

router.get("/login")

// ------------------------ PASSPORT FUNCTIONS ------------------------

passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },

  function verifyCallback(req, username, password, done) {
    db.User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);

      if (!user || !user.validPassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    })
  }
)
);

passport.serializeUser( (user, done) => {
  done(null, user.id);
})

passport.deserializeUser( (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

module.exports = router;
