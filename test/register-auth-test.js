const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");

const expect = chai.expect;

const {Book} = require("../models/book");
const {app, runServer, closeServer} = require("../server");
const {TEST_DATABASE_URL} = require("../config");

chai.use(chaiHttp);

function teardownDB() {
  console.warn("Deleting the Database");
  return mongoose.connection.dropDatabase();
}

describe("User Authentication and Registering", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  })

  afterEach(function() {
    return teardownDB();
  })

  after(function() {
    return closeServer();
  })

  describe("GET /register", function() {

    it("should render the register view", function() {

      return chai.request(app)
        .get("/register")
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          // expect(res.text).to.contain("<h1>Register</h1>")
          // expect(res.text).to.contain(
          //   "<button type='submit'>Register +</button>"
          // )
        })
    })
  })

  describe("POST /register", function() {
    it("should register a new user", function() {
      return chai.request(app)
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
