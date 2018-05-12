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
    console.log(username, password)
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



module.exports = { localStrategy }


// const localStrategy = function(passport) {
//
//   passport.serializeUser( (user, done) => {
//     done(null, user.id);
//   })
//
//   passport.deserializeUser( (id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });
//
//   passport.use("local", new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//       session: false
//     },
//
//     function verifyCallback(req, email, password, done) {
//       return User.findOne({ username: username }, (err, user) => {
//         if (err) return done(err);
//
//         if (!user) {
//           return done(null, false, {message: "Incorrect username"});
//         }
//
//         if (!user.validatePassword(password)) {
//           return done(null, false, { message: "Incorrect password."});
//         }
//
//         return done(null, user);
//       })
//     }
//   ))
// }
