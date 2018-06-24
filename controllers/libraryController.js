const { Book } = require("../models/book")

exports.getLibrary = (req, res) => {
    Book
    .find()
     // .limit()
    .then(books => {
      res.render("listBook", {title: "Book List", book_list: books})
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error"})
      console.log(err);
    })
}

exports.createBookForm = (req,res) => {
  res.render("createBook", { title: "Add A New Book"})
}

exports.createBook = (req,res) => {
  const reqFields = ["title", "author"];

  for (let i = 0; i < reqFields.length; i++) {
    const field = reqFields[i];

    if (!field in req.body) {
      const message = `Missing ${field} in the request body`;
      console.log(message)
      return res.status(400).send(message)
    }
  }
  console.log(req.body.image)

  Book
    .create({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      image: req.body.image
    })
    .then((book) => {
      res.status(201)
    })
    .catch(err => {
      console.log(err);
    })
    res.redirect("/books")
}

exports.getBook = (req, res) => {
  Book
    .findById(req.params.id)
    .then(book => {
      res.render("book", {title: "Book", book: book})
    })
    .catch(err => {
      console.log(err);
    })
}

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({_id: req.params.id})
    res.render("editBook", { title: `Edit ${book.title}`, book: book })
  }
  catch(err) {
    console.log(err)
  }
}


exports.editBook = (req,res) => {

  //NOTE: Below is commented becuse delaing with views means obfuscating the IDs
  // if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  //   const message = (
  //     `Request path id ${req.params.id} and the request body id ${req.body.id} must match`
  //   );
  //   console.error(message);
  //   return res.status(400).json({ message: message });
  // }

  const toUpdate = {};
  const updateableFields = ["title", "author", "summary"];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Book
  .findByIdAndUpdate(req.params.id, { $set: toUpdate })
  .then(book => {
    res.status(204)
    res.redirect("/books")
  })
  .catch(err => {
    console.log(err);
  })
}

exports.deleteBook = (req, res) => {
  Book
  .findByIdAndRemove(req.params.id)
  .then(() => {
    res.status(204).json({message: "Book deleted"})
    // return res.redirect(303, "/books")
  })
  .catch(err => {
    console.log(err);
  })
}
