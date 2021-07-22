import * as c from '../../support/constants.js'
import * as teacherHelper from "../../support/helpers/teacherHelper"
import assignmentsPageElements from '../../support/elements/assignments_page_elements.js'
import classSetupPageElements from '../../support/elements/class_setup_page_elements.js'
import flashNoticePageElements from '../../support/elements/flash_notice_page_elements.js'
import studentRosterPageElements from '../../support/elements/student_roster_page_elements.js'
import teacherHomePageElements from '../../support/elements/teacher_home_page_elements.js'

// Note for db tracking : This test adds a class at the start and then archives it at the end

const CLASS_WORD = c.CLASS_WORD
const CLASS_NAME = 'Class ' + CLASS_WORD;

context("Verify teacher can add and edit a class", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher is able to add a class", () => {
    teacherHelper.addClass(CLASS_NAME, c.CLASS_DESC, CLASS_WORD); // Teacher adds a class
  });

  it("Verify Assignments page of newly added class is displayed properly", () => {
    teacherHelper.openAssignmentsSection(CLASS_NAME);
    cy.get(assignmentsPageElements.TEACHER_NAME).contains(c.TEACHER1_FULLNAME); // Check teacher name in 'Assignments' page
    cy.get(assignmentsPageElements.CLASS_WORD).contains(CLASS_WORD); // Check class word in the 'Assignments' page
  });

  it("Verify Student Roster page of newly added class is displayed properly", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    cy.get(studentRosterPageElements.HEADING).should("have.text", "Student Roster"); // Check heading of the 'Student Roster' page
    cy.get(studentRosterPageElements.TEACHER_NAME).contains(c.TEACHER1_FULLNAME); // Check teacher name in the 'Student Roster'  page
    cy.get(studentRosterPageElements.CLASS_WORD).contains(CLASS_WORD); // Check class word in the 'Student Roster' page
    cy.get(studentRosterPageElements.CLASS_COUNT).should("have.text", "0"); // Check Student count is '0' in the 'Student Roster' page
  });

  it("Verify Class Setup page of newly added class is displayed properly", () => {
    teacherHelper.openClassSetupSection(CLASS_NAME);
    cy.get(classSetupPageElements.HEADING).should("have.text", "Class Setup Information"); // Check heading of the 'Class Setup' page
    cy.get(classSetupPageElements.CLASS_WORD).contains(CLASS_WORD); // Check class word in the 'Class Setup' page
  });

  it("Verify teacher is able to edit class", () => {
    cy.get(classSetupPageElements.CLASS_NAME_FIELD).type('-1a'); // Append '-1a' in the class name field in the 'Class Setup' page
    cy.get(classSetupPageElements.CLASS_WORD_FIELD).type('-1a'); // Append '-1a' in the class word field in the 'Class Setup' page
    cy.get(classSetupPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button
    cy.get(flashNoticePageElements.BANNER).contains("Class was successfully updated."); // Check that banner says 'Class was successfully updated.
  });

  it("Verify Assignments page of edited class is displayed properly", () => {
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME).contains(CLASS_NAME + "-1a"); // Check new name of class in the left nav bar
    cy.get(assignmentsPageElements.HEADING).should("have.text", "Assignments for "+ CLASS_NAME + "-1a"); // Check new name of class in the Assignments page
  });

  it("Verify edits made to class can be reverted", () => {
    teacherHelper.openClassSetupSection(CLASS_NAME + "-1a");
    cy.get(classSetupPageElements.CLASS_NAME_FIELD).type('{selectall}{backspace}' + CLASS_NAME); // Revert class name to original name
    cy.get(classSetupPageElements.CLASS_WORD_FIELD).type('{selectall}{backspace}' + CLASS_WORD); // Revert class word to original word
    cy.get(classSetupPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button
    cy.get(assignmentsPageElements.HEADING).should("have.text", "Assignments for "+ CLASS_NAME); // Check name of class in the Assignments page
    cy.get(assignmentsPageElements.CLASS_WORD).contains(CLASS_WORD); // Check Class word in the Assignments page
  });
});
