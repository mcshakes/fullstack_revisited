const { User } = require("../models/user");
const mongoose = require("mongoose");


exports.loginForm = (req, res) => {
  res.render("login", { title: "Login" });
}

exports.logUserIn = (req, res) => {
  console.log("REQUEST", req.user)
  console.log("RESPONSE", res.user)
  // return res.status(200).json(req.user.serialize())
}

exports.logUserOut = (req, res) => {
  req.logout();
  res.redirect("/")
}


exports.registerForm = (req, res) => {
  res.render("registerForm", {title: "Register"})
}

exports.register = (req, res) => {
  console.log("REQUEST", req.body)

  // const reqFields = ["email", "password"];
  //
  // for (let i = 0; i < reqFields.length; i++) {
  //   const field = reqFields[i];
  //
  //   if (!field in req.body) {
  //     const message = `Missing ${field} in the request body`;
  //     console.log(message)
  //     return res.status(400).send(message)
  //   }
  //
  //   return User.hashPassword(req.body.password)
  //     .then(hash => {
  //       { hash }
  //
  //       return User.create({
  //           email: req.body.email,
  //           password: hash
  //       })
  //       .then(user => {
  //         res.status(201).json(user.serialize())
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //     })
  // }
}

// exports.validateRegister = (req, res, next) => {
//   req.sanitizeBody("name");
//     req.checkBody("name", "You must supply a name!").notEmpty();
//     req.checkBody("email", "That Email is not valid!").isEmail();
//     req.sanitizeBody("email").normalizeEmail({
//       remove_dots: false,
//       remove_extension: false,
//       gmail_remove_subaddress: false
//     });
//     req.checkBody("password", "Password Cannot be Blank!").notEmpty();
//     req.checkBody("password-confirm", "Confirmed Password Cannot Be Blank!").notEmpty();
//     req.checkBody("password-confirm", "your passwords dont match").equals(req.body.password);
//
//     const errors = req.validationErrors();
// }
