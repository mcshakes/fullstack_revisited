
describe("Visitor comes to site to do some edits", function() {

  before(function() {
    cy.exec("npm run seed")
  })

  it("shows user all the books in reading list", function() {
    cy.visit("/books")

    expect(".books").to.have.length.above(4)
    expect(".books").to.contain(".book")
  })

  it("allow user to click book and see edit button", function() {
    cy.contains("The Stand").and("be.visible").click()
  })
  //
  it("should render proper URL", function() {
    cy.url().should("include", "books/")

    cy.contains("Edit Book").and("be.visible").click()
  })
  //
  it("should render the edit form with placeholder text", function() {

    cy.get("form").should("be.visible")
    cy.get(".edit-header").contains("Edit The Stand?")
    // expect(".edit-header").to.contain("Edit The Stand?")

    cy
      .get("input[name='title']")
      .should("have.value", "")

    cy
      .get("input[name='author']")
      .should("have.value", "")

    cy
      .get("textarea[name='summary']")
      .should("have.value", "")
  })

  it("should edit the book to make a new book", function() {
    cy
      .get("input[name='title']")
      .type("Fake STAND")
      .should("have.value", "Fake STAND")

    cy
      .get("input[name='author']")
      .type("Fake Stephen King")
      .should("have.value", "Fake Stephen King")

    cy
      .get("textarea[name='summary']")
      .type("a bunch of words")
      .should("have.value", "a bunch of words")

    cy.get("form").submit();

    cy.contains("Fake STAND").and("be.visible")
  })

})
