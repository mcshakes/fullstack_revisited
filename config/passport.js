const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models/user");

module.exports = function(passport, user) {

  passport.serializeUser( (user, done) => {
    console.log("Inside serialeUser callback!")
    done(null, user.id);
  })

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })

  passport.use("local", new LocalStrategy({
    username: "email",
    password: "password",
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({ "email": email }, (err, user) => {
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
  ))
}
