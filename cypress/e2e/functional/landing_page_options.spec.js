import * as c from '../../support/constants.js'
import landingPageElements from '../../support/elements/landing_page_elements.js'
import signinPageElements from '../../support/elements/signin_page_elements.js'
import signupPageElements from '../../support/elements/signup_page_elements.js'

// Note for db tracking : No db tracking required, using existing records

context("Verify landing page options", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.logout();
  });

  it("should verify buttons are visible", () => {
    cy.get(landingPageElements.COLLECTIONS_LINK).should("be.visible"); // Check Collections link is visible in landing page
    cy.get(landingPageElements.ABOUT_LINK).should("be.visible"); // Check About link is visible in landing page
    cy.get(landingPageElements.REGISTER_BUTTON).should("be.visible"); // Check Register button is visible in landing page
    cy.get(landingPageElements.LOGIN_BUTTON).should("be.visible"); // Check Login button is visible in landing page
  });

  it("should verify the login modal", () => {
    cy.get(landingPageElements.LOGIN_BUTTON).click(); // Click Login button in landing page
    cy.get(signinPageElements.FORM).should("be.visible"); // Check Signin Form is visible
    cy.get(signinPageElements.USERNAME_FIELD).should("be.visible"); // Check Username field is visible in Signin Form
    cy.get(signinPageElements.PASSWORD_FIELD).should("be.visible"); // Check Password field is visible in Signin Form
    cy.get(signinPageElements.FORGOT_LINK).should("be.visible"); // Check Forgot password link is visible in Signin Form
    cy.get(signinPageElements.LOGIN_BUTTON).should("be.visible"); // Check Login button is visible in Signin Form
    cy.get('body').click('topLeft'); // Clicks in the top-left corner to dismiss modal
    cy.get('#login-default-modal').should('have.css', 'display', 'none'); // Check Signin Form modal is not visible anymore
  });

  it("should verify the Sign up modal", () => {
    cy.get(landingPageElements.LOGIN_BUTTON).click(); // Click Login button in landing page
    cy.get(signinPageElements.SIGNUP_LINK).click(); // Click Signup link in the Signin Form
    cy.get(signupPageElements.CONTENT).should("be.visible"); // Check Signup Form is visible
    cy.get(signupPageElements.TEACHER_LINK).should("be.visible"); // Check 'Teacher' registration link is visible in the Signup Form
    cy.get(signupPageElements.STUDENT_LINK).should("be.visible"); // Check 'Student' registration link is visible in the Signup Form
    cy.get(signupPageElements.LOGIN_LINK).should("be.visible"); // Check Login link is visible in the Signup Form
    cy.get('body').click('topLeft'); // Clicks in the top-left corner to dismiss modal
    cy.get('#signup-default-modal').should('have.css', 'display', 'none'); // Check Sign up form modal is not visible anymore
  });

  it("should verify Register modal", () => {
    cy.get(landingPageElements.REGISTER_BUTTON).click(); // Click Register button in landing page
    cy.get(signupPageElements.CONTENT).should("be.visible"); // Check Signup Form is visible
    cy.get(signupPageElements.TEACHER_LINK).should("be.visible"); // Check 'Teacher' registration link is visible in the Signup Form
    cy.get(signupPageElements.STUDENT_LINK).should("be.visible"); // Check 'Student' registration link is visible in the Signup Form
    cy.get(signupPageElements.LOGIN_LINK).click(); // Click Login link in the Signup Form
    cy.get(signinPageElements.FORM).should("be.visible"); // Check Signin link is visible
    cy.get(signinPageElements.USERNAME_FIELD).should("be.visible"); // Check Username field is visible in Signin Form
    cy.get(signinPageElements.PASSWORD_FIELD).should("be.visible"); // Check Password field is visible in Signin Form
    cy.get(signinPageElements.FORGOT_LINK).should("be.visible"); // Check Forgot password link is visible in Signin Form
    cy.get(signinPageElements.LOGIN_BUTTON).should("be.visible"); // Check Login button is visible in Signin Form
    cy.get(signinPageElements.SIGNUP_LINK).should("be.visible"); // Check Signup link is visible in Signin modal
    cy.get('body').click('topLeft'); // Clicks in the top-left corner to dismiss modal
    cy.get('#signup-default-modal').should('have.css', 'display', 'none'); // Check Sign up form modal is not visible anymore
  });
});
