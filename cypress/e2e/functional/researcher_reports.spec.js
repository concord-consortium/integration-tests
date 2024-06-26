import * as c from '../../support/constants.js'
import {ResearcherReportsPageElements as researcherReport} from "../../support/elements/researcher_reports_page_elements.js";

context("Researcher reports UI", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/admin');
    cy.contains("Administration and Reports");
  });

  function logout() {
    cy.logout();
    cy.clearAllCookies();
  }

  it("Researcher Reports ", () => {
    cy.log("launch learner reports");
    cy.contains("Learner Reports").invoke("removeAttr", "target").click();
    cy.loginPortal(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
  
    cy.log("Verify research reports fields and label display");
    researcherReport.verifyUserName();
    researcherReport.verifyLogout();
    researcherReport.verifyFormHeader();
    researcherReport.verifyFilterResults();
    researcherReport.verifySearchFieldHeaders("Schools");
    researcherReport.verifySearchFieldHeaders("Teachers");
    researcherReport.verifySearchFieldHeaders("Resources");
    researcherReport.verifySearchFieldHeaders("Permission forms");
    researcherReport.getStartDate().should("exist");
    researcherReport.verifyStartDateLabel();
    researcherReport.getEndDate().should("exist");;
    researcherReport.verifyEndDateLabel();
    researcherReport.getHideNameCheckbox().should("exist");
    researcherReport.verifyHideNameCheckboxLabel();
    researcherReport.getHideNameCheckbox().should("not.be.checked");
    researcherReport.verifyDetailsReportButtonDisplayed();
    researcherReport.verifyLearnerLogButtonDisplayed();
    researcherReport.verifyLearnerLogExpandedButtonDisplayed();
    researcherReport.verifyUsageReportButtonDisplayed();

    cy.log("verify date filter is not remembered")
    researcherReport.getStartDate().click({ force: true }).type("2024-06-01");
    researcherReport.getLearnersFilterResult().should("contain", "6");
    researcherReport.getStartDate().click({ force: true }).type("2024-06-05");
    researcherReport.getLearnersFilterResult().should("contain", "4");

    cy.log("verify refine your search")
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/report/learner?redirecting_after_sign_in=1&queryLimit=10');
    researcherReport.clickInSearchField("Teachers");
    researcherReport.getTeachersField().should("exist");
    researcherReport.getTeachersField().should("contain", "Too many results. Please refine your search to narrow down the list.");
    researcherReport.getEndDate().click();
    researcherReport.clickInSearchField("Resources");
    researcherReport.getResourcesField().should("exist");
    researcherReport.getResourcesField().should("contain", "Too many results. Please refine your search to narrow down the list.");

    cy.log("verify search result")
    researcherReport.typeInSearchField("Teachers", "Dr.");
    researcherReport.getTeachersField().should("contain", "Dr. Sara Teacher1");
    researcherReport.getEndDate().click();
    researcherReport.typeInSearchField("Resources", 'Test Activity ? with "double" quote');
    researcherReport.getResourcesField().should("contain", 'Test Activity ? with "double" quote, dash-1, single');

    logout();

    cy.log("verify hide checkbox not displayed for researcher");
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD);
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/admin');
    cy.contains("Administration and Reports");
    cy.log("launch learner reports");
    cy.contains("Learner Reports").invoke("removeAttr", "target").click();
    cy.loginPortal(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD);
    researcherReport.getHideNameCheckbox().should("not.exist");

  });
})