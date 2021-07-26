import userHomePageElements from "../elements/user_home_page_elements";
import adminPageElements from "../elements/admin_page_elements";
import teacherHomePageElements from "../elements/teacher_home_page_elements";
import adminAuthoringPageElements from "../elements/admin_authoring_page_elements";
import flashNoticePageElements from '../elements/flash_notice_page_elements.js'
import adminSettingsUsersPageElements from '../elements/admin_settings_users_page_elements.js'
import adminEditUserPageElements from '../elements/admin_edit_user_page_elements.js'
import c from '../constants.js'

export function disableOpenInNewWindow(activityName){
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();
    cy.get(adminPageElements.LNK_AUTHORING).click();
    cy.get('li a').contains(activityName).click();
    cy.get('.portal-pages-action-buttons > a').contains('Settings').click();
    cy.get('div.config').contains(' Open the url in a new window ').get('input#external_activity_popup').uncheck();
    cy.get('.action_menu_header_right ul li input[value=\"Save\"]').click();
}

export function openUsersAdminSection() {
  cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link in left nav
  cy.get(adminPageElements.USERS_LINK).click(); // Click 'Users' link in the Admin Settings page
}

export function openAuthoringAdminSection() {
  cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link in left nav
  cy.get(adminPageElements.AUTHORING_LINK).click(); // Click 'Authoring' link in the Admin Settings page
}

export function openSearchMaterialsPage() {
  cy.visit(c.LEARN_PORTAL_BASE_URL + "/search");
}

export function copyLaraActivity(existingActivityName, newActivityName){
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();
    cy.get(admin_page_elements.LNK_AUTHORING).click();

    cy.get('li a').contains(existingActivityName).first().click();
    cy.get('a.button', 'Copy').invoke('removeAttr').contains('target').click();
    cy.get('#Activity_edit_container p strong').contains('Admin Admin').click();

    //copy activity is in an iframe so, we need use this custom logic for accessing elements in an iframe.
    cy.get('iframe').then($iframe => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body).find('#lightweight_activity_name').type('{selectall}{backspace}' + newActivityName);
        cy.wrap($body).find('input#save-top').first().click();
    })


    cy.get(teacherHomePageElements.BTN_MY_CLASSES).click();
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();
    cy.get(admin_page_elements.LNK_AUTHORING).click();
    cy.get('li a').contains(newActivityName).click();
    cy.get('#material_clazz_count a').contains('(portal settings)').click();
    cy.get('div.config').contains(' Open the url in a new window ').get('input#external_activity_popup').click();
    cy.get('.action_menu_header_right ul li input[value=\"Save\"]');

}

export function activateUser(userName, fullName, firstName, lastName) {

  cy.get(adminSettingsUsersPageElements.SEARCH_FIELD).type('{selectall}{backspace}' + userName); // Type student 1's username in the search input field
  cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON).click(); // Click 'Search' button

  cy.get(adminSettingsUsersPageElements.SEARCH_LIST_HEADER).then(($searchResults) => {
    if($searchResults.find(adminSettingsUsersPageElements.SEARCH_RESULT).length > 0) {
      cy.get(adminSettingsUsersPageElements.SEARCH_RESULT_USER_NAME).contains("User: " + fullName); // The search result should contain 1 entry with student 1's info
      cy.get(adminSettingsUsersPageElements.ACTIVATE_USER).click(); // Click Activate link
      cy.get(flashNoticePageElements.BANNER).contains("Activation of " + lastName + ", " + firstName + " ( " + userName + " ) complete."); // Verify banner that shows that user is successfully activated
    }
  });
}

export function removeUser(userName, fullName) {

  cy.get(adminSettingsUsersPageElements.SEARCH_FIELD).type('{selectall}{backspace}' + userName); // Type student 1's username in the search input field
  cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON).click(); // Click 'Search' button

  cy.get(adminSettingsUsersPageElements.SEARCH_LIST_HEADER).then(($searchResults) => {
    if($searchResults.find(adminSettingsUsersPageElements.SEARCH_RESULT).length > 0) {
      cy.get(adminSettingsUsersPageElements.SEARCH_RESULT_USER_NAME).contains("User: " + fullName); // The search result should contain 1 entry with student 1's info

      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns("DELETE");
        cy.get(adminSettingsUsersPageElements.DELETE_USER).click(); // Click Delete link and confirm by entering DELETE in the browser prompt
      });
      cy.get(flashNoticePageElements.BANNER).contains("User: " + fullName + " successfully deleted!"); // Verify banner that shows that user is successfully deleted
    }
  });
}

export function editAndSaveUser(userName, fullName) {
  cy.get(adminSettingsUsersPageElements.SEARCH_FIELD).type('{selectall}{backspace}' + userName);
  cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON).click();

  cy.get(adminSettingsUsersPageElements.SEARCH_LIST_HEADER).then(($searchResults) => {
    if($searchResults.find(adminSettingsUsersPageElements.SEARCH_RESULT).length > 0) {
      cy.get(adminSettingsUsersPageElements.SEARCH_RESULT_USER_NAME).contains("User: " + fullName);
      cy.get(adminSettingsUsersPageElements.EDIT_USER).click(); // Click Edit link
      cy.get(adminEditUserPageElements.SAVE_BUTTON).click();
      cy.get(flashNoticePageElements.BANNER).contains("User: " + fullName + " was successfully updated."); // Verify banner that shows that user is successfully updated
    }
  });
}

export function addAdminRoleToUser(userName, fullName) {
  cy.get(adminSettingsUsersPageElements.SEARCH_FIELD).type('{selectall}{backspace}' + userName);
  cy.get(adminSettingsUsersPageElements.SEARCH_BUTTON).click();

  cy.get(adminSettingsUsersPageElements.SEARCH_LIST_HEADER).then(($searchResults) => {
    if($searchResults.find(adminSettingsUsersPageElements.SEARCH_RESULT).length > 0) {
      cy.get(adminSettingsUsersPageElements.SEARCH_RESULT_USER_NAME).contains("User: " + fullName);
      cy.get(adminSettingsUsersPageElements.EDIT_USER).click(); // Click Edit link
      cy.get(adminEditUserPageElements.ADD_ADMIN_ROLE).check();
      cy.get(adminEditUserPageElements.SAVE_BUTTON).click();
      cy.get(flashNoticePageElements.BANNER).contains("User: " + fullName + " was successfully updated."); // Verify banner that shows that user is successfully updated
    }
  });
}

export function createExternalActivity1(activityName, grade, subject) {
  cy.get(adminAuthoringPageElements.CREATE_EXTERNAL_ACTIVITY).click();
  cy.get(adminAuthoringPageElements.EXTERNAL_ACTIVITY_NAME_FIELD).type(activityName);
  cy.get(adminAuthoringPageElements.IS_OFFICIAL_CHECKBOX).check();
  cy.get(adminAuthoringPageElements.PUBLICATION_STATUS_DROPDOWN).select('published');
  cy.get(grade).check();
  cy.get(subject).check();
  cy.get(adminAuthoringPageElements.SAVE_BUTTON).click();
  cy.get(flashNoticePageElements.BANNER).contains("ExternalActivity was successfully created.");
}

export function createExternalActivity2(activityName, sensor) {
  cy.get(adminAuthoringPageElements.CREATE_EXTERNAL_ACTIVITY).click();
  cy.get(adminAuthoringPageElements.EXTERNAL_ACTIVITY_NAME_FIELD).type(activityName);
  cy.get(adminAuthoringPageElements.IS_OFFICIAL_CHECKBOX).check();
  cy.get(adminAuthoringPageElements.PUBLICATION_STATUS_DROPDOWN).select('published');
  cy.get(sensor).check();
  cy.get(adminAuthoringPageElements.SAVE_BUTTON).click();
  cy.get(flashNoticePageElements.BANNER).contains("ExternalActivity was successfully created.");
}

export function createExternalActivity3(activityName) {
  cy.get(adminAuthoringPageElements.CREATE_EXTERNAL_ACTIVITY).click();
  cy.get(adminAuthoringPageElements.EXTERNAL_ACTIVITY_NAME_FIELD).type(activityName);
  cy.get(adminAuthoringPageElements.IS_OFFICIAL_CHECKBOX).check();
  cy.get(adminAuthoringPageElements.PUBLICATION_STATUS_DROPDOWN).select('published');
  cy.get(adminAuthoringPageElements.SAVE_BUTTON).click();
  cy.get(flashNoticePageElements.BANNER).contains("ExternalActivity was successfully created.");
}
