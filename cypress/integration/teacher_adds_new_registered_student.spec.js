import * as c from '../support/constants.js'
import * as adminHelper from '../support/helpers/adminHelper'
import * as studentHelper from '../support/helpers/studentHelper'
import * as teacherHelper from '../support/helpers/teacherHelper'

// Note for db tracking : This test adds a class at the start and then archives it at the end

const STUDENT_FIRSTNAME = c.STUDENT_FIRSTNAME;
const STUDENT_LASTNAME = c.STUDENT_LASTNAME;
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
    teacherHelper.addClass(CLASS_NAME, c.CLASS_DESC, CLASS_WORD); // Teacher adds a class
    teacherHelper.verifyRosterTableDoesNotExist();
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher is able to add a registered student to the class", () => {
    teacherHelper.addRegisteredStudentToClass(STUDENT_USERNAME, STUDENT_FIRSTNAME, STUDENT_LASTNAME, CLASS_NAME);
    teacherHelper.verifyClassCount(1);
  });

  it("Verify teacher is able to change student's password", () => {
    teacherHelper.changeStudentPassword(STUDENT_NAME, STUDENT_USERNAME, STUDENT_NEW_PASSWORD);
  });

  it("Verify registered student is able to use the new password", () => {
    cy.logout(); // Logout as teacher

    cy.login(STUDENT_USERNAME, STUDENT_NEW_PASSWORD); // Login as student
    cy.logout(); // Logout as student

    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to revert the student's password", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.changeStudentPassword(STUDENT_NAME, STUDENT_USERNAME, STUDENT_PASSWORD);
    cy.logout(); // Logout as teacher

    cy.login(STUDENT_USERNAME, STUDENT_PASSWORD); // Login as student with the original password
    studentHelper.checkClassNameAppears(CLASS_NAME);
    cy.logout(); // Logout as student

    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to remove student from the roster", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.removeStudentFromRoster(STUDENT_NAME, CLASS_NAME);
    teacherHelper.verifyClassCount(0);
  });

  it("Verify students are nolonger in the class", () => {
    cy.logout(); // Logout as teacher

    cy.login(STUDENT_USERNAME, STUDENT_PASSWORD); // Login as student 1
    studentHelper.checkClassNameDoesNotExist(CLASS_NAME);
    cy.logout(); // Logout as student 1
  });

  it("Verify teacher is able to archive the class", () => {
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
    teacherHelper.archiveClass(CLASS_NAME);
  });
});
