describe("Authenticated user visits the site", function() {

  before(function() {
    cy.visit("/books")
    cy.contains("Log In").click()
  })

  it("clicks login and sees the form", function() {
    cy.url().should("include", "/login")
  })

  xit("displays errors on login", function() {
    cy.get('input[name=username]').type('jane.lae')
          cy.get('input[name=password]').type('password123{enter}')

          // we should have visible errors now
          cy.get('p.error')
            .should('be.visible')
            .and('contain', 'Username and/or password is incorrect')

          // and still be on the same URL
    cy.url().should('include', '/login')
  })

  it("redirects to book library on success", function() {
    // cy.get('#username-email')
    cy.get('input[type=email]')
      .type('crap2@example.com')
      .should("have.value", "crap2@example.com")

    cy.get('input[type=password]')
      .type('password1{enter}')
    // we should be redirected to /dashboard
    cy.url().should('include', '/users')
    // cy.get('h1').should('contain', 'jane.lane')

    cy.getCookie('connect.sid').should('exist')
  })

  it("can request other authenticated pages", function() {
    // cy.visit("/search")
    cy.contains("Add a New Book").click()
      .its("form")
      .should("include", 'input[name=title]')
  })


})
