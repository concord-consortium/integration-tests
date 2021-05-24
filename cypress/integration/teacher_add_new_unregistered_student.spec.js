import * as c from '../support/constants.js'
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

// Note for db tracking : No db tracking required, using existing records (except for 2 student accounts, which are added and then deleted at the end)

const STUDENT_TWO_NAME = c.STUDENT_TWO_LASTNAME + ", " + c.STUDENT_TWO_FIRSTNAME;
const STUDENT_TWO_FULLNAME = c.STUDENT_TWO_FIRSTNAME + " " + c.STUDENT_TWO_LASTNAME;
const STUDENT_TWO_USERNAME = c.STUDENT_TWO_USERNAME;
const STUDENT_TWO_PASSWORD = c.STUDENT_TWO_PASSWORD;
const STUDENT_THREE_NAME = c.STUDENT_THREE_LASTNAME + ", " + c.STUDENT_THREE_FIRSTNAME;
const STUDENT_THREE_FULLNAME = c.STUDENT_THREE_FIRSTNAME + " " + c.STUDENT_THREE_LASTNAME;
const STUDENT_THREE_USERNAME = c.STUDENT_THREE_USERNAME;
const STUDENT_THREE_PASSWORD = c.STUDENT_THREE_PASSWORD;
const STUDENT_NEW_PASSWORD = STUDENT_TWO_PASSWORD + "1";
let className = undefined;

context("Verify teacher can add a new student to a class", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher is able to unarchive a class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Click 'Classes' Section
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click 'Manage Classes' Section
    cy.contains(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE, "Unarchive").click(); // Unarchive the last class in the list
    cy.get(manageClassesPageElements.LAST_CLASS_NAME).then(($lastclass) => {
      className = $lastclass.text(); // Get the class name of the unarchived class
    });
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' in the top header
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' in the left nav
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME).click(); // Expand unarchived class in the left nav
  });

  it("Verify teacher is able to add new students to the class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, className).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER).click(); // Click 'Student Roster' for the current class
    });
    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "0"); // Check 'Student Count' is '0'
    cy.get(studentRosterPageElements.REGISTER_ADD_STUDENT_LINK).click(); // Click 'Register & Add Student' link
    cy.get(registerAddStudentPageElements.FIRST_NAME_FIELD).type(c.STUDENT_TWO_FIRSTNAME); // Type student first name in the Register and add student form
    cy.get(registerAddStudentPageElements.LAST_NAME_FIELD).type(c.STUDENT_TWO_LASTNAME); // Type student last name in the Register and add student form
    cy.get(registerAddStudentPageElements.PASSWORD_FIELD).type(c.STUDENT_TWO_PASSWORD); // Type student password in the Register and add student form
    cy.get(registerAddStudentPageElements.CONFIRM_PASSWORD_FIELD).type(c.STUDENT_TWO_PASSWORD); // Confirm password in the Register and add student form
    cy.get(registerAddStudentPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button

    cy.contains(registerAddStudentPageElements.DIALOG_TEXT, "Success! The student was registered and added to the class"); // Check success dialog text
    cy.get(registerAddStudentPageElements.DIALOG_ADD_ANOTHER_STUDENT_BUTTON).click(); // Click 'Add Another Student' in success dialog

    cy.get(registerAddStudentPageElements.FIRST_NAME_FIELD).type(c.STUDENT_THREE_FIRSTNAME); // Type student first name in the Register and add student form
    cy.get(registerAddStudentPageElements.LAST_NAME_FIELD).type(c.STUDENT_THREE_LASTNAME); // Type student last name in the Register and add student form
    cy.get(registerAddStudentPageElements.PASSWORD_FIELD).type(c.STUDENT_THREE_PASSWORD); // Type student password in the Register and add student form
    cy.get(registerAddStudentPageElements.CONFIRM_PASSWORD_FIELD).type(c.STUDENT_THREE_PASSWORD); // Confirm password in the Register and add student form
    cy.get(registerAddStudentPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button

    cy.contains(registerAddStudentPageElements.DIALOG_TEXT, "Success! The student was registered and added to the class"); // Check success dialog text
    cy.get(registerAddStudentPageElements.DIALOG_CANCEL_BUTTON).click(); // Click 'Add Another Student' in success dialog

    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "2"); // Check class count is '2'
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).should("be.visible"); // Check Student Roster Table is visible
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_NAME).should("have.text", STUDENT_TWO_NAME); // Check student 1 name entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_USERNAME).should("have.text", STUDENT_TWO_USERNAME); // Check student 1 username entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_TWO_NAME).should("have.text", STUDENT_THREE_NAME); // Check student 2 name entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_TWO_USERNAME).should("have.text", STUDENT_THREE_USERNAME); // Check student 2 username entry in the roster table
  });

  it("Verify teacher is able to change a student's password", () => {
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_CHANGE_PASSWORD).click(); // Click Change Password in the student roster tabel for student 1 entry
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(STUDENT_NEW_PASSWORD); //Type new password in the change password form
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(STUDENT_NEW_PASSWORD); // Confirm new password in the change password form
    cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save' button`
    cy.contains(flashNoticePageElements.BANNER, "Password for " + STUDENT_TWO_USERNAME + " was successfully updated."); // Check banner for password change success message
  });

  it("Verify registered student is able to use the new password", () => {
    cy.logout(); // Logout as teacher user
    cy.login(STUDENT_TWO_USERNAME, STUDENT_NEW_PASSWORD); // Login as student 1 with the new password
    cy.contains(studentHomePageElements.LEFT_NAV_CLASS, className); // Check the current class is present in the student left nav
    cy.logout(); // Logout as student
    cy.login(STUDENT_THREE_USERNAME, STUDENT_THREE_PASSWORD); // Login as student 2
    cy.contains(studentHomePageElements.LEFT_NAV_CLASS, className); // Check the current class is present in the student left nav
    cy.logout(); // Logout as student
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to revert the student's password", () => {
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' section in left nav
      cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME).click(); // Expand current class in the left nav
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, className).within(() => {
        cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER).click(); // Click 'Student Roster' for current class in the left nav
      });
      cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_CHANGE_PASSWORD).click(); // Click 'Change Password' in the student roster tabel for student 1 entry
      cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(STUDENT_TWO_PASSWORD); // Revert student 1's password to original
      cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(STUDENT_TWO_PASSWORD); // Confirm the password
      cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save' button
      cy.contains(flashNoticePageElements.BANNER, "Password for " + STUDENT_TWO_USERNAME + " was successfully updated."); // Check banner for password change success message
      cy.logout(); // Logout as teacher
      cy.login(STUDENT_TWO_USERNAME, STUDENT_TWO_PASSWORD); // Login as student 1 with the original password
      cy.contains(studentHomePageElements.LEFT_NAV_CLASS, className); // Check the current class is present in the student left nav
      cy.logout(); // Logout as student
      cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to remove one student from the roster", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' section in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME).click(); // Expand current class in the left nav
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, className).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER).click(); // Click 'Student Roster' for current class in the left nav
    });
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_REMOVE_STUDENT_TWO).click(); // Click 'Remove Student' in the student roster tabel for student 1 entry
    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "1"); // 'Class Count' in the 'Student Roster' page should now be '1'
    cy.confirm("This will remove the student: \'" + STUDENT_THREE_NAME + "\' from the class: " + className + ".\\n\\nAre you sure you want to do this?"); // Confirm student removal from class
  });

  it("Verify teacher is able to remove second student from the roster", () => {
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_REMOVE_STUDENT).click(); // Click 'Remove Student' in the student roster tabel for student 1 entry
    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "0"); // 'Class Count' in the 'Student Roster' page should now be '0'
    cy.confirm("This will remove the student: \'" + STUDENT_TWO_NAME + "\' from the class: " + className + ".\\n\\nAre you sure you want to do this?"); // Confirm student removal from class
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).should("not.exist"); // Student roster table should not exist anymore
  });

  it("Verify students are nolonger in the class", () => {
    cy.logout(); // Logout as teacher
    cy.login(STUDENT_TWO_USERNAME, STUDENT_TWO_PASSWORD); // Login as student 1
    cy.get(studentHomePageElements.LEFT_NAV_CLASS).should("not.exist"); // Check the current class is not present in the student left nav
    cy.logout(); // Logout as student 1

    cy.login(STUDENT_THREE_USERNAME, STUDENT_THREE_PASSWORD); // Login as student 2
    cy.get(studentHomePageElements.LEFT_NAV_CLASS).should("not.exist"); // Check the current class is not present in the student left nav
    cy.logout(); // Logout as student 2
  });

  it("Verify teacher is able to archive the class", () => {
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' section in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click 'Manage Classes' section in left nav
    cy.contains(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE, "Archive").click(); // Click 'Archive' for the last class in the table
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' in the top header
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' section in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME).should("not.exist"); // The current class should no longer exist under 'Classes' in left nav
    cy.logout(); // Logout as teacher
  });

  context("Verify admin is able to remove student accounts", () => {
    before(function() {
      cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
      cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link in left nav
      cy.get(adminPageElements.USERS_LINK).click(); // Click 'Users' link in the Admin Settings page
    });

    it("Verify admin is able to remove first student account", () => {

      cy.get(adminSettingsUsersPageElements.SEARCH_FIELD).type(STUDENT_TWO_USERNAME); // Type student 1's username in the search input field
      cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON).click(); // Click 'Search' button
      cy.contains(adminSettingsUsersPageElements.SEARCH_RESULT, "User: " + STUDENT_TWO_FULLNAME); // The search result should contain 1 entry with student 1's info

      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns("DELETE");
        cy.get(adminSettingsUsersPageElements.DELETE_USER).click(); // Click Delete link and confirm by entering DELETE in the browser prompt
      });
      cy.contains(flashNoticePageElements.BANNER, "User: " + STUDENT_TWO_FULLNAME + " successfully deleted!"); // Verify banner that shows that user is successfully deleted
    });
    it("Verify admin is able to remove second student account", () => {

      cy.get(adminSettingsUsersPageElements.SEARCH_FIELD).type('{selectall}{backspace}' + STUDENT_THREE_USERNAME); // Type student 1's username in the search input field
      cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON).click(); // Click 'Search' button
      cy.contains(adminSettingsUsersPageElements.SEARCH_RESULT, "User: " + STUDENT_THREE_FULLNAME); // The search result should contain 1 entry with student 1's info

      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns("DELETE");
        cy.get(adminSettingsUsersPageElements.DELETE_USER).click(); // Click Delete link and confirm by entering DELETE in the browser prompt
      });
      cy.contains(flashNoticePageElements.BANNER, "User: " + STUDENT_THREE_FULLNAME + " successfully deleted!"); // Verify banner that shows that user is successfully deleted
    });
  });
});
