// const {TEST_DATABASE_URL} = require("../../config");
// const {app, runServer, closeServer} = require("../../server");


describe("First time User visits site", function() {

  before(function() {
    cy.visit("/books")
    cy.contains("Register").click()
    cy.url().should("include", "/register")
  })

  it("Submits the Sign up form and gets routes", function() {
    cy.get("#email").type("something@fakemail.com")
    cy.should("have.value", "something@fakemail.com")

    cy.get("#password").type("passtest1")
    cy.should("have.value", "passtest1")

    // cy.get("button").click
    cy.get('form').submit()
    cy.url().should("include", "/books")
  })

})
