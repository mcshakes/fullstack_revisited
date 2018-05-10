"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Book } = require("../models/book")
const books = require("../routes/book-routes");

const router = express.Router();

// router.get("/", function (req, res, next) {
//   // Should be handled because in use by the server.js
// })
//
// router.get("/:id", (req, res) => {
//   let userId = req.params.id;
//
//
// })

router.use("/books", books)

module.exports = router;
