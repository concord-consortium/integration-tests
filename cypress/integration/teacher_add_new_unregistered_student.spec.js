import constants from '../support/constants.js'
import teacherHomePageElements from '../support/elements/teacher_home_page_elements.js'
import addClassPageElements from '../support/elements/add_class_page_elements.js'
import studentRosterPageElements from '../support/elements/student_roster_page_elements.js'
import flashNoticePageElements from '../support/elements/flash_notice_page_elements.js'
import manageClassesPageElements from '../support/elements/manage_classes_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import changePasswordPageElements from '../support/elements/change_password_page_elements.js'
import studentHomePageElements from '../support/elements/student_home_page_elements.js'
import registerAddStudentPageElements from '../support/elements/register_add_student_page_elements.js'
import adminPageElements from '../support/elements/admin_page_elements.js'
import adminSettingsUsersPageElements from '../support/elements/admin_settings_users_page_elements.js'

const STUDENT_TWO_NAME = constants.STUDENT_TWO_LASTNAME + ", " + constants.STUDENT_TWO_FIRSTNAME;
const STUDENT_TWO_FULLNAME = constants.STUDENT_TWO_FIRSTNAME + " " + constants.STUDENT_TWO_LASTNAME;
const STUDENT_TWO_USERNAME = constants.STUDENT_TWO_USERNAME;
const STUDENT_TWO_PASSWORD = constants.STUDENT_TWO_PASSWORD;
const STUDENT_THREE_NAME = constants.STUDENT_THREE_LASTNAME + ", " + constants.STUDENT_THREE_FIRSTNAME;
const STUDENT_THREE_FULLNAME = constants.STUDENT_THREE_FIRSTNAME + " " + constants.STUDENT_THREE_LASTNAME;
const STUDENT_THREE_USERNAME = constants.STUDENT_THREE_USERNAME;
const STUDENT_THREE_PASSWORD = constants.STUDENT_THREE_PASSWORD;
const STUDENT_NEW_PASSWORD = STUDENT_TWO_PASSWORD + "1";
let className = undefined;

context("Verify teacher can add a new student to a class", () => {

  before(function() {
    cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher is able to unarchive a class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Click 'Classes' Section
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES.selector).click(); // Click 'Manage Classes' Section
    cy.contains(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE.selector, "Unarchive").click(); // Unarchive the last class in the list
    cy.get(manageClassesPageElements.LAST_CLASS_NAME.selector).then(($lastclass) => {
      className = $lastclass.text(); // Get the class name of the unarchived class
    });
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click(); // Click 'My Classes' in the top header
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand 'Classes' in the left nav
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).click(); // Expand unarchived class in the left nav
  });

  it("Verify teacher is able to add new students to the class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector, className).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER.selector).click(); // Click 'Student Roster' for the current class
    });
    cy.get(studentRosterPageElements.CLASS_COUNT.selector).should("have.text", "0"); // Check 'Student Count' is '0'
    cy.get(studentRosterPageElements.REGISTER_ADD_STUDENT_LINK.selector).click(); // Click 'Register & Add Student' link
    cy.get(registerAddStudentPageElements.FIRST_NAME_FIELD.selector).type(constants.STUDENT_TWO_FIRSTNAME); // Type student first name in the Register and add student form
    cy.get(registerAddStudentPageElements.LAST_NAME_FIELD.selector).type(constants.STUDENT_TWO_LASTNAME); // Type student last name in the Register and add student form
    cy.get(registerAddStudentPageElements.PASSWORD_FIELD.selector).type(constants.STUDENT_TWO_PASSWORD); // Type student password in the Register and add student form
    cy.get(registerAddStudentPageElements.CONFIRM_PASSWORD_FIELD.selector).type(constants.STUDENT_TWO_PASSWORD); // Confirm password in the Register and add student form
    cy.get(registerAddStudentPageElements.SUBMIT_BUTTON.selector).click(); // Click 'Submit' button

    cy.contains(registerAddStudentPageElements.DIALOG_TEXT.selector, "Success! The student was registered and added to the class"); // Check success dialog text
    cy.get(registerAddStudentPageElements.DIALOG_ADD_ANOTHER_STUDENT_BUTTON.selector).click(); // Click 'Add Another Student' in success dialog

    cy.get(registerAddStudentPageElements.FIRST_NAME_FIELD.selector).type(constants.STUDENT_THREE_FIRSTNAME); // Type student first name in the Register and add student form
    cy.get(registerAddStudentPageElements.LAST_NAME_FIELD.selector).type(constants.STUDENT_THREE_LASTNAME); // Type student last name in the Register and add student form
    cy.get(registerAddStudentPageElements.PASSWORD_FIELD.selector).type(constants.STUDENT_THREE_PASSWORD); // Type student password in the Register and add student form
    cy.get(registerAddStudentPageElements.CONFIRM_PASSWORD_FIELD.selector).type(constants.STUDENT_THREE_PASSWORD); // Confirm password in the Register and add student form
    cy.get(registerAddStudentPageElements.SUBMIT_BUTTON.selector).click(); // Click 'Submit' button

    cy.contains(registerAddStudentPageElements.DIALOG_TEXT.selector, "Success! The student was registered and added to the class"); // Check success dialog text
    cy.get(registerAddStudentPageElements.DIALOG_CANCEL_BUTTON.selector).click(); // Click 'Add Another Student' in success dialog

    cy.get(studentRosterPageElements.CLASS_COUNT.selector).should("have.text", "2"); // Check class count is '2'
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE.selector).should("be.visible"); // Check Student Roster Table is visible
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_NAME.selector).should("have.text", STUDENT_TWO_NAME); // Check student 1 name entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_USERNAME.selector).should("have.text", STUDENT_TWO_USERNAME); // Check student 1 username entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_TWO_NAME.selector).should("have.text", STUDENT_THREE_NAME); // Check student 2 name entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_TWO_USERNAME.selector).should("have.text", STUDENT_THREE_USERNAME); // Check student 2 username entry in the roster table
  });

  it("Verify teacher is able to change a student's password", () => {
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_CHANGE_PASSWORD.selector).click(); // Click Change Password in the student roster tabel for student 1 entry
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD.selector).type(STUDENT_NEW_PASSWORD); //Type new password in the change password form
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD.selector).type(STUDENT_NEW_PASSWORD); // Confirm new password in the change password form
    cy.get(changePasswordPageElements.SAVE_BUTTON.selector).click(); // Click 'Save' button`
    cy.contains(flashNoticePageElements.BANNER.selector, "Password for " + STUDENT_TWO_USERNAME + " was successfully updated."); // Check banner for password change success message
  });

  it("Verify registered student is able to use the new password", () => {
    cy.logout(); // Logout as teacher user
    cy.login(STUDENT_TWO_USERNAME, STUDENT_NEW_PASSWORD); // Login as student 1 with the new password
    cy.contains(studentHomePageElements.LEFT_NAV_CLASS.selector, className); // Check the current class is present in the student left nav
    cy.logout(); // Logout as student
    cy.login(STUDENT_THREE_USERNAME, STUDENT_THREE_PASSWORD); // Login as student 2
    cy.contains(studentHomePageElements.LEFT_NAV_CLASS.selector, className); // Check the current class is present in the student left nav
    cy.logout(); // Logout as student
    cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to revert the student's password", () => {
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand 'Classes' section in left nav
      cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).click(); // Expand current class in the left nav
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector, className).within(() => {
        cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER.selector).click(); // Click 'Student Roster' for current class in the left nav
      });
      cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_CHANGE_PASSWORD.selector).click(); // Click 'Change Password' in the student roster tabel for student 1 entry
      cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD.selector).type(STUDENT_TWO_PASSWORD); // Revert student 1's password to original
      cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD.selector).type(STUDENT_TWO_PASSWORD); // Confirm the password
      cy.get(changePasswordPageElements.SAVE_BUTTON.selector).click(); // Click 'Save' button
      cy.contains(flashNoticePageElements.BANNER.selector, "Password for " + STUDENT_TWO_USERNAME + " was successfully updated."); // Check banner for password change success message
      cy.logout(); // Logout as teacher
      cy.login(STUDENT_TWO_USERNAME, STUDENT_TWO_PASSWORD); // Login as student 1 with the original password
      cy.contains(studentHomePageElements.LEFT_NAV_CLASS.selector, className); // Check the current class is present in the student left nav
      cy.logout(); // Logout as student
      cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to remove one student from the roster", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand 'Classes' section in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).click(); // Expand current class in the left nav
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector, className).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER.selector).click(); // Click 'Student Roster' for current class in the left nav
    });
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_REMOVE_STUDENT_TWO.selector).click(); // Click 'Remove Student' in the student roster tabel for student 1 entry
    cy.get(studentRosterPageElements.CLASS_COUNT.selector).should("have.text", "1"); // 'Class Count' in the 'Student Roster' page should now be '1'
    cy.confirm("This will remove the student: \'" + STUDENT_THREE_NAME + "\' from the class: " + className + ".\\n\\nAre you sure you want to do this?"); // Confirm student removal from class
  });

  it("Verify teacher is able to remove second student from the roster", () => {
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_REMOVE_STUDENT.selector).click(); // Click 'Remove Student' in the student roster tabel for student 1 entry
    cy.get(studentRosterPageElements.CLASS_COUNT.selector).should("have.text", "0"); // 'Class Count' in the 'Student Roster' page should now be '0'
    cy.confirm("This will remove the student: \'" + STUDENT_TWO_NAME + "\' from the class: " + className + ".\\n\\nAre you sure you want to do this?"); // Confirm student removal from class
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE.selector).should("not.exist"); // Student roster table should not exist anymore
  });

  it("Verify students are nolonger in the class", () => {
    cy.logout(); // Logout as teacher
    cy.login(STUDENT_TWO_USERNAME, STUDENT_TWO_PASSWORD); // Login as student 1
    cy.get(studentHomePageElements.LEFT_NAV_CLASS.selector).should("not.exist"); // Check the current class is not present in the student left nav
    cy.logout(); // Logout as student 1

    cy.login(STUDENT_THREE_USERNAME, STUDENT_THREE_PASSWORD); // Login as student 2
    cy.get(studentHomePageElements.LEFT_NAV_CLASS.selector).should("not.exist"); // Check the current class is not present in the student left nav
    cy.logout(); // Logout as student 2
  });

  it("Verify teacher is able to archive the class", () => {
    cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand 'Classes' section in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES.selector).click(); // Click 'Manage Classes' section in left nav
    cy.contains(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE.selector, "Archive").click(); // Click 'Archive' for the last class in the table
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click(); // Click 'My Classes' in the top header
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand 'Classes' section in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).should("not.exist"); // The current class should no longer exist under 'Classes' in left nav
    cy.logout(); // Logout as teacher
  });

  context("Verify admin is able to remove student accounts", () => {
    before(function() {
      cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user
      cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK.selector).click(); // Click 'Admin' link in left nav
      cy.get(adminPageElements.USERS_LINK.selector).click(); // Click 'Users' link in the Admin Settings page
    });

    it("Verify admin is able to remove first student account", () => {

      cy.get(adminSettingsUsersPageElements.SEARCH_FIELD.selector).type(STUDENT_TWO_USERNAME); // Type student 1's username in the search input field
      cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON.selector).click(); // Click 'Search' button
      cy.contains(adminSettingsUsersPageElements.SEARCH_RESULT.selector, "User: " + STUDENT_TWO_FULLNAME); // The search result should contain 1 entry with student 1's info

      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns("DELETE");
        cy.get(adminSettingsUsersPageElements.DELETE_USER.selector).click(); // Click Delete link and confirm by entering DELETE in the browser prompt
      });
      cy.contains(flashNoticePageElements.BANNER.selector, "User: " + STUDENT_TWO_FULLNAME + " successfully deleted!"); // Verify banner that shows that user is successfully deleted
    });
    it("Verify admin is able to remove second student account", () => {

      cy.get(adminSettingsUsersPageElements.SEARCH_FIELD.selector).type('{selectall}{backspace}' + STUDENT_THREE_USERNAME); // Type student 1's username in the search input field
      cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON.selector).click(); // Click 'Search' button
      cy.contains(adminSettingsUsersPageElements.SEARCH_RESULT.selector, "User: " + STUDENT_THREE_FULLNAME); // The search result should contain 1 entry with student 1's info

      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns("DELETE");
        cy.get(adminSettingsUsersPageElements.DELETE_USER.selector).click(); // Click Delete link and confirm by entering DELETE in the browser prompt
      });
      cy.contains(flashNoticePageElements.BANNER.selector, "User: " + STUDENT_THREE_FULLNAME + " successfully deleted!"); // Verify banner that shows that user is successfully deleted
    });
  });
});
