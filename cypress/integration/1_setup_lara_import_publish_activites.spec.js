import * as c from '../support/constants.js'
import laraPageElements from '../support/elements/lara_page_elements.js'

// Note for db tracking : This test adds a 2 activities and 2 sequences to LARA and publishes them into the portal

context("Setup : Import and publish activities and sequences into LARA", () => {

  let activityUrl = undefined;
  let sequenceUrl = undefined;

  beforeEach(function() {
    cy.visit(c.AUTHORING_BASE_URL + laraPageElements.SIGNIN_PAGE_ROUTE); // Visit Authoring Portal signin page
    cy.loginLARA(c.LARA_ADMIN_USERNAME, c.LARA_ADMIN_PASSWORD); // Login as LARA admin user
  });

  afterEach(() => {
    //cy.deleteMaterial(activityUrl);
    cy.logoutLARA(); // Logout from LARA
  });

  it("Import and publish activity 1", () => {
    cy.importMaterial(c.AUTHORING_BASE_URL, 'activities/AutomatedTestActivity1_AP.json').then(url => { // Import AutomatedTestActivity1_AP.json from fixtures into LARA
      activityUrl = url
    });
    cy.reload(); // Reload so that imported activity appears in LARA
    cy.get(laraPageElements.PUBLISH_LINK_ACTIVITIES).click(); // Click Publish for that activity
    cy.contains(laraPageElements.PUBLISH_MODAL_ROW, c.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "login-to-publish").click(); // Click login to publish in the publish modal for that portal env
    cy.loginPortal(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login to the portal
    cy.get(laraPageElements.PUBLISH_LINK_ACTIVITIES).click(); // Click Publish for that activity
    cy.contains(laraPageElements.PUBLISH_MODAL_ROW, c.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "add to").click(); // Click 'add to' to publish
    cy.get(laraPageElements.PUBLISHED_TO_PORTAL_LABEL).should("have.text", "added"); // Check that the text 'added' appears in the modal
    cy.get(laraPageElements.CLOSE_PUBLISH_MODAL).click(); // Close the publish modal
  });

  it("Import and publish activity 2", () => {
    cy.importMaterial(c.AUTHORING_BASE_URL, 'activities/AutomatedTestActivity1_LARA.json').then(url => { // Import AutomatedTestActivity1_LARA.json from fixtures into LARA
      activityUrl = url
    });
    cy.reload(); // Reload so that imported activity appears in LARA
    cy.get(laraPageElements.PUBLISH_LINK_ACTIVITIES).click(); // Click Publish for that activity
    cy.contains(laraPageElements.PUBLISH_MODAL_ROW, c.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "login-to-publish").click(); // Click login to publish in the publish modal for that portal env
    cy.get(laraPageElements.PUBLISH_LINK_ACTIVITIES).click(); // Click Publish for that activity
    cy.contains(laraPageElements.PUBLISH_MODAL_ROW, c.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "add to").click(); // Click 'add to' to publish
    cy.get(laraPageElements.PUBLISHED_TO_PORTAL_LABEL).should("have.text", "added"); // Check that the text 'added' appears in the modal
    cy.get(laraPageElements.CLOSE_PUBLISH_MODAL).click(); // Close the publish modal
  });

  it("Import and publish sequence 1", () => {
    cy.importMaterial(c.AUTHORING_BASE_URL, 'sequences/AutomatedTestSequence1_AP.json').then(url => { // Import AutomatedTestSequence1_AP.json from fixtures into LARA
      sequenceUrl = url
    });
    cy.reload(); // Reload so that imported sequence appears in LARA
    cy.get(laraPageElements.PUBLISH_LINK_SEQUENCES).click(); // Click Publish for that sequence
    cy.contains(laraPageElements.PUBLISH_MODAL_ROW, c.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "login-to-publish").click();
    cy.get(laraPageElements.PUBLISH_LINK_SEQUENCES).click(); // Click Publish for that sequence
    cy.contains(laraPageElements.PUBLISH_MODAL_ROW, c.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "add to").click(); // Click 'add to' to publish
    cy.get(laraPageElements.PUBLISHED_TO_PORTAL_LABEL).should("have.text", "added"); // Check that the text 'added' appears in the modal
    cy.get(laraPageElements.CLOSE_PUBLISH_MODAL).click(); // Close the publish modal
  });

  it("Import and publish sequence 2", () => {
    cy.importMaterial(c.AUTHORING_BASE_URL, 'sequences/AutomatedTestSequence1_LARA.json').then(url => { // Import AutomatedTestSequence1_LARA.json from fixtures into LARA
      sequenceUrl = url
    });
    cy.reload(); // Reload so that imported sequence appears in LARA
    cy.get(laraPageElements.PUBLISH_LINK_SEQUENCES).click(); // Click Publish for that sequence
    cy.contains(laraPageElements.PUBLISH_MODAL_ROW, c.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "login-to-publish").click(); // Click login to publish in the publish modal for that portal env
    cy.get(laraPageElements.PUBLISH_LINK_SEQUENCES).click(); // Click Publish for that sequence
    cy.contains(laraPageElements.PUBLISH_MODAL_ROW, c.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "add to").click(); // Click 'add to' to publish
    cy.get(laraPageElements.PUBLISHED_TO_PORTAL_LABEL).should("have.text", "added"); // Check that the text 'added' appears in the modal
    cy.get(laraPageElements.CLOSE_PUBLISH_MODAL).click(); // Close the publish modal
  });
});
