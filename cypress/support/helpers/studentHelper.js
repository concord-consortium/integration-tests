import signup_page_elements from "../elements/signup_page_elements";

export function registerStudent(username, firstName, lastName, password, classWord){
    cy.get(signup_page_elements.BTN_REGISTER_USER).click();
    cy.get(signup_page_elements.BTN_I_AM_STUDENT).click();
    cy.get(signup_page_elements.TXT_FIRST_NAME).type(firstName);
    cy.get(signup_page_elements.TXT_LAST_NAME).type(lastName);
    cy.get(signup_page_elements.TXT_PASSWORD).type(password);
    cy.get(signup_page_elements.TXT_CONFIRM_PASSWORD).type(password);
    cy.get(signup_page_elements.BTN_SUBMIT_BUTTON).click();
    cy.get(signup_page_elements.TXT_CLASS_WORD).type(classWord);
    cy.get(signup_page_elements.BTN_SUBMIT_BUTTON).click();
    cy.contains(signup_page_elements.LBL_SIGNUP_SUCCESS, 'Success! your username is '+username);
    cy.retryLogin(username, password);
    cy.logout();
}