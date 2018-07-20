const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
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

  passport.use(new LocalStrategy((username, password, done) => {
    let query = { "email": username}
    User.findOne(query, (err, user) => {
      if(err) throw err;

      if (!user) {
        return done(null, false, { message: "No such User found" })
      }

      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) throw err;

        if(isValid) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Wrong password"
          })
        }
      });
    })
  }))

  // NOTE: Previous
  // passport.use("local", new LocalStrategy((username, password, callback) => {
  //   let user;
  //   User.findOne({ "email": username})
  //     .then(_user => {
  //       user = _user;
  //       if (!user) {
  //         return Promise.reject({
  //           reason: "LoginError",
  //           message: "Incorrect email"
  //         });
  //       }
  //       return user.validatePassword(password);
  //     })
  //     .then(isValid => {
  //       if (!isValid) {
  //         return Promise.reject({
  //           reason: "LoginError",
  //           message: "Incorrect password for that username"
  //         });
  //       }
  //       return callback(null, user);
  //     })
  //     .catch(err => {
  //       // err comes in like so:
  //         // { reason: 'LoginError',
  //         // message: 'Incorrect password for that username' }
  //       if (err.reason === "LoginError") {
  //         console.log(err)
  //         return callback(null, false, err);
  //       }
  //       return callback(err, false)
  //     })
  // }))
}
