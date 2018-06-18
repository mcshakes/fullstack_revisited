"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { User } = require("../models/user")

// Passport requirements
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const localStrategy = new LocalStrategy(
  function(username, password, done)
  {
      User.findOne({ email: username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, {message: "Incorrect username"});
        }

        if (!user.validatePassword(password)) {
          return done(null, false, { message: "Incorrect password."});
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

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
    return;
  }
  console.log("Must be logged in to do that");
  res.redirect("/login");
}

module.exports = { localStrategy, isLoggedIn }
