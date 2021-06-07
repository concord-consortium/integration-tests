

import noticesPageElements from "../elements/notices_page_elements";
import userHomePageElements from "../elements/user_home_page_elements";
import adminPageElements from "../elements/admin_page_elements";

const RECENT_ACTIVITY_URL = 'https://test.dev.docker/recent_activity#';

export function createNotice(noticeText){
    //This API assumes that we just logged in as admin user
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();   // Click on 'Admin' link in the sidebar
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click on 'Notices' link in the Site Admin Links list
    cy.get(noticesPageElements.NEW_NOTICE_LINK).click(); // Click on 'Create New Notice'
    cy.setTinyMceContent(noticesPageElements.EDITOR, noticeText); // Type in a new notice text in the editor
    cy.get(noticesPageElements.NOTICE_SUBMIT).click(); // Publish the notice
    cy.contains(noticesPageElements.TABLE_ENTRY, noticeText); // Check the notice is displayed in the 'Notices' table in the Admin page
}

export function editNotice(oldText, newText){
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();   // Click on 'Admin' link in the sidebar
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click on 'Notices' link in the Site Admin Links list
    cy.contains(noticesPageElements.TABLE_ENTRY, oldText).parent().parent().contains('a', 'edit').click();
    cy.setTinyMceContent(noticesPageElements.EDITOR, newText); // Type in a new notice text in the editor
    cy.get(noticesPageElements.NOTICE_SUBMIT).click(); // Publish the notice
}

export function deleteNotice(noticeText){
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();   // Click on 'Admin' link in the sidebar
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click on 'Notices' link in the Site Admin Links list
    cy.contains(noticesPageElements.TABLE_ENTRY, noticeText).parent().parent().find('td a[title=\"Delete Notice\"]').click();
    cy.confirm('Are you sure you want to delete this notice?');
}

export function userHideNotices(){
    cy.contains(userHomePageElements.HIDE_SHOW_NOTICES, 'Hide Notices').click();
}

export function userShowNotices(){
    cy.contains(userHomePageElements.HIDE_SHOW_NOTICES, 'Show Notices').click();
}

export function userViewNotice(noticeText){
    cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).contains('td', noticeText);
}

export function userCannotViewNotice(noticeText){
    cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).contains('td', noticeText).should('not.exist');
}

export function noticeTableDoesNotExist(noticeText){
    cy.get(userHomePageElements.NOTICES_TABLE).should("not.exist");
}

export function userDismissNotice(noticeText){
    cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).contains('td', noticeText).parent().find('a[title=\"Dismiss\"]').click();
    cy.confirm('Are you sure you want to dismiss this notice?');
}

