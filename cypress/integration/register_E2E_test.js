// const {TEST_DATABASE_URL} = require("../../config");
// const {app, runServer, closeServer} = require("../../server");


describe("First time User visits the site", function() {

  before(function() {
    cy.visit("/books")
    cy.contains("Register").click()
    cy.url().should("include", "/register")
  })

  it("fills out the Sign up form", function() {
    cy.get("#email").type("something@fakemail.com")
    cy.should("have.value", "something@fakemail.com")

    cy.get("#password").type("passtest1")
    cy.should("have.value", "passtest1")

    cy.get("#password-confirm").type("passtest1")
    cy.should("have.value", "passtest1")

    // cy.get("button").click
    cy.url().should("include", "/books")
    })
})
