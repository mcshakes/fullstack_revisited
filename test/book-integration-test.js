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
        author: `${faker.name.firstName()} ${faker.name.lastName()}`,
        summary: faker.lorem.words()
      }

      return chai.request(app)
        .post("/books")
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.body).to.be.a("object");

        })

    })
  }); // End of POST endpoint

  describe("GET endpoint", function() {

    it("should return books with correct fields", function() {
      let bookResult;

      return chai.request(app)
        .get('/books')
        .then(function(res) {
          expect(res).to.have.status(200)
          expect(res).to.be.html;
          expect(res.text).to.have.length.of.at.least(1);
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
          // console.log(res)
          // expect(res).to.have.status(204);
          //
          // return Book.findById(updateData.id);
        })
    })
}) //End of PUT block
})
