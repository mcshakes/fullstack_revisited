const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const expect = chai.expect;

const {Book} = require("../models/book");
const {app, runServer, closeServer} = require("../server");
const {TEST_DATABASE_URL} = require("../config");

chai.use(chaiHttp);

function teardownDB() {
  console.warn("Deleting the Database");
  return mongoose.connection.dropDatabase();
}

describe("User Registering", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  })

  afterEach(function() {
    return teardownDB();
  })

  after(function() {
    return closeServer();
  })

  describe("POST /register", function() {
    it("should register a new user", function() {
      return chai.request(app)
        const theDOM = new JSDOM(res.text);
        let title = theDOM.window.document.querySelector("h1").textContent
        let inputs = theDOM.window.document.querySelector("input").textContent

        .post("/register")
        .send({
          email: "dude@example.com",
          password: "passwordTWO"
        })
        .then((res) => {
          // console.log(res)
          expect(res).to.have.status(201);
          // expect(res.redirects[0]).to.contain("/users")
        })
    })
  })
})
