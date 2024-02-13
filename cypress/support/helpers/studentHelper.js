import signupPageElements from "../elements/signup_page_elements";
import studentHomePageElements from "../elements/student_home_page_elements";

export function checkClassNameAppears(className) {
  cy.get(studentHomePageElements.LEFT_NAV_CLASS).contains(className); // Check the current class is present in the student left nav
}

export function checkClassNameDoesNotExist(className) {
  cy.get(studentHomePageElements.LEFT_NAV_CLASS).contains(className).should("not.exist"); // Check the current class does not exist in the student left nav
}


export function verifyAssignmentExists(className, assignmentName){
    cy.contains(studentHomePageElements.LEFT_NAV_CLASS, className).click();
    cy.get(studentHomePageElements.ASSIGNMENT_SECTION).contains('span.name', assignmentName);
}


export function verifyNoOfferingsAvailable(className){
    cy.contains(studentHomePageElements.LEFT_NAV_CLASS, className).click();
    cy.contains(studentHomePageElements.NO_OFFERINGS_TEXT, 'No offerings available.');
}

export function registerStudent(username, firstName, lastName, password, classWord){
    cy.get(signupPageElements.BTN_REGISTER_USER).click();
    cy.get(signupPageElements.BTN_I_AM_STUDENT).click();
    cy.get(signupPageElements.TXT_FIRST_NAME).type(firstName);
    cy.get(signupPageElements.TXT_LAST_NAME).type(lastName);
    cy.get(signupPageElements.TXT_PASSWORD).type(password, { log: false });
    cy.get(signupPageElements.TXT_CONFIRM_PASSWORD).type(password, { log: false });
    cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();
    cy.get(signupPageElements.TXT_CLASS_WORD).type(classWord);
    cy.get(signupPageElements.BTN_SUBMIT_BUTTON).click();
    cy.get(signupPageElements.LBL_SIGNUP_SUCCESS).contains('Success! Your username is '+username);
    cy.retryLogin(username, password);
    cy.logout();
}

export function joinClass(classWord, teacherFullName){
    cy.get(studentHomePageElements.TXT_CLASS_WORD).type(classWord);
    cy.get(studentHomePageElements.BTN_SUBMIT_CLASS_WORD).click();
    let message = 'The teacher of this class is ' + teacherFullName + '. Is this the class you want to join?'
    cy.get(studentHomePageElements.LBL_JOIN_CLASS_MSG + ' p:nth-child(2)').should('include.text', message);
    cy.get(studentHomePageElements.LBL_JOIN_CLASS_MSG + ' p:nth-child(3)').should('include.text', 'Click \'Join\' to continue registering for this class.').click()
    cy.get(studentHomePageElements.BTN_JOIN_CLASS).click();
    cy.get(studentHomePageElements.BTN_JOINING_CLASS).should('not.exist');
}
