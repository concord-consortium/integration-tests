import * as c from '../support/constants.js'
import * as adminHelper from '../support/helpers/adminHelper'
import * as studentHelper from '../support/helpers/studentHelper'
import * as teacherHelper from '../support/helpers/teacherHelper'

// Note for db tracking : This test adds a class at the start and then archives it at the end

const STUDENT_NEW_PASSWORD = c.STUDENT_PASSWORD + "1";
const CLASS_WORD = c.CLASS_WORD;
const CLASS_NAME = 'Class ' + CLASS_WORD;

context("Verify teacher can add a new student to a class", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher user
    teacherHelper.addClass(CLASS_NAME, c.CLASS_DESC, CLASS_WORD); // Teacher adds a class
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher is able to add a registered student to the class", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.verifyRosterTableDoesNotExist();
    teacherHelper.verifyClassCount(0);
    teacherHelper.addRegisteredStudentToClass(c.STUDENT1_USERNAME, c.STUDENT1_FIRSTNAME, c.STUDENT1_LASTNAME);
    teacherHelper.verifyClassCount(1);
  });

  it("Verify teacher is able to change student's password", () => {
    teacherHelper.changeStudentPassword(c.STUDENT1_NAME, c.STUDENT1_USERNAME, STUDENT_NEW_PASSWORD);
  });

  it("Verify registered student is able to use the new password", () => {
    cy.logout(); // Logout as teacher

    cy.login(c.STUDENT1_USERNAME, STUDENT_NEW_PASSWORD); // Login as student
    cy.logout(); // Logout as student

    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to revert the student's password", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.changeStudentPassword(c.STUDENT1_NAME, c.STUDENT1_USERNAME, c.STUDENT1_PASSWORD);
    cy.logout(); // Logout as teacher

    cy.login(c.STUDENT1_USERNAME, c.STUDENT1_PASSWORD); // Login as student with the original password
    studentHelper.checkClassNameAppears(CLASS_NAME);
    cy.logout(); // Logout as student

    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to remove student from the roster", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.removeStudentFromRoster(c.STUDENT1_NAME, CLASS_NAME);
    teacherHelper.verifyClassCount(0);
  });

  it("Verify students are nolonger in the class", () => {
    cy.logout(); // Logout as teacher

    cy.login(c.STUDENT1_USERNAME, c.STUDENT1_PASSWORD); // Login as student 1
    studentHelper.checkClassNameDoesNotExist(CLASS_NAME);
    cy.logout(); // Logout as student 1
  });

  it("Verify teacher is able to archive the class", () => {
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher
    teacherHelper.archiveClass(CLASS_NAME);
  });
});
