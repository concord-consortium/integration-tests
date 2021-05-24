import * as c from '../support/constants.js';
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import adminPageElements from '../support/elements/admin_page_elements.js'
import noticesPageElements from '../support/elements/notices_page_elements.js'

// Note for db tracking : No db tracking required, using existing records (except for notices, which are added and then deleted at the end)

const NEW_NOTICE_TEXT = c.NOTICE_TEXT + ' test';

context("Verify admin user is able to add a notice and see it in the getting started page", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
  });

  after(function() {
    cy.logout();
  });

  it("Verify admin user is able to add a notice", () => {
    cy.get(userHomePageElements.CONTENT).should("have.text", 'Getting Started'); // User home page should have 'Getting Started' heading
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click 'Notices' link from left nav
    cy.contains(noticesPageElements.NO_NOTICES_TEXT, "You have no notices."); // Check 'You have no notices' text in the Notices page
    cy.get(noticesPageElements.NEW_NOTICE_LINK).click(); // Click 'Create new notice' link
    cy.setTinyMceContent(noticesPageElements.EDITOR, c.NOTICE_TEXT); // Type text into the Notices editor
    cy.get(noticesPageElements.NOTICE_SUBMIT).click(); // Click 'Submit' button
    cy.contains(noticesPageElements.TABLE_ENTRY, c.NOTICE_TEXT); // Check that the Notices table has the new notice entry
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' at the top header
    cy.contains(userHomePageElements.NOTICES_TABLE_ENTRY, c.NOTICE_TEXT); // Check notice text is present in the user home page
  });

  it("Verify admin user is able to edit a notice", () => {
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click 'Notices' link from left nav
    cy.contains(noticesPageElements.TABLE_ENTRY, c.NOTICE_TEXT); // Check notices table has the notice entry
    cy.get(noticesPageElements.EXISTING_NOTICE_EDIT).click(); // Click 'Edit' button to edit the notice
    cy.setTinyMceContent(noticesPageElements.EDITOR, NEW_NOTICE_TEXT); // Type text into the Notices editor to edit the notice
    cy.get(noticesPageElements.NOTICE_SUBMIT).click(); // Click 'Submit' button
    cy.contains(noticesPageElements.TABLE_ENTRY, NEW_NOTICE_TEXT); // Check that the Notices table has the updated notice entry
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' at the top header
    cy.contains(userHomePageElements.NOTICES_TABLE_ENTRY, NEW_NOTICE_TEXT); // Check updated notice text is present in the user home page
  });

  it("Verify admin user is able to remove a notice", () => {
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click 'Notices' link from left nav
    cy.contains(noticesPageElements.TABLE_ENTRY, NEW_NOTICE_TEXT); // Check notices table has the updated notice entry
    cy.get(noticesPageElements.EXISTING_NOTICE_DELETE).click(); // Click 'Delete' button to delete the notice
    cy.confirm('Are you sure you want to delete this notice?'); // Confirm deleting the notice
    cy.contains(noticesPageElements.NO_NOTICES_TEXT, "You have no notices."); // Check 'You have no notices' text in the Notices page
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' at the top header
    cy.get(userHomePageElements.NOTICES_TABLE).should("not.exist"); // Check notices table does not exist in the user home page
  });

  it("Verify admin user can not add a blank notice", () => {
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click 'Notices' link from left nav
    cy.get(noticesPageElements.NEW_NOTICE_LINK).click(); // Click 'Create new notice' link
    cy.get(noticesPageElements.NOTICE_SUBMIT).click(); // Click 'Submit' button
    cy.contains(noticesPageElements.BLANK_NOTICE_ERROR, "Notice text is blank"); // Check error message 'Notice text is blank'
    cy.get(noticesPageElements.BLANK_NOTICE_ERROR_OK_BUTTON).click(); // Confirm the error dialog
  });

  it("Verify admin user can cancel adding a notice", () => {
      cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
      cy.get(adminPageElements.NOTICES_LINK).click(); // Click 'Notices' link from left nav
      cy.get(noticesPageElements.NEW_NOTICE_LINK).click(); // Click 'Create new notice' link
      cy.setTinyMceContent(noticesPageElements.EDITOR, c.NOTICE_TEXT); // Type text into the Notices editor
      cy.get(noticesPageElements.NOTICE_CANCEL).click(); // Click 'Cancel' button
      cy.contains(noticesPageElements.NO_NOTICES_TEXT, "You have no notices."); // Check 'You have no notices' text in the Notices page
  });
});
