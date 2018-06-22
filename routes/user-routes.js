
"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const userController = require('../controllers/userController');

const passport = require("passport");
const { Book } = require("../models/book")
const { User } = require("../models/user")
const { isLoggedIn } = require("../middleware/auth")
const books = require("../routes/book-routes");


router.get("/users", (req, res) => {
  res.send("Index for users?")
});

router.get("/login", userController.loginForm);
router.post("/login", passport.authenticate("local"), userController.logUserIn);
router.get("/logout", userController.logUserOut);

router.get("/register", userController.registerForm);
router.post("/register", userController.register);


// NOTE: AUTHENTICATED
router.get("/users/:id", userController.showUser);

router.post("/users/:id/books", userController.addBookToLibrary);
router.get("/users/:id/books/:id", userController.showUserBook);

// NOTE: UNAUTHENTICATED
router.get("/search", userController.searchForm);
router.post("/search-results", userController.searchBook);

module.exports = router;
