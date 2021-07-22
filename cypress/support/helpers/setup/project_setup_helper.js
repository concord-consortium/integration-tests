import constants from '../../constants.js'
import userHomePageElements from '../../elements/user_home_page_elements.js'
import projectPageElements from '../../elements/project_page_elements.js'
import adminPageElements from '../../elements/admin_page_elements.js'
import flashNoticePageElements from '../../elements/flash_notice_page_elements.js'

const projects = [
  { projectName: 'FooBar', slug: 'foo-bar', content: 'Hello, <span id=\'foo-bar\'></span><script>jQuery(\'#foo-bar\').text(\'it is FooBar page!\');</script>' }
];

export function projectSetup() {

  createProject();
}

export function createProject() {
  cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user

  cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
  cy.get(adminPageElements.PROJECTS_LINK).click(); // Click 'Projects' link from left nav
  projects.forEach(eachProject => {

    cy.get(projectPageElements.SEARCH_FIELD).type('{selectall}{backspace}' + eachProject.projectName);
    cy.get(projectPageElements.SEARCH_BUTTON).click(); // Click 'Search' button

    cy.get(projectPageElements.PROJECT_PAGE_CONTENT).then(($content) => {
      if($content.find(projectPageElements.SEARCH_RESULT).length < 1) {
        cy.get(projectPageElements.CREATE_PROJECT_LINK).click();

        cy.get(projectPageElements.NAME_FIELD).type(eachProject.projectName);
        cy.get(projectPageElements.SLUG_FIELD).type(eachProject.slug);
        cy.get(projectPageElements.CONTENT_FIELD).type(eachProject.content);
        cy.get(projectPageElements.SAVE_BUTTON).click();
        cy.get(flashNoticePageElements.BANNER).contains("Project was successfully created.");
        cy.get(projectPageElements.CREATE_PROJECT_LINK).should('exist');
      }
    });
  });

  cy.logout();
}
