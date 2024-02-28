import * as c from "../../support/constants";
import * as TeacherHelper from '../../support/helpers/teacherHelper';
import * as StudentHelper from '../../support/helpers/studentHelper';
import * as AdminHelper from '../../support/helpers/adminHelper';
import studentHomePageElements from "../../support/elements/student_home_page_elements";
import studentRosterPageElements from "../../support/elements/student_roster_page_elements";
import signupPageElements from "../../support/elements/signup_page_elements";
import adminPageElements from "../../support/elements/admin_page_elements";

const CLASS_WORD_1 = 'word1_'+c.UID;
const CLASS_WORD_2 = 'word2_'+c.UID;
const CLASS_NAME_1 = 'Class '+ CLASS_WORD_1;
const CLASS_NAME_2 = 'Class '+ CLASS_WORD_2;

context("Student joins another class tests", () => {

	before(function() {
		cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
	});

	after(function() {
		cy.visit(c.LEARN_PORTAL_BASE_URL);
		cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
		cy.get(adminPageElements.LNK_ADMIN).click();
		cy.get(adminPageElements.USERS_LINK).click();
		AdminHelper.removeUser(c.STUDENT6_USERNAME, c.STUDENT6_FULLNAME);
	});

	function clearCookies() {
		cy.clearAllCookies();
	};

  it("Teacher1 creates new class with class_word_1", () => {
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
    TeacherHelper.addClass(CLASS_NAME_1, c.CLASS_DESC, CLASS_WORD_1);
    cy.logout();
    clearCookies();
  });

	it("Teacher2 creates new class with class_word_2", () => {
		cy.login(c.TEACHER2_USERNAME, c.TEACHER2_PASSWORD);
		TeacherHelper.addClass(CLASS_NAME_2, c.CLASS_DESC, CLASS_WORD_2);
		cy.logout();
		clearCookies();
	});

	it("New student registration for class_word_1 and joins another class class_word_2", () => {
		StudentHelper.registerStudent(c.STUDENT6_USERNAME, c.STUDENT6_FIRSTNAME, c.STUDENT6_LASTNAME, c.STUDENT6_PASSWORD, CLASS_WORD_1);
		clearCookies();
		cy.visit(c.LEARN_PORTAL_BASE_URL);
		cy.login(c.STUDENT6_USERNAME, c.STUDENT6_PASSWORD);
		StudentHelper.joinClass(CLASS_WORD_2, c.TEACHER2_FULLNAME);
		cy.get(studentHomePageElements.LEFT_NAV_CLASS_NAME).find('li a', CLASS_NAME_2);
		cy.logout();
		clearCookies();
	});

	it("Teacher2 Verifies new student is registered to the class", () => {
		cy.login(c.TEACHER2_USERNAME, c.TEACHER2_PASSWORD);
		TeacherHelper.openStudentRosterSection(CLASS_NAME_2);
		cy.contains(studentRosterPageElements.STUDENT_ROSTER_TABLE_USERNAME_COLUMN, c.STUDENT6_USERNAME);
		cy.logout();
		clearCookies();
	});

	it("Admin deletes the new user added", () => {
		cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
		cy.get(adminPageElements.LNK_ADMIN).click();
		cy.get(adminPageElements.USERS_LINK).click();
		AdminHelper.removeUser(c.STUDENT6_USERNAME, c.STUDENT6_FULLNAME);
		cy.logout();
		clearCookies();
	});

	it("Verify student registration with invalid word shows error", () => {
		cy.get(signupPageElements.BTN_REGISTER_USER).click();
		cy.get(signupPageElements.BTN_I_AM_STUDENT).click();
		cy.get(signupPageElements.TXT_FIRST_NAME).type('testfirstname');
		cy.get(signupPageElements.TXT_LAST_NAME).type('testlastname');
		cy.get(signupPageElements.TXT_PASSWORD).type('testpassword');
		cy.get(signupPageElements.TXT_CONFIRM_PASSWORD).type('testpassword');
		cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();
		cy.get(signupPageElements.TXT_CLASS_WORD).type('invalid class word');
		cy.get(signupPageElements.LBL_INVALID_WORD_ERROR).should('have.text', 'You must enter a valid class word');
		cy.get(signupPageElements.CLOSE_BUTTON).click();
	});
});
