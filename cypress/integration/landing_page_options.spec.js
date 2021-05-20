import constants from '../support/constants.js'
import landingPageElements from '../support/elements/landing_page_elements.js'
import signinPageElements from '../support/elements/signin_page_elements.js'
import signupPageElements from '../support/elements/signup_page_elements.js'

context("Verify landing page options", () => {

  before(function() {
    cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  });

  it("Verify buttons are visible", () => {
    cy.get(landingPageElements.COLLECTIONS_LINK.selector).should("be.visible"); // Check Collections link is visible in landing page
    cy.get(landingPageElements.ABOUT_LINK.selector).should("be.visible"); // Check About link is visible in landing page
    cy.get(landingPageElements.REGISTER_BUTTON.selector).should("be.visible"); // Check Register button is visible in landing page
    cy.get(landingPageElements.LOGIN_BUTTON.selector).should("be.visible"); // Check Login button is visible in landing page
  });

  it("Verify the login modal", () => {
    cy.get(landingPageElements.LOGIN_BUTTON.selector).click(); // Click Login button in landing page
    cy.get(signinPageElements.FORM.selector).should("be.visible"); // Check Signin Form is visible
    cy.get(signinPageElements.USERNAME_FIELD.selector).should("be.visible"); // Check Username field is visible in Signin Form
    cy.get(signinPageElements.PASSWORD_FIELD.selector).should("be.visible"); // Check Password field is visible in Signin Form
    cy.get(signinPageElements.FORGOT_LINK.selector).should("be.visible"); // Check Forgot password link is visible in Signin Form
    cy.get(signinPageElements.LOGIN_BUTTON.selector).should("be.visible"); // Check Login button is visible in Signin Form
    cy.get(signinPageElements.CLOSE_BUTTON.selector).click(); // Click Close button of the Signin modal
    cy.get(signinPageElements.FORM.selector).should("not.be.visible"); // Check Signin Form is not visible anymore
  });

  it("Verify Sign up modal", () => {
    cy.get(landingPageElements.LOGIN_BUTTON.selector).click(); // Click Login button in landing page
    cy.get(signinPageElements.SIGNUP_LINK.selector).click(); // Click Signup link in the Signin Form
    cy.get(signupPageElements.CONTENT.selector).should("be.visible"); // Check Signup Form is visible
    cy.get(signupPageElements.TEACHER_LINK.selector).should("be.visible"); // Check 'Teacher' registration link is visible in the Signup Form
    cy.get(signupPageElements.STUDENT_LINK.selector).should("be.visible"); // Check 'Student' registration link is visible in the Signup Form
    cy.get(signupPageElements.LOGIN_LINK.selector).should("be.visible"); // Check Login link is visible in the Signup Form
    cy.get(signupPageElements.CLOSE_BUTTON.selector).click(); // Click Close button of the Signup modal
    cy.get(signupPageElements.CONTENT.selector).should("not.be.visible"); // Check Signup Form is not visible anymore
  });

  it("Verify Register modal", () => {
    cy.get(landingPageElements.REGISTER_BUTTON.selector).click(); // Click Register button in landing page
    cy.get(signupPageElements.CONTENT.selector).should("be.visible"); // Check Signup Form is visible
    cy.get(signupPageElements.TEACHER_LINK.selector).should("be.visible"); // Check 'Teacher' registration link is visible in the Signup Form
    cy.get(signupPageElements.STUDENT_LINK.selector).should("be.visible"); // Check 'Student' registration link is visible in the Signup Form
    cy.get(signupPageElements.LOGIN_LINK.selector).click(); // Click Login link in the Signup Form
    cy.get(signinPageElements.FORM.selector).should("be.visible"); // Check Signin link is visible
    cy.get(signinPageElements.USERNAME_FIELD.selector).should("be.visible"); // Check Username field is visible in Signin Form
    cy.get(signinPageElements.PASSWORD_FIELD.selector).should("be.visible"); // Check Password field is visible in Signin Form
    cy.get(signinPageElements.FORGOT_LINK.selector).should("be.visible"); // Check Forgot password link is visible in Signin Form
    cy.get(signinPageElements.LOGIN_BUTTON.selector).should("be.visible"); // Check Login button is visible in Signin Form
    cy.get(signinPageElements.SIGNUP_LINK.selector).should("be.visible"); // Check Signup link is visible in Signin modal
    cy.get(signinPageElements.CLOSE_BUTTON_II.selector).click(); // Click Close button of the Signin modal
    cy.get(signinPageElements.FORM.selector).should("not.be.visible"); // Check Signin Form is not visible anymore
    cy.get(signupPageElements.CONTENT.selector).should("not.be.visible"); // Check Signup Form is not visible anymore
  });
});
