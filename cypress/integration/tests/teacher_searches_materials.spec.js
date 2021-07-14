import * as c from '../../support/constants.js'
import * as adminHelper from "../../support/helpers/adminHelper"
import * as teacherHelper from "../../support/helpers/teacherHelper"
import { uid } from 'uid';
import adminAuthoringPageElements from "../../support/elements/admin_authoring_page_elements"
import searchAssignmentsPage from "../../support/elements/search_assignments_page"
import browseMaterialsPageElements from "../../support/elements/browse_materials_page_elements"
import assignPageElements from "../../support/elements/assign_page_elements"
import teacherHomePageElements from "../../support/elements/teacher_home_page_elements";

// Note for db tracking : This test adds a class at the start and then archives it at the end

const ACTIVITY1 = 'Cypress Test Activity 1 ' + uid();
const ACTIVITY2 = 'Cypress Test Activity 2 ' + uid();
const CLASS_WORD1 = uid();
const CLASS_NAME1 = 'Class ' + CLASS_WORD1;
const CLASS_WORD2 = uid();
const CLASS_NAME2 = 'Class ' + CLASS_WORD2;

context("Verify admin can filter instructional materials", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  });

  after(function() {
    cy.logout();
  });

  it("Verify admin can create activity1 and activity2", () => {
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
    adminHelper.openAuthoringAdminSection();
    adminHelper.createExternalActivity1(ACTIVITY1, adminAuthoringPageElements.GRADE_LEVEL_5, adminAuthoringPageElements.SUBJECT_AREAS_MATH);
    cy.get(teacherHomePageElements.BTN_MY_CLASSES).click();
      adminHelper.openAuthoringAdminSection();
      adminHelper.createExternalActivity2(ACTIVITY2, adminAuthoringPageElements.SENSOR_TEMPERATURE);
      cy.logout();
  });

  it("Verify search filter for activity 1", () => {
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
    adminHelper.openSearchMaterialsPage();
    cy.get(searchAssignmentsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(searchAssignmentsPage.BTN_GO).click();

    cy.get(searchAssignmentsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY1).should('exist');
    cy.get(searchAssignmentsPage.ACTIVITIES_LIST).get('[data-material_name=\"'+ ACTIVITY1 + '\"]').contains('Assign or Share').click();
    cy.get(assignPageElements.ASSIGN_TEXT).contains("Select the class(es) you want to assign this resource to below.").should('exist');
    cy.get(assignPageElements.CLASSES_HEADER).contains("Your Classes").should('exist');
    cy.get(assignPageElements.CANCEL_BUTTON).click();
    cy.get(searchAssignmentsPage.ACTIVITIES_LIST).get('[data-material_name=\"'+ ACTIVITY1 + '\"]').find(searchAssignmentsPage.ACTIVITY_LINK).click();
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
    cy.get(searchAssignmentsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(searchAssignmentsPage.BTN_GO).click();
    cy.get(searchAssignmentsPage.ACTIVITIES_LIST).get('[data-material_name=\"'+ ACTIVITY1 + '\"]').contains('Assign or Share').click();
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME1).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME2).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.get(assignPageElements.SAVE_BUTTON).click();
    cy.get(assignPageElements.CONFIRM_DIALOG_OK).click();
  });

  it("Verify teacher is able to assign activity2 to class1", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(searchAssignmentsPage.TXT_SEARCH_BAR).type(ACTIVITY2);
    cy.get(searchAssignmentsPage.BTN_GO).click();
    cy.get(searchAssignmentsPage.ACTIVITIES_LIST).get('[data-material_name=\"'+ ACTIVITY2 + '\"]').contains('Assign or Share').click();
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME1).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.get(assignPageElements.SAVE_BUTTON).click();
    cy.get(assignPageElements.CONFIRM_DIALOG_OK).click();
  });

  it("Verify teacher is able to see classes assigned for activities in search page", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(searchAssignmentsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(searchAssignmentsPage.BTN_GO).click();
    cy.contains(searchAssignmentsPage.ACTIVITY_SEARCH_RESULT, ACTIVITY1).contains(searchAssignmentsPage.ASSIGNED_TO, "(Assigned to " + CLASS_NAME1 + ", "
      + CLASS_NAME2 + ")").should('exist');
    cy.contains(searchAssignmentsPage.ACTIVITY_SEARCH_RESULT, ACTIVITY1).contains(searchAssignmentsPage.MATERIAL_BODY, "Used in 2 classes.").should('exist');
    adminHelper.openSearchMaterialsPage();
    cy.get(searchAssignmentsPage.TXT_SEARCH_BAR).type(ACTIVITY2);
    cy.get(searchAssignmentsPage.BTN_GO).click();
    cy.contains(searchAssignmentsPage.ACTIVITY_SEARCH_RESULT, ACTIVITY2).contains(searchAssignmentsPage.ASSIGNED_TO, "(Assigned to " + CLASS_NAME1 + ")").should('exist');
    cy.contains(searchAssignmentsPage.ACTIVITY_SEARCH_RESULT, ACTIVITY2).contains(searchAssignmentsPage.MATERIAL_BODY, "Used in 1 class.").should('exist');
  });
});
