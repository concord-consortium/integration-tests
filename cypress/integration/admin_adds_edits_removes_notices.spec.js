import * as c from '../support/constants.js'
import * as noticeHelper from '../support/helpers/noticeHelper'
import noticesPageElements from '../support/elements/notices_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'

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
    noticeHelper.createNotice(c.NOTICE_TEXT);
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' at the top header
    noticeHelper.userViewNotice(c.NOTICE_TEXT); // Check notice text is present in the user home page
  });

  it("Verify admin user is able to edit a notice", () => {
    noticeHelper.editNotice(c.NOTICE_TEXT, NEW_NOTICE_TEXT);
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' at the top header
    noticeHelper.userViewNotice(NEW_NOTICE_TEXT);
  });

  it("Verify admin user is able to remove a notice", () => {
    noticeHelper.deleteNotice(NEW_NOTICE_TEXT);
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' at the top header
    noticeHelper.noticeTableDoesNotExist();
  });

  it("Verify admin user can not add a blank notice", () => {
    noticeHelper.addNotice(" ");
    noticeHelper.submitNotice();
    cy.contains(noticesPageElements.BLANK_NOTICE_ERROR, "Notice text is blank"); // Check error message 'Notice text is blank'
    cy.get(noticesPageElements.BLANK_NOTICE_ERROR_OK_BUTTON).click(); // Confirm the error dialog
  });

  it("Verify admin user can cancel adding a notice", () => {
      noticeHelper.addNotice(c.NOTICE_TEXT);
      noticeHelper.cancelNotice();
  });
});
