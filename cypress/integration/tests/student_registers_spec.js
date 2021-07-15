import * as c from "../../support/constants";
import signupPageElements from "../../support/elements/signup_page_elements";
import * as TeacherHelper from '../../support/helpers/teacherHelper';
import * as StudentHelper from '../../support/helpers/studentHelper';
import * as AdminHelper from '../../support/helpers/adminHelper';
import adminPageElements from "../../support/elements/admin_page_elements";

const TMP_USER_FIRSTNAME = 'Cypress';
const TMP_USER_LASTNAME = 'AutomationStudent6';
const TMP_USER_USERNAME = 'cautomationstudent6';
const TMP_USER_PASSWORD = 'password';

const CLASS_WORD = c.CLASS_WORD;
const CLASS_NAME = 'Class '+ CLASS_WORD;

context("Student registration tests", () => {

    before(function() {
        cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    });


    it("Verify class words are not case sensitive and spaces allowed", () => {
        cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
        let upperCaseClassWord = 'CASE SENSITIVE ' + CLASS_WORD;
        TeacherHelper.addClass(CLASS_NAME, c.CLASS_DESC, upperCaseClassWord);
        cy.logout();

        let lowerCaseClassWord = 'case sensitive ' + CLASS_WORD;

        //Register user with lower case class word.
        StudentHelper.registerStudent(TMP_USER_USERNAME, TMP_USER_FIRSTNAME, TMP_USER_LASTNAME, TMP_USER_PASSWORD, lowerCaseClassWord);

        //Now delete the registered user.
        cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
        cy.get(adminPageElements.LNK_ADMIN).click();
        cy.get(adminPageElements.USERS_LINK).click();
        AdminHelper.removeUser(TMP_USER_USERNAME, TMP_USER_FIRSTNAME + ' ' + TMP_USER_LASTNAME);
        cy.logout();
    });

    it("Register student - Error Scenarios", () => {
        cy.get(signupPageElements.BTN_REGISTER_USER).click();
        cy.get(signupPageElements.BTN_I_AM_STUDENT).click();
        //Verify submit button is disabled before the form is filled.
        cy.get(signupPageElements.BTN_SUBMIT_BUTTON).should('be.disabled');

        cy.get(signupPageElements.TXT_FIRST_NAME).type(TMP_USER_FIRSTNAME);
        cy.get(signupPageElements.TXT_LAST_NAME).type(TMP_USER_LASTNAME);
        cy.get(signupPageElements.BTN_SUBMIT_BUTTON).should('be.disabled');

        cy.get(signupPageElements.TXT_PASSWORD).type(TMP_USER_PASSWORD);
        cy.get(signupPageElements.TXT_CONFIRM_PASSWORD).type("different password than above");
        cy.get(signupPageElements.LBL_ERROR_CONFIRM_PASSWORD).should('have.text', 'Passwords do not match');
        cy.get(signupPageElements.BTN_SUBMIT_BUTTON).should('be.disabled');

        cy.get(signupPageElements.TXT_CONFIRM_PASSWORD).type('{selectall}{backspace}' + TMP_USER_PASSWORD);
        cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();

        cy.get(signupPageElements.TXT_CLASS_WORD).type("invalid class word");
        cy.get(signupPageElements.LBL_INVALID_WORD_ERROR).should('have.text', 'You must enter a valid class word');
        cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();
        cy.get(signupPageElements.LBL_INVALID_WORD_ERROR).should('have.text', 'Unknown class word');

        cy.get(signupPageElements.CLOSE_BUTTON).click();
    });

});
