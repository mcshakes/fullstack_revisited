
describe("Unauthenticated user visits the site", function() {

  before(function() {
    cy.exec("npm run seed")
  })

  it("gives user clear add to book", function() {
    cy.visit("/books")
    cy.contains("Add a Book").and("be.visible").click()
  })

  it("should have correct url", function() {
    cy.url().should("include", "/add-new-book")
  })

  it("should render complete form", function() {
    cy.get("form").should("be.visible")
  })

  it("should create the fake book to read", function() {
    cy
      .get("input[name='title']")
      .type("Fake Book")
      .should("have.value", "Fake Book")

    cy
      .get("input[name='author']")
      .type("Fake Dude")
      .should("have.value", "Fake Dude")

    cy
      .get("textarea[name='summary']")
      .type("a bunch of words")
      .should("have.value", "a bunch of words")

    cy.get("form").submit();

    cy.contains("Fake Book").and("be.visible")
  })

  it("should send user back to collection", function() {
    cy.location("pathname").should("eq", "/books")
  })
})
