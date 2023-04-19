import * as c from '../../support/constants.js'
import changePasswordPageElements from '../../support/elements/change_password_page_elements.js'
import flashNoticePageElements from '../../support/elements/flash_notice_page_elements.js'
import userHomePageElements from '../../support/elements/user_home_page_elements.js'
import userSettingsPageElements from '../../support/elements/user_settings_page_elements.js'
import * as adminHelper from '../../support/helpers/adminHelper'
import * as teacherHelper from '../../support/helpers/teacherHelper'
import * as studentHelper from '../../support/helpers/studentHelper.js'

// Note for db tracking : No db tracking required, using existing records

const TEACHER4_NEW_FULLNAME = c.TEACHER4_FIRSTNAME + 'a' + " " + c.TEACHER4_LASTNAME + 'a';
let STUDENT8_USERNAME = undefined;
const STUDENT8_NEW_FULLNAME = c.STUDENT8_FIRSTNAME + 'a' + " " + c.STUDENT8_LASTNAME + 'a';
const CLASS_WORD = c.CLASS_WORD;
const CLASS_NAME = 'Class ' + CLASS_WORD;

context("Verify user updates to account information", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER4_USERNAME, c.TEACHER4_PASSWORD); // Login as teacher user
    teacherHelper.addClass(CLASS_NAME, c.CLASS_DESC, CLASS_WORD); // Teacher adds a class
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher user is able to update first name , last name, email", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link in left nav
    cy.get(userSettingsPageElements.FORM_LEGEND).contains(c.TEACHER4_FULLNAME); // The form legend should contain teacher name
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('a'); // Append 'a' to the first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('a'); // Append 'a' to the last name
    cy.get(userSettingsPageElements.EMAIL_FIELD).should("be.visible"); // Email field should be visible
    cy.get(userSettingsPageElements.USERNAME_FIELD).should("not.exist"); // Username field should not exist and hence not editable
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
    cy.url().should('include', '/recent_activity');
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link
    cy.get(userSettingsPageElements.FORM_LEGEND).contains(TEACHER4_NEW_FULLNAME); // Form legend should have teacher's new name with 'a' appended to first and last names
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).click().clear().type(c.TEACHER4_FIRSTNAME); // Revert to teacher's original first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).click().clear().type(c.TEACHER4_LASTNAME); // Revert to teacher's original last name
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
    cy.url().should('include', '/recent_activity');
  });

  it("Verify teacher user is able to update password", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link in left nav
    cy.get(userSettingsPageElements.CHANGE_PASSWORD_BUTTON).click(); // Click Change password button
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(c.TEACHER4_PASSWORD); // Enter a new password in the new password field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(c.TEACHER4_PASSWORD); // Confirm the new password
    cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save button'
    cy.url().should('include', '/preferences');
    cy.get(flashNoticePageElements.BANNER).contains('Password for '+ c.TEACHER4_USERNAME + ' was successfully updated.'); // Check banner that password was successfully updated
    cy.get(userSettingsPageElements.CANCEL_BUTTON).click(); // Click 'Cancel' button to close the form
    cy.url().should('include', '/recent_activity');
  });

  it("Logout as teacher and login as student", () => {
    cy.logout(); // Logout as teacher
    cy.login(c.STUDENT8_USERNAME, c.STUDENT8_PASSWORD); // Login as student
  });

  it("Verify student joins the class", () => {
    studentHelper.joinClass(CLASS_WORD, c.TEACHER4_FULLNAME);
  });

  it("Verify student user is able to update first name , last name", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings in left nav
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('a'); // Append 'a' to the first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('a'); // Append 'a' to the last name
    cy.get(userSettingsPageElements.USERNAME_FIELD).should("not.exist"); // Username field should not exist and hence not editable
    cy.get(userSettingsPageElements.EMAIL_FIELD).should("not.exist"); // Email field should be visible abd hence not editable
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
    cy.url().should('include', '/my_classes');

    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link
    cy.get(userSettingsPageElements.FORM_LEGEND).contains(STUDENT8_NEW_FULLNAME); // Form legend should have student's new name with 'a' appended to first and last names
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).click().clear().type(c.STUDENT8_FIRSTNAME); // Revert to teacher's original first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).click().clear().type(c.STUDENT8_LASTNAME); // Revert to teacher's original last name
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
    cy.url().should('include', '/my_classes');
  });

  it("Verify student user is able to update password", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings in left nav
    cy.get(userSettingsPageElements.CHANGE_PASSWORD_BUTTON).click(); // Click Change password button
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(c.STUDENT8_PASSWORD); // Enter a new password in the new password field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(c.STUDENT8_PASSWORD); // Confirm the new password
    cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save button'
    cy.url().should('include', '/preferences');
    cy.get(flashNoticePageElements.BANNER).contains('Password for '+ c.STUDENT8_USERNAME + ' was successfully updated.'); // Check banner that password was successfully updated
    cy.get(userSettingsPageElements.CANCEL_BUTTON).click(); // Click 'Cancel' button to close the form
    cy.url().should('include', '/my_classes');
    cy.logout();
  });

  it("Verify teacher cleans up the class", () => {
    cy.login(c.TEACHER4_USERNAME, c.TEACHER4_PASSWORD); // Login as teacher
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.removeStudentFromRoster(c.STUDENT8_NAME, CLASS_NAME);
    teacherHelper.verifyClassCount(0);
  });
});
