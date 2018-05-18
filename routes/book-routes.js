"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Book } = require("../models/book")
const router = express.Router({mergeParams: true});


router.post("/books", (req, res) => {
  const reqFields = ["title", "author"];

  for (let i = 0; i < reqFields.length; i++) {
    const field = reqFields[i];

    if (!field in req.body) {
      const message = `Missing ${field} in the request body`;
      console.log(message)
      return res.status(400).send(message)
    }

    Book
    .create({
      title: req.body.title,
      author: req.body.author
    })
    .then(book => res.status(201).json(book.serialize()))
    .catch(err => {
      console.log(err);
    })
  }
})

router.get("/books", (req, res) => {
  Book
  .find()
   // .limit()
  .then(books => {
    res.json({
      books: books.map(
        (book) => book.serialize()
      )
    });
  })
  .catch(err => {
    res.status(500).json({ message: "Internal server error"})
    console.log(err);
  })
})

router.get("/books/:id", (req, res) => {
  Book
  .findById(req.params.id)
  .then(book => res.json(book.serialize()))
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;
