import * as c from '../../support/constants.js'
import * as adminHelper from "../../support/helpers/adminHelper"
import adminAuthoringPageElements from "../../support/elements/admin_authoring_page_elements"
import advancedSearchMaterialsPage from "../../support/elements/advanced_search_materials_page"

// Note for db tracking : This test adds a class at the start and then archives it at the end

const ACTIVITY1 = 'Cypress Test grade 5 Math Activity';
const ACTIVITY2 = 'Cypress Test grade 7 Physics Activity';
const ACTIVITY3 = "Cypress Test Temperature Sensor Activity";
const ACTIVITY4 = "Cypress Test Force Sensor Activity";
const ACTIVITY5 = "Cypress Test No Sensor Activity";

context("Verify admin can filter instructional materials", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER5_USERNAME, c.TEACHER5_PASSWORD); // Login as teacher5 user
  });

  after(function() {
    cy.logout();
  });

  it("Verify admin can create Grade 5 Math activity if not already present", () => {
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

  it("Verify admin can create Grade 7 Physics activity if not already present", () => {
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

  it("Verify admin can create Temperature Sensor activity if not already present", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY3);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).then(($activities) => {
      if($activities.find(advancedSearchMaterialsPage.MATERIAL_LIST_RESULT).length < 1) {
        adminHelper.openAuthoringAdminSection();
        adminHelper.createExternalActivity2(ACTIVITY3, adminAuthoringPageElements.SENSOR_TEMPERATURE);
      }
    });
  });

  it("Verify admin can create Force Sensor activity if not already present", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY4);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).then(($activities) => {
      if($activities.find(advancedSearchMaterialsPage.MATERIAL_LIST_RESULT).length < 1) {
        adminHelper.openAuthoringAdminSection();
        adminHelper.createExternalActivity2(ACTIVITY4, adminAuthoringPageElements.SENSOR_FORCE);
      }
    });
  });

  it("Verify admin can create No Sensor activity if not already present", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY5);
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITIES_LIST).then(($activities) => {
      if($activities.find(advancedSearchMaterialsPage.MATERIAL_LIST_RESULT).length < 1) {
        adminHelper.openAuthoringAdminSection();
        adminHelper.createExternalActivity3(ACTIVITY5);
      }
    });
  });

  it("Verify subject search filter for Math activity ", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_5_6).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_7_8).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_MATH).check();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_PHYSICS).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_PHYSICS).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_RESOURCE_TYPE_SEQUENCE).uncheck();
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY1);
    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY2 + '\"]').should("not.exist");
  });

  it("Verify subject search filter for Physics activity", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY2);
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_5_6).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_7_8).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_MATH).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_PHYSICS).check();
    cy.get(advancedSearchMaterialsPage.CHK_RESOURCE_TYPE_SEQUENCE).uncheck();
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY2);
    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY1 + '\"]').should("not.exist");
  });

  it("Verify grade search filter for Math activity ", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY1);
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_5_6).check();
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_7_8).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_MATH).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_PHYSICS).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_RESOURCE_TYPE_SEQUENCE).uncheck();
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY1);
    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY2 + '\"]').should("not.exist");
  });

  it("Verify grade search filter for Physics activity", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY2);
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_5_6).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_7_8).check();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_MATH).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_PHYSICS).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_RESOURCE_TYPE_SEQUENCE).uncheck();
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY2);
    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY1 + '\"]').should("not.exist");
  });

  it("Verify sensor search filter for temperature activity ", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY3);
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_5_6).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_GRADE_LEVELS_7_8).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_MATH).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SUBJECT_PHYSICS).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SENSOR_TEMPERATURE).check();
    cy.get(advancedSearchMaterialsPage.CHK_RESOURCE_TYPE_SEQUENCE).uncheck();
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY3);
    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY4 + '\"]').should("not.exist");
    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY5 + '\"]').should("not.exist");
  });

  it("Verify sensor search filter for force activity ", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY4);
    cy.get(advancedSearchMaterialsPage.CHK_SENSOR_TEMPERATURE).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SENSOR_FORCE).check();
    cy.get(advancedSearchMaterialsPage.CHK_RESOURCE_TYPE_SEQUENCE).uncheck();
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY3 + '\"]').should("not.exist");
    cy.get(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY4);
    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY5 + '\"]').should("not.exist");
  });

  it("Verify sensor search filter for activity ", () => {
    adminHelper.openSearchMaterialsPage();
    cy.get(advancedSearchMaterialsPage.TXT_SEARCH_BAR).type(ACTIVITY5);
    cy.get(advancedSearchMaterialsPage.CHK_SENSOR_TEMPERATURE).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SENSOR_FORCE).uncheck();
    cy.get(advancedSearchMaterialsPage.CHK_SENSOR_NOT_NECESSARY).check();
    cy.get(advancedSearchMaterialsPage.CHK_RESOURCE_TYPE_SEQUENCE).uncheck();
    cy.get(advancedSearchMaterialsPage.BTN_GO).click();

    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY3 + '\"]').should("not.exist");
    cy.get('#activities_bookmark [data-material_name=\"' + ACTIVITY4 + '\"]').should("not.exist");
    cy.get(advancedSearchMaterialsPage.ACTIVITY_SEARCH_RESULT).contains(ACTIVITY5);
  });
});
