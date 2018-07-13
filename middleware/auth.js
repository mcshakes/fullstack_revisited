"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { User } = require("../models/user")

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    // console.log(req.sessionID)
    // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    // console.log(`req.user: ${JSON.stringify(req.user)}`)
    return next();
  }
  
  res.redirect("/login");
}

module.exports = { isLoggedIn }
