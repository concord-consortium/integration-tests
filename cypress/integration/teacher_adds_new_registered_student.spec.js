import constants from '../support/constants.js'
import teacherHomePageElements from '../support/elements/teacher_home_page_elements.js'
import addClassPageElements from '../support/elements/add_class_page_elements.js'
import studentRosterPageElements from '../support/elements/student_roster_page_elements.js'
import flashNoticePageElements from '../support/elements/flash_notice_page_elements.js'
import manageClassesPageElements from '../support/elements/manage_classes_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import changePasswordPageElements from '../support/elements/change_password_page_elements.js'
import studentHomePageElements from '../support/elements/student_home_page_elements.js'

const STUDENT_NAME = constants.STUDENT_LASTNAME + ", " + constants.STUDENT_FIRSTNAME;
const STUDENT_USERNAME = constants.STUDENT_USERNAME;
const STUDENT_PASSWORD = constants.STUDENT_PASSWORD;
const STUDENT_NEW_PASSWORD = constants.STUDENT_PASSWORD + "1";
let className = undefined;

context("Verify teacher can add a new student to a class", () => {

  before(function() {
    cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  // it("Verify teacher is able to add a class", () => {
  //   cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand Classes section in the left nav bar
  //   cy.get(teacherHomePageElements.LEFT_NAV_ADD_CLASS).click(); // Click Add Class in the left nav bar
  //   cy.get(addClassPageElements.CLASS_NAME).type(CLASS_NAME); // Type Class name in the 'Add Class' form
  //   cy.get(addClassPageElements.CLASS_DESCRIPTION).type(constants.CLASS_DESC); // Type Class description in the 'Add Class' form
  //   cy.get(addClassPageElements.CLASS_WORD).type(constants.CLASS_WORD); // Type Class word in the 'Add Class' form
  //   cy.get(addClassPageElements.SUBMIT_BUTTON).click(); // Click 'Submit'
  // });

  it("Verify teacher is able to unarchive a class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES.selector).click(); // Click Manage Classes in the left nav bar
    cy.get(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE.selector).should("have.text", "Unarchive").click(); // Click Unarchive button on the last added class
    cy.get(manageClassesPageElements.LAST_CLASS_NAME.selector).then(($lastclass) => {
      className = $lastclass.text(); // Get class name of the unarchived class
      console.log("Class Name : " + className);
    })
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click(); // Navigate to the Getting Started page
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).click(); // The unarchived class should exist in the left nav bar
  });

  it("Verify teacher is able to add a registered student to the class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector, className).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER.selector).click(); // Click 'Student Roster' in the left nav bar
    });
    cy.get(studentRosterPageElements.CLASS_COUNT.selector).should("have.text", "0"); // Class student count is 0
    cy.get(studentRosterPageElements.REGISTERED_STUDENT_DROPDOWN.selector).select(STUDENT_NAME + " (" + STUDENT_USERNAME + ")"); // Select a student from the dropdown to add registered students
    cy.get(studentRosterPageElements.ADD_STUDENT_BUTTON.selector).click(); // Click the ADD button
    cy.get(studentRosterPageElements.CLASS_COUNT.selector).should("have.text", "1"); // Class student count is 1
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE.selector).should("be.visible"); // Student Roster table should be displayed
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_NAME.selector).should("have.text", STUDENT_NAME); // Student Roster table should have registered student name
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_USERNAME.selector).should("have.text", STUDENT_USERNAME); // Student Roster table should have registered student username
  });

  it("Verify teacher is able to change student's password", () => {
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_CHANGE_PASSWORD.selector).click(); // Click Change Password link
    cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD.selector).type(STUDENT_NEW_PASSWORD); // Type password into 'Password' field
    cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD.selector).type(STUDENT_NEW_PASSWORD); // Type password into 'Confirm password' field
    cy.get(changePasswordPageElements.SAVE_BUTTON.selector).click(); // Click 'Save' button
    cy.contains(flashNoticePageElements.BANNER.selector, "Password for " + STUDENT_USERNAME + " was successfully updated."); // Check banner for successful password update
  });

  it("Verify registered student is able to use the new password", () => {
    cy.logout(); // Logout as teacher
    cy.login(STUDENT_USERNAME, STUDENT_NEW_PASSWORD); // Login as student
    cy.logout(); // Logout as student
    cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to revert the student's password", () => {
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand Classes section in the left nav bar
      cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).click(); // Expand current class
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector, className).within(() => {
        cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER.selector).click(); // Click 'Student Roster' in the left nav bar
      });
      cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_CHANGE_PASSWORD.selector).click(); // Click 'Change Password' link
      cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD.selector).type(STUDENT_PASSWORD); // Type password into Password field
      cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD.selector).type(STUDENT_PASSWORD); // Type password into Confirm password field
      cy.get(changePasswordPageElements.SAVE_BUTTON.selector).click(); // Click 'Save' button
      cy.contains(flashNoticePageElements.BANNER.selector, "Password for " + STUDENT_USERNAME + " was successfully updated."); // Check banner for successful password change
      cy.logout(); // Logout as teacher
      cy.login(STUDENT_USERNAME, STUDENT_PASSWORD); // Login as student
      cy.logout(); // Logout as student
      cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to remove student from the roster", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).click(); // Expand the current class
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector, className).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER.selector).click(); // Click 'Student Roster' in the left nav bar
    });
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_REMOVE_STUDENT.selector).click(); // Click Remove Student link
    cy.confirm("This will remove the student: " + STUDENT_NAME + " from the class: " + className + ". Are you sure you want to do this?"); // Confirm browser alert
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE.selector).should("not.exist"); // Student Roster table should be displayed
  });

  it("Verify teacher is able to archive the class", () => {
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES.selector).click(); // Click Manage Classes in the left nav bar
    cy.get(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE.selector).should("have.text", "Archive").click(); // Click Archive button on the last added class
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click(); // Navigate to the Getting Started page
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).should("not.exist"); // The archived class should not exist in the left nav bar
  });
});
