import * as c from '../../support/constants.js'
import * as adminHelper from "../../support/helpers/adminHelper"
import * as teacherHelper from "../../support/helpers/teacherHelper"
import { uid } from 'uid';
import adminAuthoringPageElements from "../../support/elements/admin_authoring_page_elements"
import advancedSearchMaterialsPage from "../../support/elements/advanced_search_materials_page"
import assignPageElements from "../../support/elements/assign_page_elements"
import teacherHomePageElements from "../../support/elements/teacher_home_page_elements";
import landingpageSearchMaterialsPage from "../../support/elements/landingpage_search_materials_elements"

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

  function clearCookies() {
		cy.clearAllCookies();
	};

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
    cy.logout();
    clearCookies();
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
    cy.visit(c.LEARN_PORTAL_BASE_URL);cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type(ACTIVITY1 + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.SUBJECT_MATHEMATICS).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).should('exist');
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).contains('Assign or Share').click();
      });
    });
    cy.get(assignPageElements.ASSIGN_TEXT).contains("Select the class(es) you want to assign this resource to below.").should('exist');
    cy.get(assignPageElements.CLASSES_HEADER).contains("Your Classes").should('exist');
    cy.get(assignPageElements.CANCEL_BUTTON).click();
  });

  it("Verify teacher is able to add two classes", () => {
    cy.get(teacherHomePageElements.BTN_MY_CLASSES).click();
    teacherHelper.addClass(CLASS_NAME1, c.CLASS_DESC, CLASS_WORD1);
    teacherHelper.addClass(CLASS_NAME2, c.CLASS_DESC, CLASS_WORD2);
  });

  it("Verify teacher is able to assign activity1 to class1 and class2", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type(ACTIVITY1 + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.SUBJECT_MATHEMATICS).click({force: true}).then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).should('exist');
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).contains('Assign or Share').click({force: true});
      });
    });
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME1).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME2).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.get(assignPageElements.SAVE_BUTTON).click();
    cy.get(assignPageElements.CONFIRM_DIALOG_OK).click();
  });

  it("Verify teacher is able to assign activity2 to class1", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type(ACTIVITY2 + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.SUBJECT_PHYSICS).click({force: true}).then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).should('exist');
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).contains('Assign or Share').click({force: true});
      });
    });
    cy.contains(assignPageElements.CLASS_NAME, CLASS_NAME1).find(assignPageElements.CLASS_CHECKBOX).click();
    cy.get(assignPageElements.SAVE_BUTTON).click();
    cy.get(assignPageElements.CONFIRM_DIALOG_OK).click();
  });

  it("Verify teacher is able to see classes assigned for activities in search page", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type(ACTIVITY1 + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.SUBJECT_MATHEMATICS).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).then(() => {
          cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).contains("Assigned to ").should('exist');
        });
      });
    });
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type(ACTIVITY2 + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.SUBJECT_PHYSICS).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).then(() => {
          cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).contains("Assigned to ").should('exist');
        });
      });
    });
  });
});
