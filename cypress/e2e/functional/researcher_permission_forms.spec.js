import * as c from '../../support/constants.js'
import {ResearcherPermissionFormsElements as pf} from "../../support/elements/researcher_permission_forms_elements";

const TEST_PROJECT_NAME = 'Test Project',
    TEST_PERMISSION_FORM_NAME = 'PermForm4CypressTests',
    TEST_PERMISSION_FORM_URL  = 'concord.org'
    // TODO: I don't know the password for c.RESEARCHER_USERNAME (i.e. 'researcher'), so I've created my own, for now
    , RESEARCHER_USERNAME = 'atestresearcherforcypresstesting'
;

context("Researcher uses permission forms", () => {

    before(function() {
        cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
        // cy.login(c.RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD); // Login as researcher user
        cy.login(RESEARCHER_USERNAME, c.RESEARCHER_PASSWORD); // Login as researcher user
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
        pf.verifyManageStudentPermissionsLink();
        pf.verifyManageStudentPermissionsLinkEnabled(false);
        pf.verifyCreateManageProjectPermissionFormsLink();
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled();

        cy.log('Click the Create / Manage Project Permission Forms link; then verify that only the Manage Student Permissions link is enabled');
        pf.clickCreateManageProjectPermissionFormsLink();
        pf.verifyManageStudentPermissionsLinkEnabled();
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled(false);

        cy.log('Click the Create New Permission Form button, fill in values in the dialog; but then click Cancel');
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME, 'google.com', true);

        cy.log('Fill in the Create New Permission Form dialog again, but this time, click the Save button');
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL,
            false, TEST_PROJECT_NAME);

        cy.log('Create more Permission Forms, to be used to test the Archive, Unarchive & Delete buttons');
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL,
            false, TEST_PROJECT_NAME);
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL,
            false, TEST_PROJECT_NAME);
        pf.createNewPermissionForm(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'4', 'learn.portal.staging.'+TEST_PERMISSION_FORM_URL,
            false, TEST_PROJECT_NAME);

        // TODO: Replace this unnecessary line(s) with a check that the Project name displayed is the one that we expect
        // cy.log("Select a Project from the dropdown (on the 'Create New Permission Form' tab)");
        // pf.selectCreateManagePermissionsProject(TEST_PROJECT_NAME);

        cy.log('Test the links on the Permission Forms table, starting with URL text, Archive, and Unarchive');
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL);
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL);
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL);

        // TODO: fix clicking on archived rows, then uncomment these:
        // pf.clickPermissionFormArchive(TEST_PERMISSION_FORM_NAME+'2');
        // pf.clickPermissionFormArchive(TEST_PERMISSION_FORM_NAME+'3');
        // pf.clickPermissionFormUnarchive(TEST_PERMISSION_FORM_NAME+'3');

        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL);
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL);
        pf.verifyPermissionFormUrlText(TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL);

        cy.log('Test the Edit link, for an Archived, an Unarchived and a never-Archived Permision Form');
        pf.clickPermissionFormEdit(TEST_PERMISSION_FORM_NAME+'2');
        pf.verifyEditPermissionFormDialog(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'2', 'www.'+TEST_PERMISSION_FORM_URL);
        pf.clickCreateEditPermissionFormCancelButton();

        pf.clickPermissionFormEdit(TEST_PERMISSION_FORM_NAME+'3');
        pf.verifyEditPermissionFormDialog(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'3', 'learn.'+TEST_PERMISSION_FORM_URL);
        pf.clickCreateEditPermissionFormCancelButton();

        pf.clickPermissionFormEdit(TEST_PERMISSION_FORM_NAME+'1');
        pf.verifyEditPermissionFormDialog(TEST_PROJECT_NAME, TEST_PERMISSION_FORM_NAME+'1', TEST_PERMISSION_FORM_URL);
        pf.clickCreateEditPermissionFormCancelButton();

        // TODO: add more testing of the Edit Permission Form Dialog (without clicking the 'Cancel' button)

        cy.log('Test the Delete link, for an Archived, an Unarchived and a never-Archived Permision Form');
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'2');
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'3');
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'4');

        cy.log('Move to the Manage Student Permissions tab, checking the Enabled & Disabled links before and after');
        pf.verifyManageStudentPermissionsLinkEnabled();
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled(false);
        pf.clickManageStudentPermissionsLink();
        pf.verifyManageStudentPermissionsLinkEnabled(false);
        pf.verifyCreateManageProjectPermissionFormsLinkEnabled();

        // TODO: add tests of the Manage Student Permissions tab (see PT story #187863588)
        cy.log('Test the Manage Student Permissions tab');

        cy.log('Delete the remaining Permission Form(s) created by this test');
        pf.clickCreateManageProjectPermissionFormsLink();
        pf.clickPermissionFormDelete(TEST_PERMISSION_FORM_NAME+'1');



    });
});
