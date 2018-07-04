const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models/user");

module.exports = function(passport, user) {

  passport.serializeUser( (user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })

  // passport.use("local", new LocalStrategy({
  //   username: "email",
  //   password: "password",
  //   passReqToCallback : true
  // },
  // function(req, email, password, done) {
  //   User.findOne({ "email": email }, (err, user) => {
  //     if (err) return done(err);
  //
  //     if (!user) {
  //       return done(null, false, req.flash("loginMessage", "No such user found."));
  //     }
  //
  //     if (!user.validatePassword(password)) {
  //       return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
  //     }
  //
  //     return done(null, user);
  //   })
  // }
  // ))

  passport.use("local", new LocalStrategy((username, password, callback) => {
    let user;
    User.findOne({ "email": username})
      .then(_user => {
        user = _user;
        if (!user) {
          return Promise.reject({
            reason: "LoginError",
            message: "Incorrect username"
          });
        }
        return user.validatePassword(password);
      })
      .then(isValid => {
        if (!isValid) {
          return Promise.reject({
            reason: "LoginError",
            message: "Incorrect password for that username"
          });
        }
        return callback(null, user);
      })
      .catch(err => {
        // err comes in like so:
          // { reason: 'LoginError',
          // message: 'Incorrect password for that username' }
        if (err.reason === "LoginError") {
          return callback(null, false, err);
        }
        return callback(err, false)
      })
  }))
}
