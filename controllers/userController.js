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
