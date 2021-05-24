import * as c from '../support/constants.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import adminPageElements from '../support/elements/admin_page_elements.js'
import noticesPageElements from '../support/elements/notices_page_elements.js'

// Note for db tracking : No db tracking required, using existing records (except for notices, which are added and then deleted at the end)

context("Verify users can view, collapse and dismiss notices", () => {

  context("Verify admin user can add and view notices", () => {

    before(function() {
      cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
      cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD) // Login as admin user
    });

    after(function() {
      cy.logout(); // Logout
    });

    it("Verify admin user is able to add a notice", () => {
      cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();   // Click on 'Admin' link in the sidebar
      cy.get(adminPageElements.NOTICES_LINK).click(); // Click on 'Notices' link in the Site Admin Links list
      cy.contains(noticesPageElements.NO_NOTICES_TEXT, "You have no notices."); // Check 'You have no notices' text initially
      cy.get(noticesPageElements.NEW_NOTICE_LINK).click(); // Click on 'Create New Notice'
      cy.setTinyMceContent(noticesPageElements.EDITOR, c.NOTICE_TEXT); // Type in a new notice text in the editor
      cy.get(noticesPageElements.NOTICE_SUBMIT).click(); // Publish the notice
      cy.contains(noticesPageElements.TABLE_ENTRY, c.NOTICE_TEXT); // Check the notice is displayed in the 'Notices' table in the Admin page
    });
  });

  context("Verify various users are able to view , collapse and dismiss the notice", () => {
    const testUsers = [
      { username: c.ADMIN_USERNAME, password: c.ADMIN_PASSWORD },
      { username: c.AUTHOR_USERNAME, password: c.AUTHOR_PASSWORD },
      { username: c.RESEARCHER_USERNAME, password: c.RESEARCHER_PASSWORD },
      { username: c.MANAGER_USERNAME, password: c.MANAGER_PASSWORD },
      { username: c.TEACHER_USERNAME, password: c.TEACHER_PASSWORD }
    ];

    testUsers.forEach(user => {
      it("Verify view, collapse and dismiss of notices for user: " + `${user.username}`, () => {
        cy.login(`${user.username}`, `${user.password}`); // Login for each user
        cy.get(userHomePageElements.CONTENT).should('have.text', 'Getting Started') // Check 'Getting Started' appears
        cy.contains(userHomePageElements.NOTICES_TABLE_ENTRY, c.NOTICE_TEXT); // Check the notice is displayed in the 'Notices' table in the Getting Started page
        cy.get(userHomePageElements.HIDE_SHOW_NOTICES).should('have.text', 'Hide Notices').click(); // Click Hide Notices Link
        cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).should("not.be.visible"); // Check that the notice is not visible
        cy.get(userHomePageElements.HIDE_SHOW_NOTICES).should('have.text', 'Show Notices').click(); // Click Show Notices Link
        cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).should("be.visible").should("have.text", c.NOTICE_TEXT); // Check that the notice is visible
        cy.get(userHomePageElements.DISMISS_NOTICES).click() // Dismiss the notice
        cy.confirm('Are you sure you want to dismiss this notice?'); // Confirm browser alert to discmiss the notice
        cy.get(userHomePageElements.NO_NOTICES_TEXT).should('have.text', "There are currently no notices.") // 'Notices' table should show this line
        cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).should("not.exist"); // Check that the notice does not exist
        cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Reload the Getting Started page
        cy.get(userHomePageElements.NOTICES_TABLE).should("not.exist"); // Check that the 'Notices' table does not exist
        cy.logout(); // Logout
      });
    });

    it("Verify student user is not able to view , collapse and dismiss the notice", () => {
      cy.login(c.STUDENT_USERNAME, c.STUDENT_PASSWORD); // Login using student user
      cy.get(userHomePageElements.NOTICES_TABLE).should("not.exist"); // Check that the 'Notices' table does not exist
      cy.logout();
    });
  });

  context("Verify admin user is able to delete the notice", () => {

    it("Verify admin user is able to remove a notice", () => {
      cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD); // Login using admin user
      cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click on 'Admin' link in the sidebar
      cy.get(adminPageElements.NOTICES_LINK).click(); // Click on 'Notices' link in the Site Admin Links list
      cy.contains(noticesPageElements.TABLE_ENTRY, c.NOTICE_TEXT); // Check the notice is displayed in the 'Notices' table in the Admin page
      cy.get(noticesPageElements.EXISTING_NOTICE_DELETE).click(); // Click 'Delete'
      cy.confirm('Are you sure you want to delete this notice?'); // Confirm browser alert to delete the notice
      cy.contains(noticesPageElements.NO_NOTICES_TEXT, "You have no notices."); // Check 'You have no notices' text
      cy.logout();
    });
  });
});
