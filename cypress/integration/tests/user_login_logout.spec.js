import * as c from '../../support/constants.js'

// Note for db tracking : No db tracking required, using existing records

context("Verify user login/logout", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  });

  it("Verify admin user is able to login and logout with correct username and password", () => {
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
    cy.logout(); // Logout as admin user
  });

  it("Verify author user is able to login and logout with correct username and password", () => {
    cy.login(c.AUTHOR_USERNAME, c.AUTHOR_PASSWORD); // Login as author user
    cy.logout(); // Logout as author user
  });

  it("Verify researcher user is able to login and logout with correct username and password", () => {
    cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD); // Login as researcher user
    cy.logout(); // Logout as researcher user
  });

  it("Verify teacher user is able to login and logout with correct username and password", () => {
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher user
    cy.logout(); // Logout as teacher user
  });

  it("Verify student user is able to login and logout with correct username and password", () => {
    cy.login(c.STUDENT1_USERNAME, c.STUDENT1_PASSWORD); // Login as student user
    cy.logout(); // Logout as student user
  });

  it("Verify manager user is able to login and logout with correct username and password", () => {
    cy.login(c.MANAGER_USERNAME, c.MANAGER_PASSWORD); // Login as manager user
    cy.logout(); // Logout as manager user
  });

  it("Verify a user is unable to login with incorrect username", () => {
    cy.loginNoFlashNotice("foo", c.TEACHER1_PASSWORD); // Login using incorrect username 'foo'
    cy.alert("Error: Login failed."); // Confirm browser alert about login failure
    cy.retryLogin(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login using teacher user
    cy.logout(); // Logout as teacher user
  });

  it("Verify a user is unable to login with incorrect password", () => {
    cy.loginNoFlashNotice(c.TEACHER1_USERNAME, "foo"); // Login using incorrect password 'foo'
    cy.alert("Error: Login failed."); // Confirm browser alert about login failure
    cy.retryLogin(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login using teacher user
    cy.logout(); // Logout as teacher user
  });

});
