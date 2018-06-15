"use strict"

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  image: String,
  summary: {
    type: String,
    trim: true
  }
});

bookSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.author,
    summary: this.summary
  }
}

const Book = mongoose.model("Book", bookSchema)

module.exports = { Book, bookSchema };
