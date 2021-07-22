import * as c from '../../support/constants.js'

// Note for db tracking : No db tracking required, using existing records

context("Verify user(logged in or not) can see custom project page content", () => {

  it("Verify author user visits custom landing page content", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.login(c.AUTHOR_USERNAME, c.AUTHOR_PASSWORD);
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/foo-bar');
    cy.get('.landing-page-content').should('include.text', 'Hello, it is FooBar page!');
    cy.logout();
  });

  it("Verify anonymous user visits custom landing page content", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/foo-bar');
    cy.get('.landing-page-content').should('include.text', 'Hello, it is FooBar page!');
  });
});
