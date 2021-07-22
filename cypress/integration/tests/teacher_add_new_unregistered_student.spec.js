import * as c from '../../support/constants.js'
import * as adminHelper from '../../support/helpers/adminHelper'
import * as studentHelper from '../../support/helpers/studentHelper'
import * as teacherHelper from '../../support/helpers/teacherHelper'

// Note for db tracking : This test adds a class at the start and then archives it at the end
// Note for db tracking : No db tracking required, using existing records (except for 2 student accounts, which are added and then deleted at the end)

const STUDENT_NEW_PASSWORD = c.STUDENT1_PASSWORD + "1";
const CLASS_WORD = c.CLASS_WORD
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

  it("Verify teacher is able to add new students to the class", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.verifyRosterTableDoesNotExist();
    teacherHelper.verifyClassCount(0);
    teacherHelper.addUnregisteredStudentToClass(c.STUDENT1_NAME, c.STUDENT1_FIRSTNAME, c.STUDENT1_LASTNAME, c.STUDENT1_PASSWORD);
    teacherHelper.verifyClassCount(1);
    teacherHelper.addUnregisteredStudentToClass(c.STUDENT2_NAME, c.STUDENT2_FIRSTNAME, c.STUDENT2_LASTNAME, c.STUDENT2_PASSWORD);
    teacherHelper.verifyClassCount(2);

    teacherHelper.getStudentUsername(c.STUDENT1_NAME).then(($username) => {
      c.STUDENT1_USERNAME = $username;
    });

    teacherHelper.getStudentUsername(c.STUDENT2_NAME).then(($username) => {
      c.STUDENT2_USERNAME = $username;
    });
  });

  it("Verify teacher is able to change a student's password", () => {
    teacherHelper.changeStudentPassword(c.STUDENT1_NAME, c.STUDENT1_USERNAME, STUDENT_NEW_PASSWORD);
  });

  it("Verify registered student is able to use the new password", () => {
    cy.logout(); // Logout as teacher user

    cy.login(c.STUDENT1_USERNAME, STUDENT_NEW_PASSWORD); // Login as student 1 with the new password
    studentHelper.checkClassNameAppears(CLASS_NAME);
    cy.logout(); // Logout as student

    cy.login(c.STUDENT2_USERNAME, c.STUDENT2_PASSWORD); // Login as student 2
    studentHelper.checkClassNameAppears(CLASS_NAME);
    cy.logout(); // Logout as student

    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to revert the student's password", () => {
      teacherHelper.openStudentRosterSection(CLASS_NAME);
      teacherHelper.changeStudentPassword(c.STUDENT1_NAME, c.STUDENT1_USERNAME, c.STUDENT1_PASSWORD);
      cy.logout(); // Logout as teacher

      cy.login(c.STUDENT1_USERNAME, c.STUDENT1_PASSWORD); // Login as student 1 with the original password
      studentHelper.checkClassNameAppears(CLASS_NAME);
      cy.logout(); // Logout as student

      cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher
  });

  it("Verify teacher is able to remove one student from the roster", () => {
    teacherHelper.openStudentRosterSection(CLASS_NAME);
    teacherHelper.removeStudentFromRoster(c.STUDENT1_NAME, CLASS_NAME);
    teacherHelper.verifyClassCount(1);
  });

  it("Verify teacher is able to remove another student from the roster", () => {
    teacherHelper.removeStudentFromRoster(c.STUDENT2_NAME, CLASS_NAME);
    teacherHelper.verifyClassCount(0);

    teacherHelper.verifyRosterTableDoesNotExist();
  });

  it("Verify students are nolonger in the class", () => {
    cy.logout(); // Logout as teacher

    cy.login(c.STUDENT1_USERNAME, c.STUDENT1_PASSWORD); // Login as student 1
    studentHelper.checkClassNameDoesNotExist(CLASS_NAME);
    cy.logout(); // Logout as student 1

    cy.login(c.STUDENT2_USERNAME, c.STUDENT2_PASSWORD); // Login as student 2
    studentHelper.checkClassNameDoesNotExist(CLASS_NAME);
    cy.logout(); // Logout as student 2
  });

  it("Verify admin is able to remove student accounts", () => {
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
    adminHelper.openUsersAdminSection();
    adminHelper.removeUser(c.STUDENT1_USERNAME, c.STUDENT1_FULLNAME);
    adminHelper.removeUser(c.STUDENT2_USERNAME, c.STUDENT2_FULLNAME);
  });
});
