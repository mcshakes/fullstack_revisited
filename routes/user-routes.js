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

router.get("/users/:id", (req, res) => {
  let userId = req.params.id
  // let userName = req.body.username

  User
    .findById(userId)
    .then(user => res.json(user.serialize()))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    })

})

passport.use("local", localStrategy);
const localAuth = passport.authenticate("local", { session: false });


router.get("/login", userController.loginForm);
router.post("/login", userController.logUserIn);
router.get("/logout", userController.logUserOut);

// router.post("/login", localAuth, (req, res) => {
//   // console.log(req.body)
//   return res.status(200).json(req.user.serialize())
// })

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/")
// })


router.post("/users/:id/books", (req, res) => {
  let bookId = req.body.bookId;
  let userId = req.params.id;

  let book = Book.findById(bookId, (err, book) => {
    if (err) throw err;

    User.findByIdAndUpdate(userId,
      { "$push": { "library": book} },
      { "new": true, "upsert": true},
      function (err, user) {
        if (err) throw err;
        console.log(user)

        return res.status(201).json(user);
      }
    );
  })

});

router.get("/register", userController.registerForm);
router.post("/register", userController.register);



module.exports = router;
