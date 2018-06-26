const {TEST_DATABASE_URL} = require("../../config");
const {app, runServer, closeServer} = require("../../server");

function teardownDB() {
  console.warn("Deleting the Database");
  return mongoose.connection.dropDatabase();
}

describe("First time User visits the site", function() {

  before(function() {
    cy.visit("http://localhost:8080/books")
    cy.contains("Register").click()
    cy.url().should("include", "/register")
  })

  afterEach(function() {
    return teardownDB();
  })

  after(function() {
    return closeServer();
  })

  it("fills out the Sign up form", function() {
    cy.get("#email").type("something@fakemail.com")
    cy.should("have.value", "something@fakemail.com")

    cy.get("#password").type("passtest1")
    cy.should("have.value", "passtest1")

    cy.get("#password-confirm").type("passtest1")
    cy.should("have.value", "passtest1")

    // cy.get("button").click
    // })poop
    cy.url().should("include", "/books")
  })
})
