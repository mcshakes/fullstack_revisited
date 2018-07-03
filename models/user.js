"use strict"

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { bookSchema } = require("../models/book")

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true, // saved as lowercase
    trim: true,
    require: "Please Give an Email Address"
  },
  password: {
    type: String,
    require: true
  },
  library: [ bookSchema ]
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

userSchema.methods.validatePassword = function(password) {
  console.log("INCOMING", password)
  console.log("REAL", this.password)
  return bcrypt.compare(password, this.password);
}

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    email: this.email,
    library: this.library
  }
}


const User = mongoose.model("User", userSchema)
module.exports = { User };
