"use strict"

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  }
});

// userSchema.virtual("fullName").get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim()
// })

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    email: this.email
  }
}


const User = mongoose.model("User", userSchema)
module.exports = { User };
