import * as c from '../support/constants.js'
import addClassPageElements from '../support/elements/add_class_page_elements.js'
import changePasswordPageElements from '../support/elements/change_password_page_elements.js'
import flashNoticePageElements from '../support/elements/flash_notice_page_elements.js'
import manageClassesPageElements from '../support/elements/manage_classes_page_elements.js'
import studentHomePageElements from '../support/elements/student_home_page_elements.js'
import studentRosterPageElements from '../support/elements/student_roster_page_elements.js'
import teacherHomePageElements from '../support/elements/teacher_home_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import * as teachersHelper from '../support/helpers/teacherHelper'

// Note for db tracking : This test adds a class at the start and then archives it at the end

const STUDENT_NAME = c.STUDENT_LASTNAME + ", " + c.STUDENT_FIRSTNAME;
const STUDENT_USERNAME = c.STUDENT_USERNAME;
const STUDENT_PASSWORD = c.STUDENT_PASSWORD;
const STUDENT_NEW_PASSWORD = c.STUDENT_PASSWORD + "1";
const CLASS_WORD = c.CLASS_WORD
const CLASS_NAME = 'Class ' + CLASS_WORD;

context("Verify teacher can add a new student to a class", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher is able to add a class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_ADD_CLASS).click(); // Click 'Add Class'
    cy.get(addClassPageElements.CLASS_NAME).type(CLASS_NAME); // Type into class name field
    cy.get(addClassPageElements.CLASS_DESCRIPTION).type(c.CLASS_DESC); // Type into class description field
    cy.get(addClassPageElements.CLASS_WORD).type(CLASS_WORD); // Type into class word field
    cy.get(addClassPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button

  });

  it("Verify teacher is able to add a registered student to the class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER).click(); // Click 'Student Roster' in the left nav bar
    });
    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "0"); // Class student count is 0
    cy.get(studentRosterPageElements.REGISTERED_STUDENT_DROPDOWN).select(STUDENT_NAME + " (" + STUDENT_USERNAME + ")"); // Select a student from the dropdown to add registered students
    cy.get(studentRosterPageElements.ADD_STUDENT_BUTTON).click(); // Click the ADD button
    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "1"); // Class student count is 1
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).should("be.visible"); // Student Roster table should be displayed
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_NAME).should("have.text", STUDENT_NAME); // Student Roster table should have registered student name
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_USERNAME).should("have.text", STUDENT_USERNAME); // Student Roster table should have registered student username
  });

  it("Verify teacher is able to change student's password", () => {
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_CHANGE_PASSWORD).click(); // Click Change Password link
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(STUDENT_NEW_PASSWORD); // Type password into 'Password' field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(STUDENT_NEW_PASSWORD); // Type password into 'Confirm password' field
    cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save' button
    cy.contains(flashNoticePageElements.BANNER, "Password for " + STUDENT_USERNAME + " was successfully updated."); // Check banner for successful password update
  });

  it("Verify registered student is able to use the new password", () => {
    cy.logout(); // Logout as teacher
    cy.login(STUDENT_USERNAME, STUDENT_NEW_PASSWORD); // Login as student
    cy.logout(); // Logout as student
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to revert the student's password", () => {
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand Classes section in the left nav bar
      cy.get(teacherHomePageElements.NAV_CLASSES).contains('li', CLASS_NAME).click(); // Expand current class in the left nav
      cy.contains('li',CLASS_NAME).contains('Student Roster').click();
      cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_CHANGE_PASSWORD).click(); // Click 'Change Password' link
      cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(STUDENT_PASSWORD); // Type password into Password field
      cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(STUDENT_PASSWORD); // Type password into Confirm password field
      cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save' button
      cy.contains(flashNoticePageElements.BANNER, "Password for " + STUDENT_USERNAME + " was successfully updated."); // Check banner for successful password change
      cy.logout(); // Logout as teacher
      cy.login(STUDENT_USERNAME, STUDENT_PASSWORD); // Login as student
      cy.logout(); // Logout as student
      cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to remove student from the roster", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.NAV_CLASSES).contains('li', CLASS_NAME).click(); // Expand current class in the left nav
    cy.contains('li',CLASS_NAME).contains('Student Roster').click();
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_REMOVE_STUDENT).click(); // Click Remove Student link
    cy.confirm("This will remove the student: " + STUDENT_NAME + " from the class: " + CLASS_NAME + ". Are you sure you want to do this?"); // Confirm browser alert
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).should("not.exist"); // Student Roster table should be displayed
  });

  it("Verify teacher is able to archive the class", () => {
    teachersHelper.archiveClass(CLASS_NAME);
    // cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click Manage Classes in the left nav bar
    // cy.get(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE).should("have.text", "Archive").click(); // Click Archive button on the last added class
    // cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Navigate to the Getting Started page
    // cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand Classes section in the left nav bar
    // cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME).should("not.exist"); // The archived class should not exist in the left nav bar
  });
});
