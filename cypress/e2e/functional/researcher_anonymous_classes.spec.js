import * as c from '../../support/constants.js'
import * as researchClassesHelper from "../../support/helpers/researcherClassesHelper.js"
import {ResearcherClassesElements as researchClasses} from "../../support/elements/researcher_anonymous_classes_elements";

context("Researcher classes side bar, filters, results table", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER3_USERNAME, c.TEACHER3_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
    cy.clearAllCookies();
  });

  it("should verify research classes landing page", () => {
    cy.log("should verify research project in sidebar");
    researchClassesHelper.expandResearchProjects(); 
    researchClassesHelper.getResearchProjectsOpen().should("exist");

    cy.log("should verify landing page")
    researchClassesHelper.verifyProjectsDisplayed();
    researchClassesHelper.clickProject();
    researchClassesHelper.getResearchClassLandingPage().should("exist");
    researchClasses.getHeader().contains("Research Classes: Cypress Test Project For Researcher");
    researchClasses.verifyDropDownHeader("Cohorts");
    researchClasses.verifyDropDownHeader("Teachers");
    researchClasses.verifyDropDownHeader("Resources");
    researchClasses.getRemoveConcordConsortiumTeachersCheckbox().should("exist");
    researchClasses.verifyCheckboxText();
    researchClasses.verifyFooterNoteText();
  });
  it("should verify research classes dropdown", () => {
    researchClasses.clickDropDown("Cohorts");
    researchClasses.getCohortsDropDown().should("not.contain", "Test Project: Test Cohort");
    researchClasses.getCohortsDropDown().contains("Cypress Test Project For Researcher: Test Cohort");
    researchClasses.clickDropDown("Teachers");
    researchClasses.getTeachersDropDown().contains("Cypress AutomationTeacher1 (cautomationTeacher1)");
    researchClasses.clickDropDown("Resources");
    researchClasses.getResourcesDropDown().contains("AKSims Snapshot Test Activity");
  });
  it("should verify remove concord consortium teachers checkbox", () => {
    researchClasses.clickDropDown("Teachers");
    researchClasses.getTeachersDropDown().contains("Sara Researcher (sara_researcher)");
    researchClasses.getRemoveConcordConsortiumTeachersCheckbox().click({ force: true });
    researchClasses.clickDropDown("Teachers");
    researchClasses.getTeachersDropDown().should("not.contain", "Sara Researcher (sara_researcher)");
  });
  it("should verify results table", () => {
    researchClasses.getResultsTable().should("not.exist");
    researchClasses.clickDropDown("Cohorts");
    researchClasses.getCohortsDropDown().contains("Cypress Test Project For Researcher: Test Cohort").click({ force: true });
    researchClasses.getResultsTable().should("exist");
    researchClasses.verifyResultsLabel();
    researchClasses.getShowSchoolNameCheckbox().parent().contains("Show School Name");
    researchClasses.verifyResultsTableHeader();
    researchClasses.verifyViewClassLink();
    researchClasses.verifyResultsTableHeaderSortIcon("Cohort");
    researchClasses.verifyResultsTableHeaderSortIcon("Teacher");
    researchClasses.verifyResultsTableHeaderSortIcon("Class");
    researchClasses.getShowSchoolNameCheckbox().click({ force: true });
    researchClasses.getResultsTableSchoolColumn().should("contain", "School");
    researchClasses.verifySchoolColumnSortIcon();
    researchClasses.verifyConcordConsortiumSchoolNameNotDisplayed();
    researchClasses.getRemoveConcordConsortiumTeachersCheckbox().click({ force: true });
    researchClasses.verifyConcordConsortiumSchoolNameDisplayed();
  });
  it("should verify sorting results table", () => {
    researchClasses.clickSortIcon(0);
    researchClasses.verifyFirstRowOfSort(0, "Test Cohort");
    researchClasses.clickSortIcon(0);
    researchClasses.verifyFirstRowOfSort(0, "Test Cohort, Test Cohort For Researcher");
    researchClasses.clickSortIcon(1);
    researchClasses.verifyFirstRowOfSort(1, "Cypress AutomationTeacher1");
    researchClasses.clickSortIcon(1);
    researchClasses.verifyFirstRowOfSort(1, "Teacher School");
    researchClasses.clickSortIcon(3);
    researchClasses.verifyFirstRowOfSort(3, "Concord Consortium");
    researchClasses.clickSortIcon(3);
    researchClasses.verifyFirstRowOfSort(3, "Test School");
  });
  it("should verify Reset All button", () => {
    researchClasses.getResetAllButton().should("exist");
    researchClasses.getResetAllButton().should("contain", "Reset All");
    researchClasses.verifySummary();
    researchClasses.getResetAllButton().click({ force: true });
    researchClasses.verifySummaryNotDisplayed();
    researchClasses.getResultsTable().should("not.exist");
  });
});

context("Researcher classes landing page", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER3_USERNAME, c.TEACHER3_PASSWORD); // Login as teacher user
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/portal/classes/228/materials?researcher=true');
  });

  after(function() {
    cy.logout();
    cy.clearAllCookies();
  });

  it("should verify research project in sidebar", () => {
    researchClasses.getAssignmentPage().should("exist");
    researchClasses.verifyHeader();
    researchClasses.getOfferingsTable().should("exist");
    researchClasses.verifySortIconNotDisplayed();
    researchClasses.verifyActiveCheckboxDisabled();
    researchClasses.verifyLockedCheckboxDisabled();
    researchClasses.clickShowDetails();
    researchClasses.verifyOfferingButtons();
    researchClasses.verifyAnonymousStudentName();
  });
});

context("Project Expiration Date", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher user
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/users/76/limited_edit');
  });

  after(function() {
    cy.logout();
    cy.clearAllCookies();
  });

  it("should verify project expiration date", () => {
    researchClasses.getResearcherProjectCheckbox().click({ force: true });
    researchClasses.verifyDateInputNotShown();
    researchClasses.getResearcherProjectCheckbox().click({ force: true });
    researchClasses.verifyDateInputShown();
    researchClasses.getResearcherProjectDateInput().click({ force: true }).type("2024-04-01");
    researchClasses.getSaveButton().click({ force: true });;
    researchClassesHelper.expandResearchProjects(); 
    researchClassesHelper.getResearchProjectsOpen().should("exist");
    researchClassesHelper.verifyProjectsNotDisplayed();
    cy.visit(c.LEARN_PORTAL_BASE_URL + '/users/76/limited_edit');
    researchClasses.getResearcherProjectDateInput().click({ force: true }).clear();
    researchClasses.getSaveButton().click({ force: true });;
    researchClassesHelper.expandResearchProjects();   
    researchClassesHelper.getResearchProjectsOpen().should("exist");
    researchClassesHelper.verifyProjectsDisplayed();
  });
});