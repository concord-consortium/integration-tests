import * as c from '../support/constants.js'
import adminPageElements from '../support/elements/admin_page_elements.js'
import adminSettingsUsersPageElements from '../support/elements/admin_settings_users_page_elements.js'
import flashNoticePageElements from '../support/elements/flash_notice_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'

const STUDENT_FULLNAME = c.STUDENT_FIRSTNAME + " " + c.STUDENT_LASTNAME;
const STUDENT_ONE_FULLNAME = c.STUDENT_ONE_FIRSTNAME + " " + c.STUDENT_ONE_LASTNAME;

// Note for db tracking : This test removes 2 students from the db

context("Teardown : Remove student accounts added at the start of tests", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link in left nav
    cy.get(adminPageElements.USERS_LINK).click(); // Click 'Users' link in the Admin Settings page
  });

  after(function() {
    cy.logout();
  });

  it("Admin removes first student account", () => {

    cy.get(adminSettingsUsersPageElements.SEARCH_FIELD).type(c.STUDENT_USERNAME); // Type student 1's username in the search input field
    cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON).click(); // Click 'Search' button
    cy.contains(adminSettingsUsersPageElements.SEARCH_RESULT_FIXED, "User: " + STUDENT_FULLNAME); // The search result should contain 1 entry with student 1's info

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns("DELETE");
      cy.get(adminSettingsUsersPageElements.DELETE_USER).click(); // Click Delete link and confirm by entering DELETE in the browser prompt
    });
    cy.contains(flashNoticePageElements.BANNER, " successfully deleted!"); // Verify banner that shows that user is successfully deleted
  });

  it("Admin removes second student account", () => {

    cy.get(adminSettingsUsersPageElements.SEARCH_FIELD).type('{selectall}{backspace}' + c.STUDENT_ONE_USERNAME); // Type student 2's username in the search input field
    cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON).click(); // Click 'Search' button
    cy.contains(adminSettingsUsersPageElements.SEARCH_RESULT, "User: " + STUDENT_ONE_FULLNAME); // The search result should contain 1 entry with student 2's info

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns("DELETE");
      cy.get(adminSettingsUsersPageElements.DELETE_USER).click(); // Click Delete link and confirm by entering DELETE in the browser prompt
    });
    cy.contains(flashNoticePageElements.BANNER, "User: " + STUDENT_ONE_FULLNAME + " successfully deleted!"); // Verify banner that shows that user is successfully deleted
  });
});
