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
  res.render("register", {title: "Register"})
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("name");
    req.checkBody("name", "You must supply a name!").notEmpty();
    req.checkBody("email", "That Email is not valid!").isEmail();
    req.sanitizeBody("email").normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    });
    req.checkBody("password", "Password Cannot be Blank!").notEmpty();
    req.checkBody("password-confirm", "Confirmed Password Cannot Be Blank!").notEmpty();
    req.checkBody("password-confirm", "your passwords dont match").equals(req.body.password);

    const errors = req.validationErrors();
}
