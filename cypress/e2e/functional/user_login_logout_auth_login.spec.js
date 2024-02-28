import * as c from '../../support/constants.js'

// Note for db tracking : No db tracking required, using existing records

context("Verify user login/logout with /auth/login", () => {

  beforeEach(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/auth/login'); // Visit LEARN Portal auth/login page
  });

  function clearCookies() {
		cy.clearAllCookies();
	};

  it("Verify admin user is able to login and logout with correct username and password", () => {
    cy.loginPortal(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
    cy.logout(); // Logout as admin user
    clearCookies();
  });

  it("Verify author user is able to login and logout with correct username and password", () => {
    cy.loginPortal(c.AUTHOR_USERNAME, c.AUTHOR_PASSWORD); // Login as author user
    cy.logout(); // Logout as author user
    clearCookies();
  });

  it("Verify researcher user is able to login and logout with correct username and password", () => {
    cy.loginPortal(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD); // Login as researcher user
    cy.logout(); // Logout as researcher user
    clearCookies();
  });

  it("Verify teacher user is able to login and logout with correct username and password", () => {
    cy.loginPortal(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher user
    cy.logout(); // Logout as teacher user
    clearCookies();
  });

  it("Verify manager user is able to login and logout with correct username and password", () => {
    cy.loginPortal(c.MANAGER_USERNAME, c.MANAGER_PASSWORD); // Login as manager user
    cy.logout(); // Logout as manager user
    clearCookies();
  });

  it("Verify a user is unable to login with incorrect username", () => {
    cy.loginPortal("foo", c.TEACHER1_PASSWORD); // Login using incorrect username 'foo'
    cy.url().should('include', '/auth/login');
    cy.get('#login-form .error-message').should('have.text', "Invalid Login or password.");
    cy.loginPortal(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login using teacher user
    cy.logout(); // Logout as teacher user
    clearCookies();
  });

  it("Verify a user is unable to login with incorrect password", () => {
    cy.loginPortal(c.TEACHER1_USERNAME, "foo"); // Login using incorrect password 'foo'
    cy.url().should('include', '/auth/login');
    cy.get('#login-form .error-message').should('have.text', "Invalid Login or password.");
    cy.loginPortal(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login using teacher user
    cy.logout(); // Logout as teacher user
    clearCookies();
  });

});
