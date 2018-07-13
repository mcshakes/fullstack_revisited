describe("Authenticated user visits the site", function() {

  context("succesful login", function() {

    before(function() {
      cy.visit("/books")
      cy.contains("Log In").click()
    })

    it("greets user with the login form", function() {
      cy.url().should("include", "/login")
      cy.contains("h1", "Login")
    })

    it("redirects to book library on success", function() {
      cy.get('input[type=email]')
        .type('crap2@example.com')
        .should("have.value", "crap2@example.com")

      cy.get('input[type=password]')
        .type('password1{enter}')

      cy.url().should('include', '/users')

      cy.getCookie('connect.sid').should('exist')
      cy.get("nav ul").children().should("have.length", 2)
    })

    it("has books already existing for that user", function() {
      cy.get(".books").contains("Flower Power!")
    })

    it("can request to search books", function() {
      cy.contains("Add a New Book").click()
      cy.url().should('include', '/search')
      cy.get("form").should("be.visible")
      cy.get("form").should("have.value", "")
    })

    // it("can log out", function() {
    //   cy.get("nav").contains("Log Out").click()
    //   cy.url().should('include', '/book')
    // })

  })

  // xit("displays errors on login", function() {
  //   cy.get('input[name=username]').type('jane.lae')
  //         cy.get('input[name=password]').type('password123{enter}')
  //
  //         // we should have visible errors now
  //         cy.get('p.error')
  //           .should('be.visible')
  //           .and('contain', 'Username and/or password is incorrect')
  //
  //         // and still be on the same URL
  //   cy.url().should('include', '/login')
  // })

  // it greets with sign in
  // it requires email
  // it requires password
  // it requires valid username and password
  // it navigates to #/ on succesful login
})
