"use strict"

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  slug: String,
  summary: {
    type: String,
    trim: true
  }
});

// bookSchema.pre("save", function(next) {
//   if (!this.isModified("title")) {
//     next();
//     return;
//   }
//   this.slug = slug(this.title);
//   next();
// })

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
