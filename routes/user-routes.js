"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Book } = require("../models/book")
const books = require("../routes/book-routes");
const router = express.Router();

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  },
  function verifyCallback(req, username, password, done) {
    db.User.findOne({ username: username }, (err, user) => {
      if(err) return done(err);

      if (!user || !user.validPassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    })
  }
);

passport.serializeUser( (user, done) => {
  done(null, user.id);
})

passport.deserializeUser( (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

router.get("/login", (req, res) => {
  res.render("login!!")
});

router.get("/signup", (req, res) => {
  res.render("signup page!!")
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/users",
  failureRedirect: "/users/login"
}));

router.post("/signup", (req,res) => {
  db.User.create(req.body).then( (user) => {
    req.logIn(user, (err) => {
      return res.redirect("/users");
    });
  }, (err) {
    return next(err);
  });
});

router.get("/logout" (req, res) => {
  req.logout()
  req.flash("message", "logged out")
  res.redirect("/users/login")
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
