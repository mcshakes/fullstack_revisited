const { User } = require("../models/user");
const { Book } = require("../models/book");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const request = require("request-promise");
const { GOOGLE_KEY } = require("../config");

exports.loginForm = (req, res) => {
  res.render("login", { title: "Login", success: false, errors: req.session.errors });
  req.session.errors = null;
  // res.render("login", { title: "Login" });
}

exports.logUserIn = (req, res) => {
  // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
  // console.log(req.user)

  // req.checkBody("email", "Please add your LOGIN email").notEmpty();
  // req.checkBody("password", "You need to add your password").notEmpty();
  // console.log("BEFORE", req.session.errors)
  // const errors = req.validationErrors();

  // console.log(err)
  // if (errors) {
  //   req.session.errors = errors
  //   res.render("login", {
  //     title: "User Error"
  //     errors: errors
  //   })
  // }

  res.redirect(`users/${req.user.id}`)
}

exports.logUserOut = (req, res) => {
  req.logout();
  res.redirect("/books")
}


exports.registerForm = (req, res) => {
  res.render("registerForm", {title: "Register"})
}

exports.register = (req, res) => {
  const email  = req.body.email;
  const password  = req.body.password;

  req.checkBody("email", "Email can't be empty").notEmpty();
  req.checkBody("password", "Password can't be empty").notEmpty();
  const errors = req.validationErrors();

  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`)

    res.render("registerForm", {
      title: "Registration Error",
      errors: errors
    });
  } else {
    let newUser = new User({
      email: email,
      password: password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash("success", "You ")
            res.redirect("login")
          }
        })
      });
    })
  }

  // NOTE: Previous implement

  // return User.hashPassword(req.body.password)
  //   .then(hash => {
  //     { hash }
  //
  //     return User.create({
  //         email: req.body.email,
  //         password: hash
  //     })
  //     .then(user => {
  //       res.status(201)
  //       res.redirect(`users/${user.id}`)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //   })
}

exports.showUser = (req, res) => {
  let userId = req.params.id
  // console.log(res.req.user)
  // let _id = "5b2d4a6e24b470040608c34e"

  User
    .findById(userId)
    .then(user => {
      // res.render("userPage", { user: req.user })
      res.render("userPage", { user: req.user, success: false, errors: req.session.errors })
      req.session.errors = null;
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
      // console.log(book)
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
  // console.log(`req.user: ${JSON.stringify(req.user)}`)
  res.render("searchForm", { user: req.user})
}


exports.searchBook = (req, res) => {
  let searchQuery = req.body.title
  const booksURL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.GOOGLE_KEY}`

  req.checkBody("title", "Need a title. Can't search for nothing").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`)

    res.render("searchForm", {
      title: "Error",
      errors: errors
    })
  }

  request
    .get(booksURL)
    .then(books => {

      let library = JSON.parse(books)
      console.log(library.items.length)
      let results = library.items.splice(0, library.items.length / 2)

      // res.send(results)
      res.render("searchResults", {
        books: results,
        user: req.user
      })
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
