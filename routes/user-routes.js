"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Book } = require("../models/book")
const books = require("../routes/book-routes");

const router = express.Router();

router.get("/:id", function (req, res, next) {
  
})

router.use("/books", books)

module.exports = router;
