const { User } = require("../models/user");
const { Book } = require("../models/book");
const mongoose = require("mongoose");
const request = require("request-promise");
const { GOOGLE_KEY } = require("../config");

exports.loginForm = (req, res) => {
  res.render("login", { title: "Login" });
}

exports.logUserIn = (req, res) => {
  // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)

  return res.status(200)
            .redirect(`users/${req.user.id}`)
}

exports.logUserOut = (req, res) => {
  req.logout();
  res.redirect("/books")
}


exports.registerForm = (req, res) => {
  res.render("registerForm", {title: "Register"})
}

exports.register = (req, res) => {

  const reqFields = ["email", "password"];

  for (let i = 0; i < reqFields.length; i++) {
    const field = reqFields[i];

    if (!field in req.body) {
      const message = `Missing ${field} in the request body`;
      console.log(message)
      return res.status(400).send(message)
    }

    return User.hashPassword(req.body.password)
      .then(hash => {
        { hash }

        return User.create({
            email: req.body.email,
            password: hash
        })
        .then(user => {
          res.status(201)
          console.log(user)
          res.render("userPage", user)
        })
        .catch(err => {
          console.log(err);
        })
      })
  }
}

exports.showUser = (req, res) => {
  let userId = req.params.id
  // console.log(res.req.user)
  // let _id = "5b2d4a6e24b470040608c34e"

  User
    .findById(userId)
    .then(user => {
      res.render("userPage", { user: req.user })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    })
}

exports.addBookToLibrary = (req, res) => {
  let userId = req.params.id;

  Book
    .create({
      title: res.req.body.title,
      author: res.req.body.author,
      summary: res.req.body.summary,
      image: res.req.body.image
    })
    .then((book) => {
      User.findByIdAndUpdate(userId,
        { "$push": { "library": book} },
        { "new": true, "upsert": true},
        function (err, user) {
          if (err) throw err;

          return res.status(201).json(user);
        }
      );
    })
}

exports.showUserBook = (req, res) => {

  Book
    .findById(req.params.id)
    .then(book => {
      res.render("userBook", { book: book, user: req.user })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.removeBookFromLibrary = (req, res) => {
  let userId = res.req.user.id

  Book
    .findById(req.params.id)
    .then(book => {
      User.findByIdAndUpdate(userId,
        { "$pull": { "library": book} },
        function (err, user) {
          if (err) throw err;

          return res.status(204).json(user);
        }
      );
    })
}

exports.searchForm = (req, res) => {
  // console.log("In search form => ", req.sessionID)
  console.log(`req.user: ${JSON.stringify(req.user)}`)
  res.render("searchForm", { user: req.user})
}


exports.searchBook = (req, res) => {
  let searchQuery = req.body.title
  const booksURL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.GOOGLE_KEY}`

  request
    .get(booksURL)
    .then(books => {
      let library = JSON.parse(books)
      let results = library.items
      res.render("searchResults", { books: results,
        user: req.user
      })
      // console.log(req.user)
      // console.log("In search RESULTS => ", req.sessionID)
    })
    .catch((err) => {
      console.log(err);
    })
}

// exports.validateRegister = (req, res, next) => {
//   req.sanitizeBody("name");
//     req.checkBody("name", "You must supply a name!").notEmpty();
//     req.checkBody("email", "That Email is not valid!").isEmail();
//     req.sanitizeBody("email").normalizeEmail({
//       remove_dots: false,
//       remove_extension: false,
//       gmail_remove_subaddress: false
//     });
//     req.checkBody("password", "Password Cannot be Blank!").notEmpty();
//     req.checkBody("password-confirm", "Confirmed Password Cannot Be Blank!").notEmpty();
//     req.checkBody("password-confirm", "your passwords dont match").equals(req.body.password);
//
//     const errors = req.validationErrors();
// }
