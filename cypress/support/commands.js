// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Define the command
import landingPageElements from './elements/landing_page_elements.js'
import signinPageElements from './elements/signin_page_elements.js'
import flashNoticePageElements from './elements/flash_notice_page_elements.js'
import laraPageElements from './elements/lara_page_elements.js'
import constants from './constants.js'
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command"

addMatchImageSnapshotCommand({
  customDiffDir: "cypress/snapshots-diff",
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: "percent", // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: "viewport" // capture viewport in screenshot
});


// LEARN Portal Login Form
Cypress.Commands.add('login', (username, password) => {
  cy.reload();
  cy.get(landingPageElements.LOGIN_BUTTON_HEADER).then(($header) => {
    if($header.find(landingPageElements.LOGOUT_BUTTON).length > 0) {
      cy.get(landingPageElements.LOGOUT_BUTTON).click();
    }
    cy.log("Logging in as user : " + username);
    // Try to click the login button with force to handle potential modal coverage
    cy.get(landingPageElements.LOGIN_BUTTON).click({force: true});
    cy.get(signinPageElements.USERNAME_FIELD).should('not.be.disabled');
    cy.get(signinPageElements.USERNAME_FIELD).click().clear().type(username);
    cy.get(signinPageElements.PASSWORD_FIELD).should('not.be.disabled');
    cy.get(signinPageElements.PASSWORD_FIELD).click().clear().type(password, { log: false });
    cy.get(signinPageElements.LOGIN_BUTTON).click();
    cy.wait(1000);
    cy.get(landingPageElements.LOGOUT_BUTTON).should("have.text", "Log Out");
  });
});

Cypress.Commands.add('loginFailed', (username, password) => {
  cy.get(landingPageElements.LOGIN_BUTTON_HEADER).then(($header) => {
    if($header.find(landingPageElements.LOGOUT_BUTTON).length > 0) {
      cy.get(landingPageElements.LOGOUT_BUTTON).click();
    }
    cy.log("Logging in as user : " + username);
    // Try to click the login button with force to handle potential modal coverage
    cy.get(landingPageElements.LOGIN_BUTTON).click({force: true});
    cy.get(signinPageElements.USERNAME_FIELD).should('not.be.disabled');
    cy.get(signinPageElements.USERNAME_FIELD).click().clear().type(username);
    cy.get(signinPageElements.PASSWORD_FIELD).should('not.be.disabled');
    cy.get(signinPageElements.PASSWORD_FIELD).click().clear().type(password, { log: false });
    cy.get(signinPageElements.LOGIN_BUTTON).click();
    cy.wait(1000);
  });
});

// LEARN Portal Login Page
Cypress.Commands.add('loginPortal', (username, password) => {
  cy.log("Logging in as user : " + username);
  cy.get(signinPageElements.USERNAME_FIELD_SIGNIN_PAGE).type(username);
  cy.get(signinPageElements.PASSWORD_FIELD_SIGNIN_PAGE).type(password, { log: false });
  cy.get(signinPageElements.SUBMIT_BUTTON_SIGNIN_PAGE).click();
});

Cypress.Commands.add('retryLogin', (username, password) => {
  cy.log("Logging in as user : " + username);
  cy.get(signinPageElements.USERNAME_FIELD).should('not.be.disabled');
  cy.get(signinPageElements.USERNAME_FIELD).click().clear().type(username);
  cy.get(signinPageElements.PASSWORD_FIELD).should('not.be.disabled');
  cy.get(signinPageElements.PASSWORD_FIELD).click().clear().type(password, { log: false });
  cy.get(signinPageElements.LOGIN_BUTTON).click();
  cy.contains(flashNoticePageElements.BANNER, "Signed in successfully.");
});

Cypress.Commands.add('logout', () => {
  cy.get(landingPageElements.LOGIN_BUTTON_HEADER).then(($header) => {
    if($header.find(landingPageElements.LOGOUT_BUTTON).length > 0) {
      cy.log("Logout");
      // Try to click the logout button with force to handle potential modal coverage
      cy.get(landingPageElements.LOGOUT_BUTTON).click({force: true});
      cy.wait(1000);
      cy.get(landingPageElements.LOGIN_BUTTON).should("have.text", "Log In");
    } else {
      cy.log("Already logged out or logout button not found");
    }
  });
});

Cypress.Commands.add('alert', (message) => {
  cy.log("Verify browser window:alert");
  cy.on('window:alert', alertText => {
    expect(alertText).to.eql(message);
  });
});

Cypress.Commands.add('confirm', (message) => {
  cy.log("Accept browser window:confirm");
  cy.on('window:confirm', confirmText => {
    expect(confirmText).to.eql(message);
  });
});

Cypress.Commands.add('setTinyMceContent', (tinyMceId, content) => {
  cy.log("Setting text into TinyMceEditor");
  cy.window().then((win) => {
    const editor = win.tinymce.editors[tinyMceId];
    editor.setContent(content);
  });
});

Cypress.Commands.add('getTinyMceContent', (tinyMceId) => {
  cy.log("Getting text from TinyMceEditor");
  cy.window().then((win) => {
    const editor = win.tinymce.editors[tinyMceId];
    return editor.getContent();
  });
});

// LARA Authoring
Cypress.Commands.add("loginLARA", (username, password) => {
  cy.log("Logging in as user : " + username);
  cy.get(laraPageElements.USERNAME_FIELD).type(username);
  cy.get(laraPageElements.PASSWORD_FIELD).type(password, { log: false });
  cy.get(laraPageElements.LOGIN_BUTTON).click();
});

// LARA Authoring SSO
Cypress.Commands.add("loginLARAWithSSO", (username, password) => {
  cy.log("Logging in as user : " + username);
  cy.get(laraPageElements.LOGIN_LINK).click();
  cy.get(laraPageElements.LOGIN_SESSION_LINK).contains('Log in via ' + constants.LARA_PORTAL_ENV).click();
  cy.loginPortal(username, password);
});

Cypress.Commands.add("logoutLARA", () => {
  cy.log("Logging out of LARA");
  cy.get(laraPageElements.LOGOUT_LINK).click();
});
