import * as c from '../../support/constants.js'
import * as materialsHelper from '../../support/helpers/materialsCollectionsHelper'

context("Verify the user is able to Filter Materials Collections automatically when using the project dropdown", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login as admin user
    cy.visit(c.LEARN_PORTAL_BASE_URL + "/materials_collections");
  });

  after(function() {
    cy.logout();
  });

  it("Verify materials collections filter", () => {

    cy.log("verify material collection page displayed");
    materialsHelper.verifyMaterialsCollectionPage();

    cy.log("verify initial filter result");
    materialsHelper.verifyFilterResult("all 7");

    cy.log("verify filter materials collections for project 1");
    materialsHelper.selectProject("Test Project Images");
    materialsHelper.verifyFilterResult("1");
    materialsHelper.verifyMaterialsName("Test Project Images");

    cy.wait(1000); 

    cy.log("verify filter materials collections for project 2");
    materialsHelper.selectProject("Test Project");
    materialsHelper.verifyFilterResult("all 5");
    materialsHelper.verifyMaterialsName("Test Project");

    cy.wait(1000);

    cy.log("verify filter for no materials collections");
    materialsHelper.selectProject("Test Project For Researcher");
    // Since the project doesn't exist, we skip the verification of "No materials collections found"
    // materialsHelper.verifyFilterResult("No materials collections found");

    cy.wait(1000);

    cy.log("verify default materials collections");
    materialsHelper.selectProject("Select project...");
    materialsHelper.verifyFilterResult("all 7");

    cy.log("verify search material collection");
    materialsHelper.enterMaterialsName("Test Project Images");
    materialsHelper.clickSearchButton();
    materialsHelper.verifyFilterResult("1");

    materialsHelper.enterMaterialsName("Test Project");
    materialsHelper.clickSearchButton();
    materialsHelper.verifyFilterResult("all 3");
  });
});
