import * as c from '../support/constants.js'
import * as adminHelper from '../support/helpers/adminHelper'
import * as studentHelper from '../support/helpers/studentHelper'
import * as teacherHelper from '../support/helpers/teacherHelper'

// Note for db tracking : This test adds a class at the start and then archives it at the end
// Note for db tracking : No db tracking required, using existing records (except for 2 student accounts, which are added and then deleted at the end)

const STUDENT_TWO_NAME = c.STUDENT_TWO_LASTNAME + ", " + c.STUDENT_TWO_FIRSTNAME;
const STUDENT_TWO_FULLNAME = c.STUDENT_TWO_FIRSTNAME + " " + c.STUDENT_TWO_LASTNAME;
let STUDENT_TWO_USERNAME = undefined;
const STUDENT_TWO_PASSWORD = c.STUDENT_TWO_PASSWORD;
const STUDENT_THREE_NAME = c.STUDENT_THREE_LASTNAME + ", " + c.STUDENT_THREE_FIRSTNAME;
const STUDENT_THREE_FULLNAME = c.STUDENT_THREE_FIRSTNAME + " " + c.STUDENT_THREE_LASTNAME;
let STUDENT_THREE_USERNAME = undefined;
const STUDENT_THREE_PASSWORD = c.STUDENT_THREE_PASSWORD;
const STUDENT_NEW_PASSWORD = STUDENT_TWO_PASSWORD + "1";
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

  it("Verify teacher is able to add new students to the class", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.verifyClassCount(0);
    teacherHelper.addUnregisteredStudentToClass(STUDENT_TWO_NAME, c.STUDENT_TWO_FIRSTNAME, c.STUDENT_TWO_LASTNAME, STUDENT_TWO_PASSWORD, 0);
    teacherHelper.verifyClassCount(1);
    teacherHelper.addUnregisteredStudentToClass(STUDENT_THREE_NAME, c.STUDENT_THREE_FIRSTNAME, c.STUDENT_THREE_LASTNAME, STUDENT_THREE_PASSWORD, 1);
    teacherHelper.verifyClassCount(2);

    teacherHelper.getUserNameElement(STUDENT_TWO_NAME).then(($username) => {
      STUDENT_TWO_USERNAME = $username.text();
    });

    teacherHelper.getUserNameElement(STUDENT_THREE_NAME).then(($username) => {
      STUDENT_THREE_USERNAME = $username.text();
    });
  });

  it("Verify teacher is able to change a student's password", () => {
    teacherHelper.changeStudentPassword(STUDENT_TWO_NAME, STUDENT_TWO_USERNAME, STUDENT_NEW_PASSWORD);
  });

  it("Verify registered student is able to use the new password", () => {
    cy.logout(); // Logout as teacher user

    cy.login(STUDENT_TWO_USERNAME, STUDENT_NEW_PASSWORD); // Login as student 1 with the new password
    studentHelper.checkClassNameAppears(CLASS_NAME);
    cy.logout(); // Logout as student

    cy.login(STUDENT_THREE_USERNAME, STUDENT_THREE_PASSWORD); // Login as student 2
    studentHelper.checkClassNameAppears(CLASS_NAME);
    cy.logout(); // Logout as student

    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to revert the student's password", () => {
      teacherHelper.openStudentRosterSection(CLASS_NAME);
      teacherHelper.changeStudentPassword(STUDENT_TWO_NAME, STUDENT_TWO_USERNAME, STUDENT_TWO_PASSWORD);
      cy.logout(); // Logout as teacher

      cy.login(STUDENT_TWO_USERNAME, STUDENT_TWO_PASSWORD); // Login as student 1 with the original password
      studentHelper.checkClassNameAppears(CLASS_NAME);
      cy.logout(); // Logout as student

      cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to remove one student from the roster", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.removeStudentFromRoster(STUDENT_TWO_NAME, CLASS_NAME);
    teacherHelper.verifyClassCount(1);
  });

  it("Verify teacher is able to remove another student from the roster", () => {
    teacherHelper.removeStudentFromRoster(STUDENT_THREE_NAME, CLASS_NAME);
    teacherHelper.verifyClassCount(0);

    teacherHelper.verifyRosterTableDoesNotExist();
  });

  it("Verify students are nolonger in the class", () => {
    cy.logout(); // Logout as teacher

    cy.login(STUDENT_TWO_USERNAME, STUDENT_TWO_PASSWORD); // Login as student 1
    studentHelper.checkClassNameDoesNotExist(CLASS_NAME);
    cy.logout(); // Logout as student 1

    cy.login(STUDENT_THREE_USERNAME, STUDENT_THREE_PASSWORD); // Login as student 2
    studentHelper.checkClassNameDoesNotExist(CLASS_NAME);
    cy.logout(); // Logout as student 2
  });

  it("Verify teacher is able to archive the class", () => {
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher
    teacherHelper.archiveClass(CLASS_NAME);
    cy.logout(); // Logout as teacher
  });

  it("Verify admin is able to remove student accounts", () => {
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
    adminHelper.openUsersAdminSection();
    adminHelper.removeUser(STUDENT_TWO_USERNAME, STUDENT_TWO_FULLNAME);
    adminHelper.removeUser(STUDENT_THREE_USERNAME, STUDENT_THREE_FULLNAME);
  });
});
