import * as c from '../support/constants.js'
import addClassPageElements from '../support/elements/add_class_page_elements.js'
import assignmentsPageElements from '../support/elements/assignments_page_elements.js'
import classSetupPageElements from '../support/elements/class_setup_page_elements.js'
import flashNoticePageElements from '../support/elements/flash_notice_page_elements.js'
import manageClassesPageElements from '../support/elements/manage_classes_page_elements.js'
import studentRosterPageElements from '../support/elements/student_roster_page_elements.js'
import teacherHomePageElements from '../support/elements/teacher_home_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'

// Note for db tracking : This test adds a class at the start and then archives it at the end

const TEACHER_NAME = c.TEACHER_FIRSTNAME + " " + c.TEACHER_LASTNAME;
const CLASS_WORD = c.CLASS_WORD
const CLASS_NAME = 'Class ' + CLASS_WORD;

context("Verify teacher can add and edit a class", () => {

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

  it("Verify Assignments page of newly added class is displayed properly", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).click(); // Class with the given class name should be added to left nav
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_CLASS_ASSIGNMENTS).click(); // Click 'Assignments' section
    });
    cy.contains(assignmentsPageElements.HEADING, "Assignments for "+ CLASS_NAME); // Check heading of the 'Assignments' page
    cy.contains(assignmentsPageElements.TEACHER_NAME, TEACHER_NAME); // Check teacher name in 'Assignments' page
    cy.contains(assignmentsPageElements.CLASS_WORD, CLASS_WORD); // Check class word in the 'Assignments' page
  });

  it("Verify Student Roster page of newly added class is displayed properly", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER).click(); // Click 'Student Roster' section
    });
    cy.get(studentRosterPageElements.HEADING).should("have.text", "Student Roster"); // Check heading of the 'Student Roster' page
    cy.contains(studentRosterPageElements.TEACHER_NAME, TEACHER_NAME); // Check teacher name in the 'Student Roster'  page
    cy.contains(studentRosterPageElements.CLASS_WORD, CLASS_WORD); // Check class word in the 'Student Roster' page
    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "0"); // Check Student count is '0' in the 'Student Roster' page
  });

  it("Verify Class Setup page of newly added class is displayed properly", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_CLASS_SETUP).click(); // Click 'Class Setup' section
    });
    cy.get(classSetupPageElements.HEADING).should("have.text", "Class Setup Information"); // Check heading of the 'Class Setup' page
    cy.contains(classSetupPageElements.CLASS_WORD, CLASS_WORD); // Check class word in the 'Class Setup' page
  });

  it("Verify teacher is able to edit class", () => {
    cy.get(classSetupPageElements.CLASS_NAME_FIELD).type('-1a'); // Append '-1a' in the class name field in the 'Class Setup' page
    cy.get(classSetupPageElements.CLASS_WORD_FIELD).type('-1a'); // Append '-1a' in the class word field in the 'Class Setup' page
    cy.get(classSetupPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button
    cy.contains(flashNoticePageElements.BANNER, "Class was successfully updated."); // Check that banner says 'Class was successfully updated.
  });

  it("Verify Assignments page of edited class is displayed properly", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME + "-1a"); // Check new name of class in the left nav bar
    cy.get(assignmentsPageElements.HEADING).should("have.text", "Assignments for "+ CLASS_NAME + "-1a"); // Check new name of class in the Assignments page
  });

  it("Verify edits made to class can be reverted", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME + "-1a").within(() => {
      cy.get(teacherHomePageElements.LEFT_NAV_CLASS_SETUP).click(); // Click 'Class Setup' section
    });
    cy.get(classSetupPageElements.CLASS_NAME_FIELD).type('{selectall}{backspace}' + CLASS_NAME); // Revert class name to original name
    cy.get(classSetupPageElements.CLASS_WORD_FIELD).type('{selectall}{backspace}' + CLASS_WORD); // Revert class word to original word
    cy.get(classSetupPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button
    cy.get(assignmentsPageElements.HEADING).should("have.text", "Assignments for "+ CLASS_NAME); // Check name of class in the Assignments page
    cy.contains(assignmentsPageElements.CLASS_WORD, CLASS_WORD); // Check Class word in the Assignments page
  });

  it("Verify teacher is able to archive the class", () => {
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click 'Manage Classes' section
    cy.contains(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE, "Archive").click(); // Archive the last class in the table which is the current class
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' in the top header
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' section
    cy.get(teacherHomePageElements.LEFT_NAV_ALL_CLASSES_PARENT).should("not.have.text", CLASS_NAME); // The archived class should not exist in the left nav bar
  });
});
