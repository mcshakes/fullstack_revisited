"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Book } = require("../models/book")
const router = express.Router({mergeParams: true});

// Controller modules
const libraryController = require("../controllers/libraryController")

router.post("/books", (req, res) => {
  const reqFields = ["title", "author"];

  for (let i = 0; i < reqFields.length; i++) {
    const field = reqFields[i];

    if (!field in req.body) {
      const message = `Missing ${field} in the request body`;
      console.log(message)
      return res.status(400).send(message)
    }
  }

  Book
    .create({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary
    })
    .then((book) => {
      res.status(201).json(book.serialize())
    })
    .catch(err => {
      console.log(err);
    })

})

router.get("/books", libraryController.getLibrary);
router.get("/books/:id", libraryController.getBook);
router.put("/books/:id", libraryController.editBook);
router.delete("/books/:id", libraryController.deleteBook);

module.exports = router;
