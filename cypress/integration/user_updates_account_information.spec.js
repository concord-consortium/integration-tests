import * as c from '../support/constants.js'
import changePasswordPageElements from '../support/elements/change_password_page_elements.js'
import flashNoticePageElements from '../support/elements/flash_notice_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import userSettingsPageElements from '../support/elements/user_settings_page_elements.js'

// Note for db tracking : No db tracking required, using existing records

const TEACHER1_NEW_FULLNAME = c.TEACHER1_FIRSTNAME + 'a' + " " + c.TEACHER1_LASTNAME + 'a';
const STUDENT1_NEW_FULLNAME = c.STUDENT1_FIRSTNAME + 'a' + " " + c.STUDENT1_LASTNAME + 'a';

context("Verify user updates to account information", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher user is able to update first name , last name, email", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link in left nav
    cy.contains(userSettingsPageElements.FORM_LEGEND, c.TEACHER1_FULLNAME); // The form legend should contain teacher name
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('a'); // Append 'a' to the first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('a'); // Append 'a' to the last name
    cy.get(userSettingsPageElements.EMAIL_FIELD).should("be.visible"); // Email field should be visible
    cy.get(userSettingsPageElements.USERNAME_FIELD).should("not.exist"); // Username field should not exist and hence not editable
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link
    cy.contains(userSettingsPageElements.FORM_LEGEND, TEACHER1_NEW_FULLNAME); // Form legend should have teacher's new name with 'a' appended to first and last names
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('{selectall}{backspace}' + c.TEACHER1_FIRSTNAME); // Revert to teacher's original first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('{selectall}{backspace}' + c.TEACHER1_LASTNAME); // Revert to teacher's original last name
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
  });

  it("Verify teacher user is able to update password", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link in left nav
    cy.get(userSettingsPageElements.CHANGE_PASSWORD_BUTTON).click(); // Click Change password button
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(c.TEACHER1_PASSWORD); // Enter a new password in the new password field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(c.TEACHER1_PASSWORD); // Confirm the new password
    cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save button'
    cy.contains(flashNoticePageElements.BANNER, 'Password for '+ c.TEACHER1_USERNAME + ' was successfully updated.'); // Check banner that password was successfully updated
    cy.get(userSettingsPageElements.CANCEL_BUTTON).click(); // Click 'Cancel' button to close the form
  });

  it("Logout as teacher and login as student", () => {
    cy.logout(); // Logout as teacher
    cy.login(c.STUDENT1_USERNAME, c.STUDENT1_PASSWORD); // Login as student
  });

  it("Verify student user is able to update first name , last name", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings in left nav
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('a'); // Append 'a' to the first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('a'); // Append 'a' to the last name
    cy.get(userSettingsPageElements.USERNAME_FIELD).should("not.exist"); // Username field should not exist and hence not editable
    cy.get(userSettingsPageElements.EMAIL_FIELD).should("not.exist"); // Email field should be visible abd hence not editable
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button

    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link
    cy.contains(userSettingsPageElements.FORM_LEGEND,STUDENT1_NEW_FULLNAME); // Form legend should have student's new name with 'a' appended to first and last names
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('{selectall}{backspace}' + c.STUDENT1_FIRSTNAME); // Revert to teacher's original first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('{selectall}{backspace}' + c.STUDENT1_LASTNAME); // Revert to teacher's original last name
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
  });

  it("Verify student user is able to update password", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings in left nav
    cy.get(userSettingsPageElements.CHANGE_PASSWORD_BUTTON).click(); // Click Change password button
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(c.STUDENT1_PASSWORD); // Enter a new password in the new password field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(c.STUDENT1_PASSWORD); // Confirm the new password
    cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save button'
    cy.contains(flashNoticePageElements.BANNER, 'Password for '+ c.STUDENT1_USERNAME + ' was successfully updated.'); // Check banner that password was successfully updated
    cy.get(userSettingsPageElements.CANCEL_BUTTON).click(); // Click 'Cancel' button to close the form
  });
});
