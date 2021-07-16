import * as c from '../../support/constants.js'
import * as adminHelper from "../../support/helpers/adminHelper"
import adminAuthoringPageElements from "../../support/elements/admin_authoring_page_elements"
import landingpageSearchMaterialsPage from "../../support/elements/landingpage_search_materials_elements"

// Note for db tracking : This test adds a class at the start and then archives it at the end

const ACTIVITY1 = 'Cypress Test grade 5 Math Activity';
const ACTIVITY2 = 'Cypress Test grade 7 Physics Activity';

context("Verify admin can filter instructional materials", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER5_USERNAME, c.TEACHER5_PASSWORD); // Login as teacher5 user
  });

  after(function() {
    cy.logout();
  });

  it("Verify admin can create Grade 5 Math activity if not already present", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type(ACTIVITY1 + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.BTN_KEYWORDS_GO).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).then(($materialFindResult) => {
          if($materialFindResult.find(landingpageSearchMaterialsPage.MATERIAL_TEXT_NAME).length < 1) {
            adminHelper.openAuthoringAdminSection();
            adminHelper.createExternalActivity1(ACTIVITY1, adminAuthoringPageElements.GRADE_LEVEL_5, adminAuthoringPageElements.SUBJECT_AREAS_MATH);
          } else {
            cy.get($materialFindResult.find(landingpageSearchMaterialsPage.MATERIAL_TEXT_NAME)).scrollIntoView();
          }
        });
      });
    });
  });

  it("Verify admin can create Grade 7 Physics activity if not already present", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type(ACTIVITY2 + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.BTN_KEYWORDS_GO).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).then(($materialFindResult) => {
          if($materialFindResult.find(landingpageSearchMaterialsPage.MATERIAL_TEXT_NAME).length < 1) {
            adminHelper.openAuthoringAdminSection();
            adminHelper.createExternalActivity1(ACTIVITY2, adminAuthoringPageElements.GRADE_LEVEL_7, adminAuthoringPageElements.SUBJECT_AREAS_PHYSICS);
          } else {
            cy.get($materialFindResult.find(landingpageSearchMaterialsPage.MATERIAL_TEXT_NAME)).scrollIntoView();
          }
        });
      });
    });
  });

  it("Verify subject search filter for Math activity ", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type('Cypress Math' + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.SUBJECT_MATHEMATICS).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).should('exist');
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).should('not.exist');
      });
    });
  });

  it("Verify subject search filter for Physics activity", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type('Cypress Physics' + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.SUBJECT_PHYSICS).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).should('not.exist');
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).should('exist');
      });
    });
  });

  it("Verify grade search filter for Math activity ", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type('Cypress Math' + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.GRADE_ELEMENTARY).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).should('exist');
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).should('not.exist');
      });
    });
  });

  it("Verify grade search filter for Physics activity", () => {
    cy.visit(c.LEARN_PORTAL_BASE_URL);
    cy.get(landingpageSearchMaterialsPage.TXT_KEYWORDS_INPUT).type('Cypress Physics' + '{enter}').then(() => {
      cy.get(landingpageSearchMaterialsPage.GRADE_MIDDLESCHOOL).click().then(() => {
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY1).should('not.exist');
        cy.contains(landingpageSearchMaterialsPage.MATERIAL_FINDER_RESULT, ACTIVITY2).should('exist');
      });
    });
  });
});
