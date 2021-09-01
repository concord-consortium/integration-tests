import constants from '../../constants.js'
import userHomePageElements from '../../elements/user_home_page_elements.js'
import materialsCollectionPageElements from '../../elements/materials_collection_page_elements.js'
import adminPageElements from '../../elements/admin_page_elements.js'
import flashNoticePageElements from '../../elements/flash_notice_page_elements.js'

const collections = [
  { collectionName: 'Cypress Automation Collection 1', projectName: 'FooBar' },
  { collectionName: 'Cypress Automation Collection 2', projectName: 'FooBar' },
  { collectionName: 'Cypress Automation Collection 3', projectName: 'FooBar' },
  { collectionName: 'Cypress Automation Collection 4', projectName: 'FooBar' }
];

export function materialsCollectionSetup() {

  createCollections();
}

export function createCollections() {
  cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user

  cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
  cy.get(adminPageElements.MATERIALS_COLLECTION_LINK).click(); // Click 'Materials Collection' link from left nav
  collections.forEach(eachCollection => {

    cy.get(materialsCollectionPageElements.SEARCH_FIELD).click().clear().type(eachCollection.collectionName);
    cy.get(materialsCollectionPageElements.SEARCH_BUTTON).click(); // Click 'Search' button

    cy.get(materialsCollectionPageElements.MATERIALS_COLLECTION_PAGE_CONTENT).then(($content) => {
      if($content.find(materialsCollectionPageElements.SEARCH_RESULT).length < 1) {
        cy.get(materialsCollectionPageElements.CREATE_MATERIALS_COLLECTION_LINK).click();

        cy.get(materialsCollectionPageElements.NAME_FIELD).type(eachCollection.collectionName);
        cy.get(materialsCollectionPageElements.PROJECT_DROPDOWN).select(eachCollection.projectName);
        cy.get(materialsCollectionPageElements.SAVE_BUTTON).click();
        cy.get(flashNoticePageElements.BANNER).contains("Materials Collection was successfully created.");
        cy.get(materialsCollectionPageElements.CREATE_MATERIALS_COLLECTION_LINK).should('exist');
      }
    });
  });

  cy.logout();
}
