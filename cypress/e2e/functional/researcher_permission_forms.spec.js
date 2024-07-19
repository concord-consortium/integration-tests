import * as c from '../../support/constants.js'
import {ResearcherPermissionFormsElements as pf} from "../../support/elements/researcher_permission_forms_elements";

const TEST_PROJECT_NAME = 'Cypress Test Project',
    OTHER_TEST_PROJECT_NAME = 'Test Project',
    TEST_PERMISSION_FORM_NAME = 'PermForm4CypressTests',
    TEST_PERMISSION_FORM_URL  = 'concord.org';

context("Researcher uses permission forms", () => {

    before(function() {
        cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
        cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD); // Login as user 'researcher'
    });
    
    after(function() {
        cy.clearAllCookies();
    });

    it("Tests Permission forms", () => {
        cy.log('Verify, and then click, the Admin link');
        pf.verifyAdminLink();
        pf.clickAdminLink();

        cy.log('Verify, and then click, the Permission Forms link');
        pf.verifyPermissionFormsLink();
        pf.clickPermissionFormsLink();

        cy.log('Verify that both links exist; but only the Create / Manage Project Permission Forms link is enabled');
        pf.verifyManageStudentPermissionsLinkEnabled(false);
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled();

        cy.log('Click the Create / Manage Project Permission Forms link; then verify that only the Manage Student Permissions link is enabled');
        pf.clickCreateManageProjectPermissionFormsLink();
        pf.verifyManageStudentPermissionsLinkEnabled();
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled(false);

        cy.log('Click the Create New Permission Form button, fill in values in the dialog; but then click Cancel');
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'0', 'google.com', null, true);

        cy.log('Fill in the Create New Permission Form dialog again, but this time, click the Save button');
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL,
            TEST_PROJECT_NAME);

        cy.log('Confirm that the expected Project name is selected');
        pf.verifyCreateEditPermissionFormProjectName(TEST_PROJECT_NAME);
    
        cy.log('Create more Permission Forms, to be used to test the Archive, Unarchive & Delete buttons');
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL,
            TEST_PROJECT_NAME);
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL,
            TEST_PROJECT_NAME);

        cy.log('Create still more Permission Forms, to be used to test the Manage Student Permissions tab');
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'4', 'learn.portal.staging.'+TEST_PERMISSION_FORM_URL,
            TEST_PROJECT_NAME);
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'5', 'www.'+TEST_PERMISSION_FORM_URL,
            TEST_PROJECT_NAME);
    
        cy.log('Confirm that the expected Project name is still selected');
        pf.verifyCreateEditPermissionFormProjectName(TEST_PROJECT_NAME);

        cy.log('Test the links on the Permission Forms table, starting with the URL text, ARCHIVE, and UNARCHIVE');
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL);
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL);
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL);

        pf.clickPermissionFormArchive(TEST_PERMISSION_FORM_NAME+'2');
        pf.clickPermissionFormArchive(TEST_PERMISSION_FORM_NAME+'3');
        pf.clickPermissionFormUnarchive(TEST_PERMISSION_FORM_NAME+'3');

        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL);
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL);
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL);

        cy.log('Confirm the expected Permission Form names are present');
        pf.verifyPermissionFormName(TEST_PERMISSION_FORM_NAME+'1');
        pf.verifyPermissionFormName(TEST_PERMISSION_FORM_NAME+'2');
        pf.verifyPermissionFormName(TEST_PERMISSION_FORM_NAME+'3');
        pf.verifyPermissionFormName(TEST_PERMISSION_FORM_NAME+'4');
        pf.verifyPermissionFormName(TEST_PERMISSION_FORM_NAME+'5');

        cy.log('Test the Edit link & dialog, for a never-Archived, an Archived, and an Unarchived Permision Form; but click Cancel');
        pf.editPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL,
            OTHER_TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'1_cancel_changes', 'cancel_changes.'+TEST_PERMISSION_FORM_URL, true);
        pf.editPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL,
            OTHER_TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'2_cancel_changes', 'cancel_changes.'+TEST_PERMISSION_FORM_URL, true);
        pf.editPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL,
            OTHER_TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'3_cancel_changes', 'cancel_changes.'+TEST_PERMISSION_FORM_URL, true);
        
        cy.log('Test the Edit link & dialog, for a never-Archived, an Archived, and an Unarchived Permision Form; this time, Save Changes');
        pf.selectCreateManagePermissionsProject();
        pf.editPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL,
            null, TEST_PERMISSION_FORM_NAME+'1_modified', 'modified.'+TEST_PERMISSION_FORM_URL);
        pf.editPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL,
            OTHER_TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'2_modified', 'modified.'+TEST_PERMISSION_FORM_URL);
        pf.selectCreateManagePermissionsProject(TEST_PROJECT_NAME);
        pf.editPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL,
            OTHER_TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'3_modified', 'modified.'+TEST_PERMISSION_FORM_URL);

        // TODO: Count the number of Permission Forms, before Deleting them
        // cy.log('Count the number of Permission Forms, before Deleting them');
        // pf.selectCreateManagePermissionsProject();
        // let numPermForm1 = pf.getNumPermissionFormsWithName(TEST_PERMISSION_FORM_NAME+'1_modified');
        // cy.log('Num forms w. name '+TEST_PERMISSION_FORM_NAME+'1_modified: '+numPermForm1);

        cy.log('Test the Delete link, for a never-Archived, an Archived, and an Unarchived Permision Form');
        pf.selectCreateManagePermissionsProject(TEST_PROJECT_NAME);
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'1_modified');
        pf.selectCreateManagePermissionsProject(OTHER_TEST_PROJECT_NAME);
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'2_modified');
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'3_modified');

        // TODO: Confirm deletion, by counting the number again & comparing
        // cy.log('Confirm that the Permission Forms were deleted');

        cy.log('Move to the Manage Student Permissions tab, checking the Enabled & Disabled links before and after');
        pf.verifyManageStudentPermissionsLinkEnabled();
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled(false);
        pf.clickManageStudentPermissionsLink();
        pf.verifyManageStudentPermissionsLinkEnabled(false);
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled();

        cy.log('Test the Manage Student Permissions tab ...');
        cy.log('Select the Project Name');
        pf.selectManageStudentPermissionsProject(TEST_PROJECT_NAME);

        // TODO: Test the Manage Student Permissions tab more

        cy.log('Verify that both links still exist; but only the Create / Manage Project Permission Forms link is enabled');
        pf.verifyManageStudentPermissionsLinkEnabled(false);
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled();

        cy.log('Click the Create / Manage Project Permission Forms link (again); then verify that only the Manage Student Permissions link is enabled');
        pf.clickCreateManageProjectPermissionFormsLink();
        pf.verifyManageStudentPermissionsLinkEnabled();
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled(false);

        cy.log('Delete the remaining Permission Form(s) created by this test; and confirm deletion');
        pf.selectCreateManagePermissionsProject();
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'4');
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'5');
        // TODO: Confirm deletion
    });
});
