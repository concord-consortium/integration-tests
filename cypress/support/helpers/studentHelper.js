import registerAddNewStudentPageElements from "../elements/register_add_student_page_elements";

export function registerStudent(username, firstName, lastName, password, classWord){
    cy.get(registerAddNewStudentPageElements.BTN_REGISTER_USER).click();
    cy.get(registerAddNewStudentPageElements.BTN_I_AM_STUDENT).click();
    cy.get(registerAddNewStudentPageElements.TXT_FIRST_NAME).type(firstName);
    cy.get(registerAddNewStudentPageElements.TXT_LAST_NAME).type(lastName);
    cy.get(registerAddNewStudentPageElements.TXT_PASSWORD).type(password);
    cy.get(registerAddNewStudentPageElements.TXT_CONFIRM_PASSWORD).type(password);
    cy.get(registerAddNewStudentPageElements.BTN_SUBMIT_BUTTON).click();
    cy.get(registerAddNewStudentPageElements.TXT_CLASS_WORD).type(classWord);
    cy.get(registerAddNewStudentPageElements.BTN_SUBMIT_BUTTON).click();
    cy.contains(registerAddNewStudentPageElements.LBL_SIGNUP_SUCCESS, 'Success! your username is '+username);
    cy.retryLogin(username, password);
    cy.logout();
}