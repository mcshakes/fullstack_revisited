"use strict"

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  username: String
});

// userSchema.virtual("fullName").get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim()
// })

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username
  }
}

const User = mongoose.model("User", userSchema)

module.exports = { User };
