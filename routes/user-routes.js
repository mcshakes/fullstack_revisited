"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const userController = require('../controllers/userController');

const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

const { Book } = require("../models/book")
const { User } = require("../models/user")
const { localStrategy } = require("../middleware/auth")
const books = require("../routes/book-routes");


router.get("/users", (req, res) => {
  res.send("Index for users?")
});

passport.use("local", localStrategy);
const localAuth = passport.authenticate("local", { session: false });


router.get("/login", userController.loginForm);
router.post("/login", localAuth, userController.logUserIn);
router.get("/logout", userController.logUserOut);


router.get("/register", userController.registerForm);
router.post("/register", userController.register);

router.get("/users/:id", userController.showUser);
router.post("/users/:id/books", userController.addBookToLibrary);


module.exports = router;
