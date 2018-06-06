"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Book } = require("../models/book")
const router = express.Router({mergeParams: true});

// Controller modules
const libraryController = require("../controllers/libraryController")

router.get("/books", libraryController.getLibrary);
router.get("/books/:id", libraryController.getBook);

// router.get("/books/:id/delete", libraryController.deleteForm);
router.delete("/books/:id", libraryController.deleteBook);

router.post("/books", libraryController.createBook);
router.get("/add-new-book", libraryController.createBookForm);

router.get("/edit-book/:id", libraryController.updateBook)

router.post("/books/:id", libraryController.editBook);

module.exports = router;
