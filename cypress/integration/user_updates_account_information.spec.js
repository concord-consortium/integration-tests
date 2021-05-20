import constants from '../support/constants.js'
import userSettingsPageElements from '../support/elements/user_settings_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import changePasswordPageElements from '../support/elements/change_password_page_elements.js'
import flashNoticePageElements from '../support/elements/flash_notice_page_elements.js'

const TEACHER_NAME = constants.TEACHER_FIRSTNAME + " " + constants.TEACHER_LASTNAME;
const TEACHER_NEW_NAME = constants.TEACHER_FIRSTNAME + 'a' + " " + constants.TEACHER_LASTNAME + 'a';
const STUDENT_NAME = constants.STUDENT_FIRSTNAME + " " + constants.STUDENT_LASTNAME;
const STUDENT_NEW_NAME = constants.STUDENT_FIRSTNAME + 'a' + " " + constants.STUDENT_LASTNAME + 'a';

context("Verify user updates to account information", () => {

  before(function() {
    cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher user is able to update first name , last name, email", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK.selector).click(); // Click Settings link in left nav
    cy.contains(userSettingsPageElements.FORM_LEGEND.selector, TEACHER_NAME); // The form legend should contain teacher name
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD.selector).type('a'); // Append 'a' to the first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD.selector).type('a'); // Append 'a' to the last name
    cy.get(userSettingsPageElements.EMAIL_FIELD.selector).should("be.visible"); // Email field should be visible
    cy.get(userSettingsPageElements.USERNAME_FIELD.selector).should("not.exist"); // Username field should not exist and hence not editable
    cy.get(userSettingsPageElements.SAVE_BUTTON.selector).click(); // Click 'Save' button
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK.selector).click(); // Click Settings link
    cy.contains(userSettingsPageElements.FORM_LEGEND.selector, TEACHER_NEW_NAME); // Form legend should have teacher's new name with 'a' appended to first and last names
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD.selector).type('{selectall}{backspace}' + constants.TEACHER_FIRSTNAME); // Revert to teacher's original first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD.selector).type('{selectall}{backspace}' + constants.TEACHER_LASTNAME); // Revert to teacher's original last name
    cy.get(userSettingsPageElements.SAVE_BUTTON.selector).click(); // Click 'Save' button

    //Verify teacher name is updated in /preferences and in flash-notice
  });

  it("Verify teacher user is able to update password", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK.selector).click(); // Click Settings link in left nav
    cy.get(userSettingsPageElements.CHANGE_PASSWORD_BUTTON.selector).click(); // Click Change password button
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD.selector).type(constants.TEACHER_PASSWORD); // Enter a new password in the new password field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD.selector).type(constants.TEACHER_PASSWORD); // Confirm the new password
    cy.get(changePasswordPageElements.SAVE_BUTTON.selector).click(); // Click 'Save button'
    cy.contains(flashNoticePageElements.BANNER.selector, 'Password for '+ constants.TEACHER_USERNAME + ' was successfully updated.'); // Check banner that password was successfully updated
    cy.get(userSettingsPageElements.CANCEL_BUTTON.selector).click(); // Click 'Cancel' button to close the form
  });

  it("Logout as teacher and login as student", () => {
    cy.logout(); // Logout as teacher
    cy.login(constants.STUDENT_USERNAME, constants.STUDENT_PASSWORD); // Login as student
  });

  it("Verify student user is able to update first name , last name", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK.selector).click(); // Click Settings in left nav
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD.selector).type('a'); // Append 'a' to the first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD.selector).type('a'); // Append 'a' to the last name
    cy.get(userSettingsPageElements.USERNAME_FIELD.selector).should("not.exist"); // Username field should not exist and hence not editable
    cy.get(userSettingsPageElements.EMAIL_FIELD.selector).should("not.exist"); // Email field should be visible abd hence not editable
    cy.get(userSettingsPageElements.SAVE_BUTTON.selector).click(); // Click 'Save' button

    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK.selector).click(); // Click Settings link
    cy.contains(userSettingsPageElements.FORM_LEGEND.selector,STUDENT_NEW_NAME); // Form legend should have student's new name with 'a' appended to first and last names
    cy.get(userSettingsPageElements.FIRST_NAME_FIELD.selector).type('{selectall}{backspace}' + constants.STUDENT_FIRSTNAME); // Revert to teacher's original first name
    cy.get(userSettingsPageElements.LAST_NAME_FIELD.selector).type('{selectall}{backspace}' + constants.STUDENT_LASTNAME); // Revert to teacher's original last name
    cy.get(userSettingsPageElements.SAVE_BUTTON.selector).click(); // Click 'Save' button
  });

  it("Verify student user is able to update password", () => {
    cy.get(userHomePageElements.LEFT_NAV_SETTINGS_LINK.selector).click(); // Click Settings in left nav
    cy.get(userSettingsPageElements.CHANGE_PASSWORD_BUTTON.selector).click(); // Click Change password button
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD.selector).type(constants.STUDENT_PASSWORD); // Enter a new password in the new password field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD.selector).type(constants.STUDENT_PASSWORD); // Confirm the new password
    cy.get(changePasswordPageElements.SAVE_BUTTON.selector).click(); // Click 'Save button'
    cy.contains(flashNoticePageElements.BANNER.selector, 'Password for '+ constants.STUDENT_USERNAME + ' was successfully updated.'); // Check banner that password was successfully updated
    cy.get(userSettingsPageElements.CANCEL_BUTTON.selector).click(); // Click 'Cancel' button to close the form
  });
});
