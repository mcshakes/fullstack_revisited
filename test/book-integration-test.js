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
    author: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }
  }
}

function teardownDB() {
  console.warn("Deleting the Database");
  return mongoose.connection.dropDatabase();
}

describe("Books API Resource", function() {

  describe("POST endpoint", function() {

    it("should add a new book", function() {
      const newBook = {
        title: faker.lorem.words(),
        author: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName()
        }
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
          expect(res.body.author).to.equal(newBook.author)
          expect(res.body.id).to.not.be.null;
          return Book.findById(res.body.id);
        })
        .then(function(book){
          expect(book.title).to.equal(newBook.title);
          // can add more
        })
    })
  }); // End of POST endpoint
})
