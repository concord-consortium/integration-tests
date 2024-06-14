import * as c from '../../support/constants.js'
import {ResearcherClassesElements as researchClasses} from "../../support/elements/researcher_anonymous_classes_elements.js";

context("Researcher Anonymous View Class Dashboard", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD); // Login as researcher user
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/portal/offerings/335/external_report/1?researcher=true');
  });

  after(function() {
    cy.clearAllCookies();
  });

  it("Verify researcher class dashboard landing page", () => {
    cy.log("Verify progress dashboard");
    researchClasses.verifyResearcherHeader();
    researchClasses.verifyAnonymizeStudentsToggleNotDisplayed();
    researchClasses.verifyStudentNameInProgressDashboard();

    cy.log("Verify feedback report");
    researchClasses.clickFeedbackReport();
    researchClasses.verifyResearcherHeader();
    researchClasses.verifyAnonymizeStudentsToggleNotDisplayed();
    researchClasses.verifyStudentNameInFeedbackReport();
    researchClasses.verifyFeedbackSettingToggleIsNotClickable();
    researchClasses.verifyFeedbackTextAreaDisabled();
    researchClasses.verifyFeedbackScoreNotDisplayed();
  });
});

context("Researcher Anonymous View Glossary Dashboard", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD); // Login as researcher user
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/portal/offerings/335/external_report/6?researcher=true');
  });

  after(function() {
    cy.clearAllCookies();
  });

  it("Verify researcher glossary dashboard landing page", () => {
    cy.log("Verify glossary dashboard");
    researchClasses.verifyStudentName();
    researchClasses.verifyLanguageSelectorButton();
    researchClasses.clickLanguageSelectorButton();
    researchClasses.verifyStudentNameInLangTable();
    researchClasses.verifyRadioButtonDisabled();
    researchClasses.verifyScaffoldedQuestionDisabled();
  });
});