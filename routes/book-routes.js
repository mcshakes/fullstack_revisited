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
router.put("/books/:id", libraryController.editBook);
router.delete("/books/:id", libraryController.deleteBook);

router.post("/books", libraryController.createBook);
router.get("/add-new", libraryController.createBookForm);
module.exports = router;
