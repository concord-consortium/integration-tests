import * as ape from '../../support/elements/admin_page_elements.js'

// Used multiple times in the 'pfe' constants defined below
const CREATE_EDIT_PERMISSION_FORM = 'div[class="createEditPermissionForm--pmsqnW6J"]'

const pfe = {  // permission forms elements
    PERMISSION_FORMS_LINK: 'li a[href="/admin/permission_forms_v2"]',

    MANAGE_STUDENT_PERMISSIONS_LINK: 'button:contains("Manage Student Permissions")',
    CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK: 'button:contains("Create / Manage Project Permission Forms")',

    MANAGE_STUDENT_PERMISSIONS_SELECT_PROJECT_DROPDOWN: 'div[class="rightSide--uMV6wNuK"] select[data-testid="project-select"]',
    CREATE_MANAGE_PROJECT_PERMISSION_SELECT_PROJECT_DD: 'div[class="leftSide--T1Ykz03v"]  select[data-testid="project-select"]',

    CREATE_NEW_PERMISSION_FORM_BUTTON: 'button:contains("Create New Permission Form")',
    CREATE_EDIT_PERMISSION_FORM_DIALOG: CREATE_EDIT_PERMISSION_FORM,
    CREATE_EDIT_PERM_SELECT_PROJECT_DD: CREATE_EDIT_PERMISSION_FORM+' select[data-testid="project-select"]',
    CREATE_EDIT_PERMISSION_FORM_NAME:   CREATE_EDIT_PERMISSION_FORM+' input[class="name--U_hCA8iT"]',
    CREATE_EDIT_PERMISSION_FORM_URL:    CREATE_EDIT_PERMISSION_FORM+' input[class="url--raKu4IoT"]',
    CREATE_EDIT_PERMISSION_FORM_CANCEL: CREATE_EDIT_PERMISSION_FORM+' button[class="cancelButton--dk30CMiV"]',
    CREATE_EDIT_PERMISSION_FORM_SAVE:   CREATE_EDIT_PERMISSION_FORM+' button:contains("Save")',

    PERMISSION_FORMS_TABLE_ROW:          'div[class="manageFormsTabContent--PW4_5pMp"] table tbody tr[class="permissionFormRow--BC9FzE66"]',
    ARCHIVED_PERMISSION_FORMS_TABLE_ROW: 'table tbody tr[class="isArchived--H3taEbTW"]',
};
  
export const ResearcherPermissionFormsElements = {

    // Utility methods, used by methods below
    verifyElementIsPresent(selector, header) {
        cy.get(selector).should('contain', header);
    },
    verifyElementIsVisible(selector, header) {
        cy.get(selector).should('contain', header).and('be.visible');
    },
    verifyElementWithValueIsVisible(selector, value) {
        cy.get(selector+'[value="'+value+'"]').should('be.visible');
    },

    // Link to the Admin page
    verifyAdminLink() {
        this.verifyElementIsVisible(ape.default.LNK_ADMIN, 'Admin');
    },
    clickAdminLink() {
        cy.get(ape.default.LNK_ADMIN).click();
    },

    // Link to the Permission Forms page, which this class is intended to test
    verifyPermissionFormsLink() {
        this.verifyElementIsVisible(pfe.PERMISSION_FORMS_LINK, 'Permission Forms');
    },
    clickPermissionFormsLink() {
        cy.get(pfe.PERMISSION_FORMS_LINK).click();
    },

    // Link to the 'Manage Student Permissions' tab (of the Permission Forms page)
    verifyManageStudentPermissionsLink() {
        this.verifyElementIsVisible(pfe.MANAGE_STUDENT_PERMISSIONS_LINK, 'Manage Student Permissions');
    },
    verifyManageStudentPermissionsLinkEnabled(enabled=true) {
        if (enabled) {
            cy.get(pfe.MANAGE_STUDENT_PERMISSIONS_LINK).should('not.have.class', 'disabled--KTkcqshd');
        } else {
            cy.get(pfe.MANAGE_STUDENT_PERMISSIONS_LINK).should('have.class', 'disabled--KTkcqshd');
        }
    },
    clickManageStudentPermissionsLink() {
        cy.get(pfe.MANAGE_STUDENT_PERMISSIONS_LINK).click();
    },

    // Link to the 'Create New Permission Form' tab (of the Permission Forms page)
    verifyCreateManageProjectPermissionFormsLink() {
        this.verifyElementIsVisible(pfe.CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK, 'Create / Manage Project Permission Forms');
    },
    verifyCreateManageProjectPermissionFormsLinkEnabled(enabled=true) {
        if (enabled) {
            cy.get(pfe.CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK).should('not.have.class', 'disabled--KTkcqshd');
        } else {
            cy.get(pfe.CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK).should('have.class', 'disabled--KTkcqshd');
        }
    },
    clickCreateManageProjectPermissionFormsLink() {
        cy.get(pfe.CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK).click();
    },

    // The Select Project Dropdown appears, almost identically, on the 'Create New Permission Form' tab ...
    verifyCreateManagePermissionsSelectProjectDropdown(project='Select a project...') {
        this.verifyElementIsVisible(pfe.CREATE_MANAGE_PROJECT_PERMISSION_SELECT_PROJECT_DD, project);
    },
    selectCreateManagePermissionsProject(project) {
        cy.get(pfe.CREATE_MANAGE_PROJECT_PERMISSION_SELECT_PROJECT_DD).select(project);
    },

    // ... and on the 'Manage Student Permissions' tab
    verifyManageStudentPermissionsSelectProjectDropdown(project='Select a project...') {
        this.verifyElementIsVisible(pfe.MANAGE_STUDENT_PERMISSIONS_SELECT_PROJECT_DROPDOWN, project);
    },
    selectManageStudentPermissionsProject(project) {
        cy.get(pfe.MANAGE_STUDENT_PERMISSIONS_SELECT_PROJECT_DROPDOWN).select(project);
    },

    // The button that brings up the 'Create New Permission Form' dialog
    verifyCreateNewPermissionFormButton() {
        this.verifyElementIsVisible(pfe.CREATE_NEW_PERMISSION_FORM_BUTTON, 'Create New Permission Form');
    },
    clickCreateNewPermissionFormButton() {
        cy.get(pfe.CREATE_NEW_PERMISSION_FORM_BUTTON).click();
    },

    // On the 'Create New Permission Form' dialog
    verifyCreateNewPermissionFormDialog(project='Select a project...', name='', url='') {
        this.verifyElementIsPresent(pfe.CREATE_EDIT_PERMISSION_FORM_DIALOG, 'Create New Permission Form');
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERM_SELECT_PROJECT_DD, project);
        this.verifyElementWithValueIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_NAME, name);
        this.verifyElementWithValueIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_URL,  url);
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_CANCEL, 'Cancel');
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_SAVE,   'Save');
    },
    verifyCreateEditPermissionFormSaveButtonEnabled(enabled=true) {
        if (enabled) {
            cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_SAVE).should('not.have.attr', 'disabled');
        } else {
            cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_SAVE).should('have.attr', 'disabled');
        }
    },
    selectCreateEditPermissionFormProject(project) {
        cy.get(pfe.CREATE_EDIT_PERM_SELECT_PROJECT_DD).select(project);
    },
    enterCreateEditPermissionFormName(name) {
        if (name != null && name != '') {
            cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_NAME).type(name);            
        }
    },
    enterCreateEditPermissionFormUrl(url) {
        if (url != null && url != '') {
            cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_URL).type(url);            
        }
    },
    clickCreateEditPermissionFormCancelButton() {
        cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_CANCEL).click();
    },
    clickCreateEditPermissionFormSaveButton() {
        cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_SAVE).click();
    },

    // A method that does most of the above, consecutively
    createNewPermissionForm(project, name, url='', cancel=false, current_project='Select a project...') {
        this.verifyCreateNewPermissionFormButton();
        this.clickCreateNewPermissionFormButton();
        this.verifyCreateNewPermissionFormDialog(current_project);
        this.verifyCreateEditPermissionFormSaveButtonEnabled(false);
        this.selectCreateEditPermissionFormProject(project);
        this.enterCreateEditPermissionFormName(name);
        this.verifyCreateEditPermissionFormSaveButtonEnabled();
        this.enterCreateEditPermissionFormUrl(url);
        if (cancel) {
            this.clickCreateEditPermissionFormCancelButton();
        } else {
            this.clickCreateEditPermissionFormSaveButton();
        }
    },

    // On the 'Edit: <Permission Form name>' dialog (almost identical to the 'Create New Permission Form' dialog)
    verifyEditPermissionFormDialog(project='', name='', url='') {
        this.verifyElementIsPresent(pfe.CREATE_EDIT_PERMISSION_FORM_DIALOG, 'EDIT: '+name);
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERM_SELECT_PROJECT_DD, project);
        this.verifyElementWithValueIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_NAME, name);
        this.verifyElementWithValueIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_URL,  url);
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_CANCEL, 'Cancel');
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_SAVE,   'Save Changes');
    },

    // Utility methods, used by the methods below
    getSpecifiedRowLink(tableRowIdentifier, permissionFormName, linkClass, expectedText, tag='button') {
        return cy.get(tableRowIdentifier+':contains("'+permissionFormName+'") '+
            'td[class="'+linkClass+'"] '+tag+':contains("'+expectedText+'")').first();
    },
    getPermissionFormLink(permissionFormName, linkClass, expectedText, tag='button', archived=false) {
        // if (archived) {
        //     return this.getSpecifiedRowLink(pfe.ARCHIVED_PERMISSION_FORMS_TABLE_ROW,
        //         permissionFormName, linkClass, expectedText, tag);
        // } else {
            // return this.getSpecifiedRowLink(pfe.PERMISSION_FORMS_TABLE_ROW,
            //     permissionFormName, linkClass, expectedText, tag);
        // }
        return cy.get(pfe.PERMISSION_FORMS_TABLE_ROW+':contains("'+permissionFormName+'") td[class="'+linkClass+'"] '+tag+':contains("'+expectedText+'")');
    },
    clickPermissionFormLink(permissionFormName, linkClass, expectedText, tag='button') {
        // this.getPermissionFormLink(permissionFormName, linkClass, expectedText, tag).first().click();

        // PERMISSION_FORMS_TABLE_ROW:          'div[class="manageFormsTabContent--PW4_5pMp"] table tbody tr[class="permissionFormRow--BC9FzE66"]',

        // cy.get(pfe.PERMISSION_FORMS_TABLE_ROW+':contains("'+permissionFormName+'") td[class="'+linkClass+'"] '+tag+':contains("'+expectedText+'")').first().click();

        cy.get(pfe.PERMISSION_FORMS_TABLE_ROW+' td:contains("'+permissionFormName+'")').first().parent()
            .find(' td[class="'+linkClass+'"] '+tag
            // +':contains("'+expectedText+'")'
        ).click();
    },

    // Click links in a specified row of the Permission Forms table
    clickPermissionFormEdit(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'editColumn--nW9BjVVG', 'Edit');
        // cy.wait(2000);
    },
    clickPermissionFormArchive(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'archiveColumn--vezR01zs', 'Archive');
        // cy.wait(2000);
    },
    clickPermissionFormUnarchive(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'archiveColumn--vezR01zs', 'Unarchive', 'button', true);
        // cy.wait(2000);
    },
    clickPermissionFormDelete(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'deleteColumn--IzVI9YZC', 'Delete');
        // cy.wait(2000);
    },
    // TODO: this is currently unused, because it would bring up another tab
    clickPermissionFormUrl(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'urlColumn--z1WHekGk', 'https://', 'a');
        // cy.wait(2000);
    },

    // Get / verify the text of a URL link
    getPermissionFormUrlText(permissionFormName) {
        return this.getPermissionFormLink(permissionFormName, 'urlColumn--z1WHekGk', 'https://', 'a').text();
    },
    verifyPermissionFormUrlText(permissionFormName, expectedUrlText) {
        this.getPermissionFormLink(permissionFormName, 'urlColumn--z1WHekGk', 'https://', 'a')
            .should('contain', expectedUrlText);
    },



}
