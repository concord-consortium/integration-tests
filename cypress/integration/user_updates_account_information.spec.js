import * as c from '../support/constants.js'
import userSettingsPageElements from '../support/elements/user_settings_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import changePasswordPageElements from '../support/elements/change_password_page_elements.js'
import flashNoticePageElements from '../support/elements/flash_notice_page_elements.js'

// Note for db tracking : No db tracking required, using existing records

const TEACHER_NAME = c.TEACHER_FIRSTNAME + " " + c.TEACHER_LASTNAME;
const TEACHER_NEW_NAME = c.TEACHER_FIRSTNAME + 'a' + " " + c.TEACHER_LASTNAME + 'a';
const STUDENT_NAME = c.STUDENT_FIRSTNAME + " " + c.STUDENT_LASTNAME;
const STUDENT_NEW_NAME = c.STUDENT_FIRSTNAME + 'a' + " " + c.STUDENT_LASTNAME + 'a';

context("Verify user updates to account information", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher user is able to update first name , last name, email", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link in left nav
    cy.contains(userSettingsPageElements.FORM_LEGEND, TEACHER_NAME); // The form legend should contain teacher name
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('a'); // Append 'a' to the first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('a'); // Append 'a' to the last name
    cy.get(userSettingsPageElements.EMAIL_FIELD).should("be.visible"); // Email field should be visible
    cy.get(userSettingsPageElements.USERNAME_FIELD).should("not.exist"); // Username field should not exist and hence not editable
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link
    cy.contains(userSettingsPageElements.FORM_LEGEND, TEACHER_NEW_NAME); // Form legend should have teacher's new name with 'a' appended to first and last names
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('{selectall}{backspace}' + c.TEACHER_FIRSTNAME); // Revert to teacher's original first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('{selectall}{backspace}' + c.TEACHER_LASTNAME); // Revert to teacher's original last name
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button

    //Verify teacher name is updated in /preferences and in flash-notice
  });

  it("Verify teacher user is able to update password", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link in left nav
    cy.get(userSettingsPageElements.CHANGE_PASSWORD_BUTTON).click(); // Click Change password button
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(c.TEACHER_PASSWORD); // Enter a new password in the new password field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(c.TEACHER_PASSWORD); // Confirm the new password
    cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save button'
    cy.contains(flashNoticePageElements.BANNER, 'Password for '+ c.TEACHER_USERNAME + ' was successfully updated.'); // Check banner that password was successfully updated
    cy.get(userSettingsPageElements.CANCEL_BUTTON).click(); // Click 'Cancel' button to close the form
  });

  it("Logout as teacher and login as student", () => {
    cy.logout(); // Logout as teacher
    cy.login(c.STUDENT_USERNAME, c.STUDENT_PASSWORD); // Login as student
  });

  it("Verify student user is able to update first name , last name", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings in left nav
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('a'); // Append 'a' to the first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('a'); // Append 'a' to the last name
    cy.get(userSettingsPageElements.USERNAME_FIELD).should("not.exist"); // Username field should not exist and hence not editable
    cy.get(userSettingsPageElements.EMAIL_FIELD).should("not.exist"); // Email field should be visible abd hence not editable
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button

    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings link
    cy.contains(userSettingsPageElements.FORM_LEGEND,STUDENT_NEW_NAME); // Form legend should have student's new name with 'a' appended to first and last names
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD).type('{selectall}{backspace}' + c.STUDENT_FIRSTNAME); // Revert to teacher's original first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD).type('{selectall}{backspace}' + c.STUDENT_LASTNAME); // Revert to teacher's original last name
    cy.get(userSettingsPageElements.SAVE_BUTTON).click(); // Click 'Save' button
  });

  it("Verify student user is able to update password", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK).click(); // Click Settings in left nav
    cy.get(userSettingsPageElements.CHANGE_PASSWORD_BUTTON).click(); // Click Change password button
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(c.STUDENT_PASSWORD); // Enter a new password in the new password field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(c.STUDENT_PASSWORD); // Confirm the new password
    cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save button'
    cy.contains(flashNoticePageElements.BANNER, 'Password for '+ c.STUDENT_USERNAME + ' was successfully updated.'); // Check banner that password was successfully updated
    cy.get(userSettingsPageElements.CANCEL_BUTTON).click(); // Click 'Cancel' button to close the form
  });
});
