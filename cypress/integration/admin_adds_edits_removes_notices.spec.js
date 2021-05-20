import constants from '../support/constants.js';
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import adminPageElements from '../support/elements/admin_page_elements.js'
import noticesPageElements from '../support/elements/notices_page_elements.js'

const NEW_NOTICE_TEXT = constants.NOTICE_TEXT + ' test';

context("Verify admin user is able to add a notice and see it in the getting started page", () => {

  before(function() {
    cy.log("Open URL : " + constants.LEARN_PORTAL_BASE_URL);
    cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page

    cy.log("Login using user : " + constants.ADMIN_USERNAME);
    cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user
  });

  after(function() {
    cy.log("Logout");
    cy.logout();
  });

  it("Verify admin user is able to add a notice", () => {
    cy.log("Check element : " + userHomePageElements.CONTENT.description + " should have text : " + "Getting Started");
    cy.get(userHomePageElements.CONTENT.selector).should("have.text", 'Getting Started');

    cy.log("Click element : " + userHomePageElements.LEFT_NAV_ADMIN_LINK.description);
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK.selector).click();

    cy.log("Click element : " + adminPageElements.NOTICES_LINK.description);
    cy.get(adminPageElements.NOTICES_LINK.selector).click();

    cy.log("Check element : " + noticesPageElements.NO_NOTICES_TEXT.description + " contains text : " + "You have no notices.");
    cy.contains(noticesPageElements.NO_NOTICES_TEXT.selector, "You have no notices.");

    cy.log("Click element : " + noticesPageElements.NEW_NOTICE_LINK.description);
    cy.get(noticesPageElements.NEW_NOTICE_LINK.selector).click();

    cy.log("Type into element : " + noticesPageElements.EDITOR.description + " the text : " + constants.NOTICE_TEXT);
    cy.setTinyMceContent(noticesPageElements.EDITOR.selector, constants.NOTICE_TEXT);

    cy.log("Click element : " + noticesPageElements.NOTICE_SUBMIT.description);
    cy.get(noticesPageElements.NOTICE_SUBMIT.selector).click();

    cy.log("Check element : " + noticesPageElements.TABLE_ENTRY.description + " contains text : " + constants.NOTICE_TEXT);
    cy.contains(noticesPageElements.TABLE_ENTRY.selector, constants.NOTICE_TEXT);

    cy.log("Click element : " + userHomePageElements.HEADER_MYCLASSES.description);
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click();

    cy.log("Check element : " + userHomePageElements.NOTICES_TABLE_ENTRY.description + " contains text : " + constants.NOTICE_TEXT);
    cy.contains(userHomePageElements.NOTICES_TABLE_ENTRY.selector, constants.NOTICE_TEXT);
  });

  it("Verify admin user is able to edit a notice", () => {
    cy.log("Click element : " + userHomePageElements.LEFT_NAV_ADMIN_LINK.description);
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK.selector).click();

    cy.log("Click element : " + adminPageElements.NOTICES_LINK.description);
    cy.get(adminPageElements.NOTICES_LINK.selector).click();

    cy.log("Check element : " + noticesPageElements.TABLE_ENTRY.description + " contains text : " + constants.NOTICE_TEXT);
    cy.contains(noticesPageElements.TABLE_ENTRY.selector, constants.NOTICE_TEXT);

    cy.log("Click element : " + noticesPageElements.EXISTING_NOTICE_EDIT.description);
    cy.get(noticesPageElements.EXISTING_NOTICE_EDIT.selector).click();

    cy.log("Type into element : " + noticesPageElements.EDITOR.description + " the text : " + NEW_NOTICE_TEXT);
    cy.setTinyMceContent(noticesPageElements.EDITOR.selector, NEW_NOTICE_TEXT);

    cy.log("Click element : " + noticesPageElements.NOTICE_SUBMIT.description);
    cy.get(noticesPageElements.NOTICE_SUBMIT.selector).click();

    cy.log("Check element : " + noticesPageElements.TABLE_ENTRY.description + " contains text : " + NEW_NOTICE_TEXT);
    cy.contains(noticesPageElements.TABLE_ENTRY.selector, NEW_NOTICE_TEXT);

    cy.log("Click element : " + userHomePageElements.HEADER_MYCLASSES.description);
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click();

    cy.log("Check element : " + userHomePageElements.NOTICES_TABLE_ENTRY.description + " contains text : " + NEW_NOTICE_TEXT);
    cy.contains(userHomePageElements.NOTICES_TABLE_ENTRY.selector, NEW_NOTICE_TEXT);
  });

  it("Verify admin user is able to remove a notice", () => {
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK.selector).click();
    cy.get(adminPageElements.NOTICES_LINK.selector).click();
    cy.contains(noticesPageElements.TABLE_ENTRY.selector, NEW_NOTICE_TEXT);
    cy.get(noticesPageElements.EXISTING_NOTICE_DELETE.selector).click();
    cy.confirm('Are you sure you want to delete this notice?');
    cy.contains(noticesPageElements.NO_NOTICES_TEXT.selector, "You have no notices.");
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click();
    cy.get(userHomePageElements.NOTICES_TABLE.selector).should("not.exist");
  });

  it("Verify admin user can not add a blank notice", () => {
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK.selector).click();
    cy.get(adminPageElements.NOTICES_LINK.selector).click();
    cy.get(noticesPageElements.NEW_NOTICE_LINK.selector).click();
    cy.get(noticesPageElements.NOTICE_SUBMIT.selector).click();
    cy.contains(noticesPageElements.BLANK_NOTICE_ERROR.selector, "Notice text is blank");
    cy.get(noticesPageElements.BLANK_NOTICE_ERROR_OK_BUTTON.selector).click();
  });

  it("Verify admin user can cancel adding a notice", () => {
      cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK.selector).click();
      cy.get(adminPageElements.NOTICES_LINK.selector).click();
      cy.get(noticesPageElements.NEW_NOTICE_LINK.selector).click();
      cy.setTinyMceContent(noticesPageElements.EDITOR.selector, constants.NOTICE_TEXT);
      cy.get(noticesPageElements.NOTICE_CANCEL.selector).click();
      cy.contains(noticesPageElements.NO_NOTICES_TEXT.selector, "You have no notices.");
  });
});
