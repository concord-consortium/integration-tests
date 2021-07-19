import * as c from '../../support/constants.js'
import * as adminHelper from "../../support/helpers/adminHelper"
import * as teacherHelper from "../../support/helpers/teacherHelper"
import { uid } from 'uid';
import adminAuthoringPageElements from "../../support/elements/admin_authoring_page_elements"
import advancedSearchMaterialsPage from "../../support/elements/advanced_search_materials_page"
import browseMaterialsPageElements from "../../support/elements/browse_materials_page_elements"
import assignPageElements from "../../support/elements/assign_page_elements"
import teacherHomePageElements from "../../support/elements/teacher_home_page_elements";

// Note for db tracking : This test adds a class at the start and then archives it at the end

const ACTIVITY1 = 'Cypress Test grade 5 Math Activity';
const ACTIVITY2 = 'Cypress Test grade 7 Physics Activity';
const CLASS_WORD1 = uid();
const CLASS_NAME1 = 'Class ' + CLASS_WORD1;
const CLASS_WORD2 = uid();
const CLASS_NAME2 = 'Class ' + CLASS_WORD2;

context("Verify admin can filter instructional materials", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER5_USERNAME, c.TEACHER5_PASSWORD); // Login as teacher5 user
  });

  after(function() {
    cy.logout();
  });

  it("Verify admin can create activity1 if not already present", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).then(($activities) => {
      if($activities.find(advancedSearchMaterialsPage.MATERIAL_LIST_RESULT).length < 1) {
        adminHelper.openAuthoringAdminSection();
        adminHelper.createExternalActivity1(ACTIVITY1, adminAuthoringPageElements.GRADE_LEVEL_5, adminAuthoringPageElements.SUBJECT_AREAS_MATH);
      }
    });
  });

  it("Verify admin can create activity2 if not already present", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY2);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).then(($activities) => {
      if($activities.find(advancedSearchMaterialsPage.MATERIAL_LIST_RESULT).length < 1) {
        adminHelper.openAuthoringAdminSection();
        adminHelper.createExternalActivity1(ACTIVITY2, adminAuthoringPageElements.GRADE_LEVEL_7, adminAuthoringPageElements.SUBJECT_AREAS_PHYSICS);
      }
    });
  });

  it("Verify search filter for activity 1", () => {
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY1).should('exist');
    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).contains('[data-material_name=\"'+ ACTIVITY1 + '\"]').contains('Assign or Share').click();
    cy.get(assignPageElements.ASSIGN_TEXT).contains("Select the class(es) you want to assign this resource to below.").should('exist');
    cy.get(assignPageElements.CLASSES_HEADER).contains("Your Classes").should('exist');
    cy.get(assignPageElements.CANCEL_BUTTON).click();
    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).contains('[data-material_name=\"'+ ACTIVITY1 + '\"]').find(advancedSearchMaterialsPage.ACTIVITY_LINK).click();
    cy.url().should('include', '/browse/eresources/');
    cy.get(browseMaterialsPageElements.MATERIAL_TITLE).contains(ACTIVITY1).should('exist');
  });

  it("Verify teacher is able to add two classes", () => {
    cy.get(teacherHomePageElements.BTN_MY_CLASSES).click();
    teacherHelper.addClass(CLASS_NAME1, c.CLASS_DESC, CLASS_WORD1);
    teacherHelper.addClass(CLASS_NAME2, c.CLASS_DESC, CLASS_WORD2);
  });

  it("Verify teacher is able to assign activity1 to class1 and class2", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();
    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).contains('[data-material_name=\"'+ ACTIVITY1 + '\"]').contains('Assign or Share').click();
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME1).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME2).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.get(assignPageElements.SAVE_BUTTON).click();
    cy.get(assignPageElements.CONFIRM_DIALOG_OK).click();
  });

  it("Verify teacher is able to assign activity2 to class1", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY2);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();
    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).contains('[data-material_name=\"'+ ACTIVITY2 + '\"]').contains('Assign or Share').click();
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME1).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.get(assignPageElements.SAVE_BUTTON).click();
    cy.get(assignPageElements.CONFIRM_DIALOG_OK).click();
  });

  it("Verify teacher is able to see classes assigned for activities in search page", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();
    cy.contains(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT, ACTIVITY1).contains(advancedSearchMaterialsPage.ASSIGNED_TO, "(Assigned to ").should('exist');
    cy.contains(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT, ACTIVITY1).contains(advancedSearchMaterialsPage.MATERIAL_BODY, "Used in ").should('exist');
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY2);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();
    cy.contains(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT, ACTIVITY2).contains(advancedSearchMaterialsPage.ASSIGNED_TO, "(Assigned to ").should('exist');
    cy.contains(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT, ACTIVITY2).contains(advancedSearchMaterialsPage.MATERIAL_BODY, "Used in ").should('exist');
  });
});
