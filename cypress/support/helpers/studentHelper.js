import signupPageElements from "../elements/signup_page_elements";
import studentRosterPageElements from "../elements/student_roster_page_elements";
import studentHomePageElements from "../elements/student_home_page_elements";

export function checkClassNameAppears(className) {
  cy.contains(studentHomePageElements.LEFT_NAV_CLASS, className); // Check the current class is present in the student left nav
}

export function checkClassNameDoesNotExist(className) {
  cy.contains(studentHomePageElements.LEFT_NAV_CLASS, className).should("not.exist"); // Check the current class does not exist in the student left nav
}

export function registerStudent(username, firstName, lastName, password, classWord){
    cy.get(signupPageElements.BTN_REGISTER_USER).click();
    cy.get(signupPageElements.BTN_I_AM_STUDENT).click();
    cy.get(signupPageElements.TXT_FIRST_NAME).type(firstName);
    cy.get(signupPageElements.TXT_LAST_NAME).type(lastName);
    cy.get(signupPageElements.TXT_PASSWORD).type(password);
    cy.get(signupPageElements.TXT_CONFIRM_PASSWORD).type(password);
    cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();
    cy.get(signupPageElements.TXT_CLASS_WORD).type(classWord);
    cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();
    cy.contains(signupPageElements.LBL_SIGNUP_SUCCESS, 'Success! your username is '+username);
    cy.retryLogin(username, password);
    cy.logout();
}
