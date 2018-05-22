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
  }

  Book
    .create({
      title: req.body.title,
      author: req.body.author
    })
    .then((book) => {
      res.status(201).json(book.serialize())
    })
    .catch(err => {
      console.log(err);
    })

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

router.put("/books/:id", (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id ${req.params.id} and the request body id ${req.body.id} must match`
    );
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ["title", "author", "summary"];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Book
  .findByIdAndUpdate(req.params.id, { $set: toUpdate })
  .then(book => res.status(204).end())
  .catch(err => {
    console.log(err);
  })
})

router.delete("/books/:id", (req, res) => {
  Book
  .findByIdAndRemove(req.params.id)
  .then(book => res.status(204).json({ message: "Book Removed and deleted from your library"}).end())
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;
