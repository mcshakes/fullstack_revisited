"use strict"

const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const localStrategy = passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },

  function verifyCallback(req, email, password, done) {
    return User.findOne({ email: email }, (err, user) => {
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
));


passport.serializeUser( (user, done) => {
  done(null, user.id);
})

passport.deserializeUser( (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

module.exports = { localStrategy }
