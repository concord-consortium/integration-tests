import * as c from '../support/constants.js'
import addClassPageElements from '../support/elements/add_class_page_elements.js'
import manageClassesPageElements from '../support/elements/manage_classes_page_elements.js'
import registerAddStudentPageElements from '../support/elements/register_add_student_page_elements.js'
import studentRosterPageElements from '../support/elements/student_roster_page_elements.js'
import teacherHomePageElements from '../support/elements/teacher_home_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'

// Note for db tracking : This test adds a class at the start and then archives it at the end
// Note for db tracking : This test adds 2 students to the db for use in other tests in the suite

const CLASS_WORD = c.CLASS_WORD;
const CLASS_NAME = 'Class ' + CLASS_WORD;
const STUDENT_NAME = c.STUDENT_LASTNAME + ", " + c.STUDENT_FIRSTNAME;
const STUDENT_ONE_NAME = c.STUDENT_ONE_LASTNAME + ", " + c.STUDENT_ONE_FIRSTNAME;

context("Setup : Add student accounts for use in tests", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.logout(); // Logout so as to clear cookies from previous test
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Teacher adds a class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_ADD_CLASS).click(); // Click 'Add Class'
    cy.get(addClassPageElements.CLASS_NAME).type(CLASS_NAME); // Type into class name field
    cy.get(addClassPageElements.CLASS_DESCRIPTION).type(c.CLASS_DESC); // Type into class description field
    cy.get(addClassPageElements.CLASS_WORD).type(CLASS_WORD); // Type into class word field
    cy.get(addClassPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button

  });

  it("Teacher registers 2 new students to the class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER).click(); // Click 'Student Roster' for the current class
    });
    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "0"); // Check 'Student Count' is '0'
    cy.get(studentRosterPageElements.REGISTER_ADD_STUDENT_LINK).click(); // Click 'Register & Add Student' link
    cy.get(registerAddStudentPageElements.FIRST_NAME_FIELD).type(c.STUDENT_FIRSTNAME); // Type student first name in the Register and add student form
    cy.get(registerAddStudentPageElements.LAST_NAME_FIELD).type(c.STUDENT_LASTNAME); // Type student last name in the Register and add student form
    cy.get(registerAddStudentPageElements.PASSWORD_FIELD).type(c.STUDENT_PASSWORD); // Type student password in the Register and add student form
    cy.get(registerAddStudentPageElements.CONFIRM_PASSWORD_FIELD).type(c.STUDENT_PASSWORD); // Confirm password in the Register and add student form
    cy.get(registerAddStudentPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button

    cy.contains(registerAddStudentPageElements.DIALOG_TEXT, "Success! The student was registered and added to the class"); // Check success dialog text
    cy.get(registerAddStudentPageElements.DIALOG_ADD_ANOTHER_STUDENT_BUTTON).click(); // Click 'Add Another Student' in success dialog

    cy.get(registerAddStudentPageElements.FIRST_NAME_FIELD).type(c.STUDENT_ONE_FIRSTNAME); // Type student first name in the Register and add student form
    cy.get(registerAddStudentPageElements.LAST_NAME_FIELD).type(c.STUDENT_ONE_LASTNAME); // Type student last name in the Register and add student form
    cy.get(registerAddStudentPageElements.PASSWORD_FIELD).type(c.STUDENT_ONE_PASSWORD); // Type student password in the Register and add student form
    cy.get(registerAddStudentPageElements.CONFIRM_PASSWORD_FIELD).type(c.STUDENT_ONE_PASSWORD); // Confirm password in the Register and add student form
    cy.get(registerAddStudentPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button

    cy.contains(registerAddStudentPageElements.DIALOG_TEXT, "Success! The student was registered and added to the class"); // Check success dialog text
    cy.get(registerAddStudentPageElements.DIALOG_CANCEL_BUTTON).click(); // Click 'Add Another Student' in success dialog

    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "2"); // Check class count is '2'
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).should("be.visible"); // Check Student Roster Table is visible
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_NAME).should("have.text", STUDENT_NAME); // Check student name entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_USERNAME).should("have.text", c.STUDENT_USERNAME); // Check student username entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_TWO_NAME).should("have.text", STUDENT_ONE_NAME); // Check student name entry in the roster table
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_STUDENT_TWO_USERNAME).should("have.text", c.STUDENT_ONE_USERNAME); // Check student username entry in the roster table
  });

  it("Teacher archives the class", () => {
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click 'Manage Classes' section
    cy.contains(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE, "Archive").click(); // Archive the last class in the table which is the current class
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' in the top header
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' section
    cy.get(teacherHomePageElements.LEFT_NAV_ALL_CLASSES_PARENT).should("not.have.text", CLASS_NAME); // The archived class should not exist in the left nav bar
  });
});
