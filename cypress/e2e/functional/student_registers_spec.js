import * as c from "../../support/constants";
import signupPageElements from "../../support/elements/signup_page_elements";
import * as TeacherHelper from '../../support/helpers/teacherHelper';
import * as StudentHelper from '../../support/helpers/studentHelper';
import * as AdminHelper from '../../support/helpers/adminHelper';
import adminPageElements from "../../support/elements/admin_page_elements";

const CLASS_WORD = c.CLASS_WORD;
const CLASS_NAME = 'Class '+ CLASS_WORD;

context("Student registration tests", () => {

  beforeEach(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  });

  function clearCookies() {
		cy.clearAllCookies();
	};

  it("Verify class words are not case sensitive and spaces allowed", () => {
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
    let upperCaseClassWord = 'CASE SENSITIVE ' + CLASS_WORD;
    TeacherHelper.addClass(CLASS_NAME, c.CLASS_DESC, upperCaseClassWord);
    cy.logout();
    clearCookies();

    let lowerCaseClassWord = 'case sensitive ' + CLASS_WORD;

    //Register user with lower case class word.
    StudentHelper.registerStudent(c.STUDENT7_USERNAME, c.STUDENT7_FIRSTNAME, c.STUDENT7_LASTNAME, c.STUDENT7_PASSWORD, lowerCaseClassWord);
    clearCookies();

    //Now delete the registered user.
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
    cy.get(adminPageElements.LNK_ADMIN).click();
    cy.get(adminPageElements.USERS_LINK).click();
    AdminHelper.removeUser(c.STUDENT7_USERNAME, c.STUDENT7_FIRSTNAME + ' ' + c.STUDENT7_LASTNAME);
    cy.logout();
    clearCookies();
  });

  it("Register student - Error Scenarios", () => {
    // use force:true because element can be hidden by the "Signed out Successfully" modal
    cy.get(signupPageElements.BTN_REGISTER_USER).click({force: true}); 
    cy.get(signupPageElements.BTN_I_AM_STUDENT).click();
    //Verify submit button is disabled before the form is filled.
    cy.get(signupPageElements.BTN_SUBMIT_BUTTON).should('be.disabled');

    cy.get(signupPageElements.TXT_FIRST_NAME).type(c.STUDENT7_FIRSTNAME);
    cy.get(signupPageElements.TXT_LAST_NAME).type(c.STUDENT7_LASTNAME);
    cy.get(signupPageElements.BTN_SUBMIT_BUTTON).should('be.disabled');

    cy.get(signupPageElements.TXT_PASSWORD).type(c.STUDENT7_PASSWORD);
    cy.get(signupPageElements.TXT_CONFIRM_PASSWORD).type("different password than above");
    cy.get(signupPageElements.LBL_ERROR_CONFIRM_PASSWORD).should('have.text', 'Passwords do not match');
    cy.get(signupPageElements.BTN_SUBMIT_BUTTON).should('be.disabled');

    cy.get(signupPageElements.TXT_CONFIRM_PASSWORD).click().clear().type(c.STUDENT7_PASSWORD);
    cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();

    cy.get(signupPageElements.TXT_CLASS_WORD).type("invalid class word");
    cy.get(signupPageElements.LBL_INVALID_WORD_ERROR).should('have.text', 'You must enter a valid class word');
    cy.get(signupPageElements.TXT_CLASS_WORD).clear();
    // cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();
    // cy.get(signupPageElements.LBL_INVALID_WORD_ERROR).should('have.text', 'Unknown class word');

		cy.get('body').click('topLeft'); // Clicks top-left corner to close the modal
  });

});
