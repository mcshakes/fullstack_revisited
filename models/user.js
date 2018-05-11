"use strict"

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true, // saved as lowercase
    trim: true,
    require: "Please Give an Email Address"
  },
  username: {
    type: String,
    required: true,
    trim: true
  }
});

// userSchema.virtual("fullName").get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim()
// })

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    email: this.email
    username: this.username
  }
}


const User = mongoose.model("User", userSchema)
module.exports = { User };
