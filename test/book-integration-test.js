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
