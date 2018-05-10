"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Book } = require("../models/book")
const books = require("../routes/book-routes");
const router = express.Router();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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


// router.get("/", function (req, res, next) {
//   // Should be handled because in use by the server.js
// })
//
// router.get("/:id", (req, res) => {
//   let userId = req.params.id;
//
//
// })

router.use("/books", books)

module.exports = router;
