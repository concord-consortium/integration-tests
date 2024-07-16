import * as ape from '../../support/elements/admin_page_elements.js'

// Used multiple times in the 'pfe' constants defined below
const CREATE_EDIT_PERMISSION_FORM = 'div[class^="createEditPermissionForm"]'

const pfe = {  // permission forms elements
    PERMISSION_FORMS_LINK: 'li a[href="/admin/permission_forms"]',

    MANAGE_STUDENT_PERMISSIONS_LINK: 'button:contains("Manage Student Permissions")',
    CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK: 'button:contains("Create / Manage Project Permission Forms")',

    MANAGE_STUDENT_PERMISSIONS_SELECT_PROJECT_DROPDOWN: 'div[class^="studentsTabContent"]    select[data-testid="project-select"]',
    CREATE_MANAGE_PROJECT_PERMISSION_SELECT_PROJECT_DD: 'div[class^="manageFormsTabContent"] select[data-testid="project-select"]',

    CREATE_NEW_PERMISSION_FORM_BUTTON: 'button:contains("Create New Permission Form")',
    CREATE_EDIT_PERMISSION_FORM_DIALOG: CREATE_EDIT_PERMISSION_FORM,
    CREATE_EDIT_PERM_SELECT_PROJECT_DD: CREATE_EDIT_PERMISSION_FORM+' select[data-testid="project-select"]',
    CREATE_EDIT_PERMISSION_FORM_NAME:   CREATE_EDIT_PERMISSION_FORM+' input[class^="name"]',
    CREATE_EDIT_PERMISSION_FORM_URL:    CREATE_EDIT_PERMISSION_FORM+' input[class^="url"]',
    CREATE_EDIT_PERMISSION_FORM_CANCEL: CREATE_EDIT_PERMISSION_FORM+' button[class^="cancelButton"]',
    CREATE_EDIT_PERMISSION_FORM_SAVE:   CREATE_EDIT_PERMISSION_FORM+' button:contains("Save")',
    CREATE_EDIT_PERM_FORM_SAVE_CHANGES: CREATE_EDIT_PERMISSION_FORM+' button:contains("Save Changes")',

    PERMISSION_FORMS_TABLE:             'div[class^="manageFormsTabContent"] table tbody',
    PERMISSION_FORMS_ROW:               'tr[class^="permissionFormRow"] td',
    PERMISSION_FORMS_TABLE_ROW:         'div[class^="manageFormsTabContent"] table tbody tr[class^="permissionFormRow"]',

    MANAGE_STUDENT_PERM_TEACHER_INPUT:  'div[class^="studentsTabContent"] input[type="text"]',
    MANAGE_STUDENT_PERM_SEARCH_BUTTON:  'div[class^="studentsTabContent"] button:contains("Search")',

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
    verifyManageStudentPermissionsLinkEnabled(enabled=true) {
        this.verifyElementIsVisible(pfe.MANAGE_STUDENT_PERMISSIONS_LINK, 'Manage Student Permissions');
        if (enabled) {
            cy.get(pfe.MANAGE_STUDENT_PERMISSIONS_LINK).invoke('attr', 'class').should('not.contain', 'disabled');
        } else {
            cy.get(pfe.MANAGE_STUDENT_PERMISSIONS_LINK).invoke('attr', 'class').should('contain', 'disabled');
        }
    },
    clickManageStudentPermissionsLink() {
        cy.get(pfe.MANAGE_STUDENT_PERMISSIONS_LINK).click();
    },

    // Link to the 'Create New Permission Form' tab (of the Permission Forms page)
    verifyCreateManageProjectPermissionFormsLinkEnabled(enabled=true) {
        this.verifyElementIsVisible(pfe.CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK, 'Create / Manage Project Permission Forms');
        if (enabled) {
            cy.get(pfe.CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK).invoke('attr', 'class').should('not.contain', 'disabled');
        } else {
            cy.get(pfe.CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK).invoke('attr', 'class').should('contain', 'disabled');
        }
    },
    clickCreateManageProjectPermissionFormsLink() {
        cy.get(pfe.CREATE_MANAGE_PROJECT_PERMISSION_FORMS_LINK).click();
    },

    // The Select Project Dropdown appears, almost identically, on the 'Create New Permission Form' tab ...
    verifyCreateManagePermissionsSelectProjectDropdown(project='Select a project...') {
        this.verifyElementIsVisible(pfe.CREATE_MANAGE_PROJECT_PERMISSION_SELECT_PROJECT_DD, project);
    },
    selectCreateManagePermissionsProject(project='Select a project...') {
        cy.get(pfe.CREATE_MANAGE_PROJECT_PERMISSION_SELECT_PROJECT_DD).first().select(project);
    },

    // ... and on the 'Manage Student Permissions' tab
    verifyManageStudentPermissionsSelectProjectDropdown(project='Select a project...') {
        this.verifyElementIsVisible(pfe.MANAGE_STUDENT_PERMISSIONS_SELECT_PROJECT_DROPDOWN, project);
    },
    selectManageStudentPermissionsProject(project='Select a project...') {
        cy.get(pfe.MANAGE_STUDENT_PERMISSIONS_SELECT_PROJECT_DROPDOWN).select(project);
    },


    // The button that brings up the 'Create New Permission Form' dialog
    verifyCreateNewPermissionFormButton() {
        this.verifyElementIsVisible(pfe.CREATE_NEW_PERMISSION_FORM_BUTTON, 'Create New Permission Form');
    },
    clickCreateNewPermissionFormButton() {
        cy.get(pfe.CREATE_NEW_PERMISSION_FORM_BUTTON).click();
    },

    // On the 'Create New Permission Form' dialog ...
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
    selectCreateEditPermissionFormProject(projectName='Select a project...') {
        cy.get(pfe.CREATE_EDIT_PERM_SELECT_PROJECT_DD).select(projectName);
    },
    getCreateEditPermissionFormProjectName() {
        return cy.get(pfe.CREATE_EDIT_PERM_SELECT_PROJECT_DD+' option:selected').invoke('text');
    },
    verifyCreateEditPermissionFormProjectName(projectName) {
        this.getCreateEditPermissionFormProjectName().should('equal', projectName);
    },
    enterCreateEditPermissionFormName(name) {
        if (name != null && name != '') {
            cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_NAME).clear();            
            cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_NAME).type(name);            
        }
    },
    enterCreateEditPermissionFormUrl(url) {
        if (url != null && url != '') {
            cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_URL).clear();            
            cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_URL).type(url);            
        }
    },
    clickCreateEditPermissionFormCancelButton() {
        cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_CANCEL).click();
    },

    // The 'Create New Permission Form' and 'EDIT Permission Form' dialogs are mostly the same,
    // so the above methods can be used for either one; but the former has a 'Save' button and
    // the latter a 'Save Changes' button, so these methods are slightly different
    clickCreatePermissionFormSaveButton() {
        cy.get(pfe.CREATE_EDIT_PERMISSION_FORM_SAVE).click();
    },
    clickEditPermissionFormSaveChangesButton() {
        cy.get(pfe.CREATE_EDIT_PERM_FORM_SAVE_CHANGES).click();
    },

    // A method that creates a new Permission Form, using most of the methods above
    createNewPermissionForm(project, name, url='', current_project=null, cancel=false) {
        if (current_project == null) {
            current_project='Select a project...'
        }
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
            this.clickCreatePermissionFormSaveButton();
        }
    },


    // On the 'EDIT: <Permission Form name>' dialog (almost identical to the 'Create New Permission Form' dialog)
    verifyEditPermissionFormDialog(project='', name='', url='', oldName=null) {
        if (oldName == null) {
            this.verifyElementIsPresent(pfe.CREATE_EDIT_PERMISSION_FORM_DIALOG, 'EDIT: '+name);
        } else {
            this.verifyElementIsPresent(pfe.CREATE_EDIT_PERMISSION_FORM_DIALOG, 'EDIT: '+oldName);
        }
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERM_SELECT_PROJECT_DD, project);
        this.verifyElementWithValueIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_NAME, name);
        this.verifyElementWithValueIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_URL,  url);
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_CANCEL, 'Cancel');
        this.verifyElementIsVisible(pfe.CREATE_EDIT_PERMISSION_FORM_SAVE,   'Save Changes');
    },

    // A method that edits an existing Permission Form, using methods above,
    // as createNewPermissionForm() does for a new Permission Form
    editPermissionForm(oldProjectName, oldPermFormName, oldUrl,
            newProjectName=null, newPerfFormName=null, newUrl=null, cancel=false) {
        this.clickPermissionFormEdit(oldPermFormName)
        this.verifyEditPermissionFormDialog(oldProjectName, oldPermFormName, oldUrl)

        let currentProjectName  = oldProjectName;
        let currentPermFormName = oldPermFormName;
        let currentUrl          = oldUrl;
        if (newProjectName != null && newProjectName != '') {
            this.selectCreateEditPermissionFormProject(newProjectName);
            currentProjectName = newProjectName;
        }
        if (newPerfFormName != null && newPerfFormName != '') {
            this.enterCreateEditPermissionFormName(newPerfFormName);
            currentPermFormName = newPerfFormName;
        }
        // the "URL" can be blank, unlike the others above, so a value of '' is allowed
        if (newUrl != null) {
            this.enterCreateEditPermissionFormUrl(newUrl);
            currentUrl = newUrl;
        }
        this.verifyEditPermissionFormDialog(currentProjectName, currentPermFormName, currentUrl, oldPermFormName);

        if (cancel) {
            this.clickCreateEditPermissionFormCancelButton();
        } else {
            this.clickEditPermissionFormSaveChangesButton();
        }
    },


    // Utility methods, used by the methods below
    getPermissionFormLinks(permissionFormName, linkClass, expectedText, tag='button', archived=false) {
        return cy.get(pfe.PERMISSION_FORMS_TABLE_ROW+':contains("'+permissionFormName+'") td[class^="'+linkClass+'"] '
            +tag+':contains("'+expectedText+'")');
    },
    getPermissionFormLink(permissionFormName, linkClass, expectedText, tag='button', archived=false) {
        return this.getPermissionFormLinks(permissionFormName, linkClass, expectedText, tag).first();
    },
    clickPermissionFormLink(permissionFormName, linkClass, expectedText, tag='button') {
        this.getPermissionFormLink(permissionFormName, linkClass, expectedText, tag).click()
    },

    // Click links in a specified row of the Permission Forms table
    clickPermissionFormEdit(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'editColumn', 'Edit');
    },
    clickPermissionFormArchive(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'archiveColumn', 'Archive');
    },
    clickPermissionFormUnarchive(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'archiveColumn', 'Unarchive', 'button', true);
    },
    clickPermissionFormDelete(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'deleteColumn', 'Delete');
    },
    // TODO: this is currently unused, because it would bring up another tab, which is hard to deal with in Cypress
    clickPermissionFormUrl(permissionFormName) {
        this.clickPermissionFormLink(permissionFormName, 'urlColumn', 'https://', 'a');
    },

    // Get / verify the permission form name and the text of a URL link
    getPermissionFormName(permissionFormName) {
        // TODO: fix this (the 'td' is redundant); or remove it if it's not needed
        return this.getPermissionFormLink(permissionFormName, 'nameColumn', permissionFormName, 'td').invoke('text');
    },
    verifyPermissionFormName(permissionFormName) {
        this.verifyElementIsVisible(pfe.PERMISSION_FORMS_TABLE_ROW+':contains("'
            +permissionFormName+'") td[class^="nameColumn"]', permissionFormName);
    },
    getPermissionFormUrlText(permissionFormName) {
        return this.getPermissionFormLink(permissionFormName, 'urlColumn', 'https://', 'a').invoke('text');
    },
    verifyPermissionFormUrlText(permissionFormName, expectedUrlText) {
        this.getPermissionFormUrlText(permissionFormName).should('contain', expectedUrlText);
    },


    // Get / verify the number of Permission Forms with a specified name
    getNumPermissionFormsWithName(permissionFormName) {
        // TODO: get this to work (just returns 'undefined')
        return cy.get('div[class^="manageFormsTabContent"] table tbody').first()
                 .get('tr[class^="permissionFormRow"]:contains("'+permissionFormName+'")').length;

        // An earlier attempt (also did not work):
        // return cy.get(pfe.PERMISSION_FORMS_TABLE).then((table) => {
        //     table.find(pfe.PERMISSION_FORMS_ROW+':contains("'+permissionFormName+'")');
        // });
    },
    verifyNumPermissionForms(permissionFormName, expectedNumber) {
        // TODO: get this to work
        cy.get(pfe.PERMISSION_FORMS_TABLE_ROW+':contains("'+permissionFormName+'")').should('have.length', expectedNumber);
    },


    // On the 'Manage Student Permissions' tab ...
    enterManageStudentPermTeacherName(teacherName) {
        if (teacherName != null && teacherName != '') {
            cy.get(pfe.MANAGE_STUDENT_PERM_TEACHER_INPUT).type(teacherName);            
        }
    },
    clickTeacherSearchButton() {
        cy.get(pfe.MANAGE_STUDENT_PERM_SEARCH_BUTTON).click();
    },

}
