import C from '../../support/constants.js';
import * as TeacherHelper from '../../support/helpers/teacherHelper';
import * as StudentHelper from '../../support/helpers/studentHelper';
import * as StudentHomePage from "../../support/elements/student_home_page_elements";

const CLASS_WORD = C.CLASS_WORD;
const CLASS_NAME = 'Class '+ CLASS_WORD;
const ASSIGNMENT_NAME = 'Cypress_Automated_Wildfire_Module';

context("Verify students cannot see deactivated offerings", () => {

  before(function() {
    cy.visit(C.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  });

  afterEach(function() {
    cy.logout();
    cy.clearAllCookies();
  });

  it("Teacher creates a class assigns an assignment and assigns student", () => {
    cy.login(C.TEACHER1_USERNAME, C.TEACHER1_PASSWORD);
    TeacherHelper.addClass(CLASS_NAME, C.CLASS_DESC, CLASS_WORD);
    TeacherHelper.addAssignment(CLASS_NAME, ASSIGNMENT_NAME);
    TeacherHelper.openStudentRosterSection(CLASS_NAME);
  });

  it("Verify student sees an assignment", () => {

    cy.login(C.STUDENT1_USERNAME, C.STUDENT1_PASSWORD);
    StudentHomePage.joinClass(CLASS_WORD);
    cy.wait(1000);
    StudentHelper.checkClassNameAppears(CLASS_NAME);
    StudentHelper.verifyAssignmentExists(CLASS_NAME, ASSIGNMENT_NAME);
  });

  it("Teacher deactivates an assignment", () => {
    cy.login(C.TEACHER1_USERNAME, C.TEACHER1_PASSWORD);
    TeacherHelper.openAssignmentsSection(CLASS_NAME);
    TeacherHelper.deActivateAssignment(ASSIGNMENT_NAME);
  });

  it("Verify student don't sees an assignment", () => {
    cy.login(C.STUDENT1_USERNAME, C.STUDENT1_PASSWORD);
    StudentHelper.verifyNoOfferingsAvailable(CLASS_NAME);
  });
});
