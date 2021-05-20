import constants from '../support/constants.js'

context("Verify user login/logout", () => {

  before(function() {
    cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  });

  it("Verify admin user is able to login and logout with correct username and password", () => {
    cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user
    cy.logout(); // Logout as admin user
  });

  it("Verify author user is able to login and logout with correct username and password", () => {
    cy.login(constants.AUTHOR_USERNAME, constants.AUTHOR_PASSWORD); // Login as author user
    cy.logout(); // Logout as author user
  });

  it("Verify researcher user is able to login and logout with correct username and password", () => {
    cy.login(constants.RESEARCHER_USERNAME, constants.RESEARCHER_PASSWORD); // Login as researcher user
    cy.logout(); // Logout as researcher user
  });

  it("Verify teacher user is able to login and logout with correct username and password", () => {
    cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher user
    cy.logout(); // Logout as teacher user
  });

  it("Verify student user is able to login and logout with correct username and password", () => {
    cy.login(constants.STUDENT_USERNAME, constants.STUDENT_PASSWORD); // Login as student user
    cy.logout(); // Logout as student user
  });

  it("Verify manager user is able to login and logout with correct username and password", () => {
    cy.login(constants.MANAGER_USERNAME, constants.MANAGER_PASSWORD); // Login as manager user
    cy.logout(); // Logout as manager user
  });

  it("Verify a user is unable to login with incorrect username", () => {
    cy.login("foo", constants.TEACHER_PASSWORD); // Login using incorrect username 'foo'
    cy.alert("Error: Login failed."); // Confirm browser alert about login failure
    cy.retryLogin(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login using teacher user
    cy.logout(); // Logout as teacher user
  });

  it("Verify a user is unable to login with incorrect password", () => {
    cy.login(constants.TEACHER_USERNAME, "foo"); // Login using incorrect password 'foo'
    cy.alert("Error: Login failed."); // Confirm browser alert about login failure
    cy.retryLogin(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login using teacher user
    cy.logout(); // Logout as teacher user
  });

});
