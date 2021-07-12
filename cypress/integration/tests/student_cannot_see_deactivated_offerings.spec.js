import C from '../support/constants.js';
import * as TeacherHelper from '../support/helpers/teacherHelper';
import * as StudentHelper from '../support/helpers/studentHelper';

const CLASS_WORD = C.CLASS_WORD;
const CLASS_NAME = 'Class '+ CLASS_WORD;
const ASSIGNMENT_NAME = 'Cypress_AutomatedTestActivity1_AP';

context("Verify students cannot see deactivated offerings", () => {

    before(function() {
        cy.visit(C.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    });

    it("Teacher creates a class assigns an assignment and assigns student", () => {
        cy.login(C.TEACHER1_USERNAME, C.TEACHER1_PASSWORD);
        TeacherHelper.addClass(CLASS_NAME, C.CLASS_DESC, CLASS_WORD);
        TeacherHelper.addAssignment(CLASS_NAME, ASSIGNMENT_NAME);
        TeacherHelper.openStudentRosterSection(CLASS_NAME);
        TeacherHelper.addRegisteredStudentToClass(C.STUDENT1_USERNAME, C.STUDENT1_FIRSTNAME, C.STUDENT1_LASTNAME);
        cy.logout();

        cy.login(C.STUDENT1_USERNAME, C.STUDENT1_PASSWORD);
        StudentHelper.checkClassNameAppears(CLASS_NAME);
        StudentHelper.verifyAssignmentExists(CLASS_NAME, ASSIGNMENT_NAME);
        cy.logout();

        cy.login(C.TEACHER1_USERNAME, C.TEACHER1_PASSWORD);
        TeacherHelper.openAssignmentsSection(CLASS_NAME);
        TeacherHelper.deActivateAssignment(ASSIGNMENT_NAME);
        cy.logout();

        cy.login(C.STUDENT1_USERNAME, C.STUDENT1_PASSWORD);
        StudentHelper.verifyNoOfferingsAvailable(CLASS_NAME);
    });
});