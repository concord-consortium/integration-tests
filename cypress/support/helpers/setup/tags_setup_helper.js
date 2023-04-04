import constants from '../../constants.js'
import userHomePageElements from '../../elements/user_home_page_elements.js'
import tagsPageElements from '../../elements/tags_page_elements.js'
import adminPageElements from '../../elements/admin_page_elements.js'

const tags = [
  // { tagScope: "subject_areas", tagName: 'Biology' },
  // { tagScope: "subject_areas", tagName: 'Chemistry' },
  // { tagScope: "subject_areas", tagName: 'Earth and Space Science' },
  // { tagScope: "subject_areas", tagName: 'Engineering' },
  { tagScope: "subject_areas", tagName: 'Mathematics' },
  { tagScope: "subject_areas", tagName: 'Physics' },
  // { tagScope: "grade_levels", tagName: '3' },
  // { tagScope: "grade_levels", tagName: '4' },
  { tagScope: "grade_levels", tagName: '5' },
  // { tagScope: "grade_levels", tagName: '6' },
  { tagScope: "grade_levels", tagName: '7' },
  // { tagScope: "grade_levels", tagName: '8' },
  // { tagScope: "grade_levels", tagName: '9' },
  // { tagScope: "grade_levels", tagName: '10' },
  // { tagScope: "grade_levels", tagName: '11' },
  // { tagScope: "grade_levels", tagName: '12' },
  // { tagScope: "grade_levels", tagName: 'Higher Ed' },
  // { tagScope: "material_properties", tagName: 'Requires download' },
  // { tagScope: "sensors", tagName: 'Motion' },
  // { tagScope: "sensors", tagName: 'Pressure' },
  // { tagScope: "sensors", tagName: 'Light' },
  // { tagScope: "sensors", tagName: 'CO2' },
  // { tagScope: "sensors", tagName: 'pH' },
  // { tagScope: "sensors", tagName: 'Voltage' },
  // { tagScope: "sensors", tagName: 'Humidity' },
  { tagScope: "sensors", tagName: 'Temperature' },
  { tagScope: "sensors", tagName: 'Force' }
];

export function tagsSetup() {

  createTags();
}

export function createTags() {
  cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user

  cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
  cy.get(adminPageElements.TAGS_LINK).click(); // Click 'Notices' link from left nav
  tags.forEach(eachTag => {

    cy.get(tagsPageElements.SEARCH_FIELD).click().clear().type(eachTag.tagName);
    cy.get(tagsPageElements.SEARCH_BUTTON).click(); // Click 'Search' button

    cy.get(tagsPageElements.TAGS_PAGE_CONTENT).then(($content) => {
      if($content.find(tagsPageElements.SEARCH_RESULT).length < 1) {
        cy.get(tagsPageElements.CREATE_TAG_LINK).click();

        cy.get(tagsPageElements.SCOPE_FIELD).type(eachTag.tagScope);
        cy.get(tagsPageElements.TAG_FIELD).type(eachTag.tagName);
        cy.get(tagsPageElements.SAVE_BUTTON).click();
        cy.wait(1000);
        // cy.get(flashNoticePageElements.BANNER).contains("Admin::Tag was successfully created.");
        cy.get(tagsPageElements.LIST_TAGS_LINK).click();
        cy.get(tagsPageElements.CREATE_TAG_LINK).should('exist');
      }
    });
  });

  cy.logout();
}
