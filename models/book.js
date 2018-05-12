"use strict"

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const bookSchema = mongoose.Schema({
  title: String,
  author: {
    firstName: String,
    lastName: String
  },
  summary: String
});

bookSchema.virtual("fullName").get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()
})

bookSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.fullName,
    summary: this.summary
  }
}

const Book = mongoose.model("Book", bookSchema)

module.exports = { Book, bookSchema };
