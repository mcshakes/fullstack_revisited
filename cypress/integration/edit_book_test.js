
describe("Visitor comes to site to do some edits", function() {

  before(function() {
    cy.exec("npm run seed")
  })

  it("shows user all the books in reading list", function() {
    cy.visit("/books")

    expect(".books").to.have.length.above(4)
    expect(".books").to.contain(".book")
  })

  // it("allow user to click the edit button", function() {
  //   cy.get(".book")
  //     .contains("Pride and Prejudice")
  //     // .get("#edit-book")
  //     .click()
  // })
  //
  // it("should render proper URL", function() {
  //   cy.url().should("include", "edit-book/5b4eb1b22964d2276520e9f1")
  // })
  //
  // it("should render the edit form with placeholder text", function() {
  //   cy.get("form").should("be.visible")
  //   expect(".edit-header").to.contain("h2", "Edit Pride and Prejudice?")
  //
  //   cy
  //     .get("input[name='title']")
  //     .should("have.value", "Pride and Prejudice")
  //
  //   cy
  //     .get("input[name='author']")
  //     .should("have.value", "Jane Austen")
  //
  //   cy
  //     .get("textarea[name='summary']")
  //     .should("have.value", "Elizabeth Bennet doesn't want to get married, then meats Darcy. Suddenly wants to get married?")
  //
  //   cy.get("button", "button-primary").should("be.visible")
  // })

})
