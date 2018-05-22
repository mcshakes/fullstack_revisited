const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");

const expect = chai.expect;

const {Book} = require("../models/book");
const {app, runServer, closeServer} = require("../server");
const {TEST_DATABASE_URL} = require("../config");

chai.use(chaiHttp);

function seedBooks() {
  console.log("Seeding Book Data");
  const seeds = [];

  for (let i = 0; i < 11; i++) {
    seeds.push(generateFakeBook());
  }
  return Book.insertMany(seeds);
}

function generateFakeBook() {
  return {
    title: faker.lorem.words(),
    author: `${faker.name.firstName()} ${faker.name.lastName()}`
  }
}

function teardownDB() {
  console.warn("Deleting the Database");
  return mongoose.connection.dropDatabase();
}

describe("Books API Resource", function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  })

  beforeEach(function() {
    return seedBooks();
  })

  afterEach(function() {
    return teardownDB();
  })

  after(function() {
    return closeServer();
  })

  describe("POST endpoint", function() {

    it("should add a new book", function() {
      const newBook = {
        title: faker.lorem.words(),
        author: `${faker.name.firstName()} ${faker.name.lastName()}`
      }

      return chai.request(app)
        .post("/books")
        .send(newBook)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.keys(
            "id", "title", "author"
          );
          expect(res.body.author).to.equal(
            `${newBook.author}`
          );
          expect(res.body.id).to.not.be.null;
          return Book.findById(res.body.id);
        })
        .then(function(book){
          expect(book.title).to.equal(newBook.title);
          // can add more
        })
    })
  }); // End of POST endpoint

  describe("GET endpoint", function() {

    it("should return all existing books for user", function() {
      let res;

      return chai.request(app)
      .get("/books")
      .then(function(_res) {
        res = _res;
        expect(res).to.have.status(200);
        expect(res.body.books).to.have.length.of.above(1);
        return Book.count();
      })
      .then(function(count) {
        expect(res.body.books).to.have.lengthOf(count);
      })
    })

    it("should return books with correct fields", function() {
      let bookResult;

      return chai.request(app)
        .get('/books')
        .then(function(res) {
          expect(res).to.have.status(200)
          expect(res).to.be.json;
          expect(res.body.books).to.be.a("array");
          expect(res.body.books).to.have.length.of.at.least(1);

          res.body.books.forEach(function(book) {
            expect(book).to.be.a("object");
            expect(book).to.include.keys(
              "author", "title"
            )
          });

          bookResult = res.body.books[0];
          return Book.findById(bookResult.id);
        })
        .then( (book) => {

          expect(bookResult.id).to.equal(book.id);
          expect(bookResult.author).to.equal(book.author);
          expect(bookResult.title).to.equal(book.title);
        })
    })

  }) // End of GET

describe("DELETE Endpoint", function() {

  it("deletes a book by the ID", function() {
    let book;

    return Book
      .findOne()
      .then(function(_book) {
        book = _book;
        return chai.request(app).delete(`/books/${book.id}`)
      })
      .then(function(res) {
        expect(res).to.have.status(204);
        return Book.findById(book.id);
      })
      .then(function(_book) {
        expect(_book).to.be.null;
      })
  })
}) //End of DELETE

describe("PUT endpoint", function() {

    it("should update fields on an existing book", function() {

      const updateData = {
        title: "Forget the last book!",
        author: "Ping O'Shaq-Hennessy"
      }

      return Book
        .findOne()
        .then(function(book) {
          updateData.id = book.id;

          return chai.request(app)
            .put(`/books/${book.id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);

          return Book.findById(updateData.id);
        })
        .then(function(book) {
          expect(book.title).to.equal(updateData.title);
          expect(book.author).to.equal(`${updateData.author}`)
        })
    })
}) //End of PUT block
})
