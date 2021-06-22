import constants from '../../constants.js'
import userHomePageElements from '../../elements/user_home_page_elements.js'
import noticesPageElements from '../../elements/notices_page_elements.js'
import adminPageElements from '../../elements/admin_page_elements.js'

export function noticesSetup() {
  cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page

  cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
  cy.get(adminPageElements.NOTICES_LINK).click(); // Click 'Notices' link from left nav
  
  checkNoticesExist().then($notices => {
    if($notices.length > 0) {
      deleteNotice();
      checkNoNoticesExist();
    }
  });
  cy.logout();
}

function checkNoticesExist() {
  const url = constants.LEARN_PORTAL_BASE_URL + 'api/v1/site_notices/index';
  return cy.request({
    url: url,
    method: "GET"
  }).then(response => {
    if (response.status !== 200){
      throw Error("Notices response status was: " + response.status + " instead of 200. " +
        "The url was: " + url);
    }
    return response.body;
  });
}

function deleteNotice() {
  cy.get(noticesPageElements.EXISTING_NOTICE_DELETE).click({ multiple: true } ); // Click 'Delete' button to delete the notice
  cy.confirm('Are you sure you want to delete this notice?'); // Confirm deleting the notice
}

function checkNoNoticesExist() {
  cy.contains(noticesPageElements.NO_NOTICES_TEXT, "You have no notices."); // Check 'You have no notices' text in the Notices page
  cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Click 'My Classes' at the top header
  cy.get(userHomePageElements.NOTICES_TABLE).should("not.exist"); // Check notices table does not exist in the user home page
}
