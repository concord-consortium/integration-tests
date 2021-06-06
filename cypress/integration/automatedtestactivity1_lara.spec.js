import { uid } from 'uid';

import Constants from '../support/constants.js';
import automatedTestActivity1_Lara from "../support/elements/automated_test_activity1_lara_elements";
import * as TeacherHelper from "../support/helpers/teacherHelper";
import {BTN_ACTIVITY_RUN} from "../support/elements/student_home_page_elements";
import * as ACTIVITY_PAGES from "../support/elements/activity_pagination_header";
import * as adminHelper from "../support/helpers/adminHelper";
import studentRosterPageElements from "../support/elements/student_roster_page_elements";

const CLASS_WORD = Constants.CLASS_WORD;
const CLASS_NAME = 'AutoClass '+ CLASS_WORD;
const ASSIGNMENT_NAME = 'AutomatedTestActivity1_LARA';

context("Verify Student Activity Work Flow", () => {

    before(function() {
        cy.visit(Constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    });

    after(function() {
        cy.login(Constants.TEACHER_USERNAME, Constants.TEACHER_PASSWORD); // Login as admin user
        TeacherHelper.archiveClass(CLASS_NAME);
        cy.logout();
    });

    it("Edit portal settings to open activity in same browser tab", () => {
        cy.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD);
        adminHelper.disableOpenInNewWindow(ASSIGNMENT_NAME);
        cy.logout();
    });

    it("Verify teacher creates class and assignment and adds student to class", () => {
        cy.login(Constants.TEACHER_USERNAME, Constants.TEACHER_PASSWORD);
        TeacherHelper.addClass(CLASS_NAME, CLASS_NAME, CLASS_WORD);
        TeacherHelper.addAssignment(CLASS_NAME, ASSIGNMENT_NAME);
        TeacherHelper.addStudentToClass(Constants.STUDENT_USERNAME, Constants.STUDENT_FIRSTNAME,
                                    Constants.STUDENT_LASTNAME, CLASS_NAME);
        TeacherHelper.verifyStudentCount('1');
        cy.logout();
    });

    it("Verify Student Running Assignment", () => {
        cy.login(Constants.STUDENT_USERNAME, Constants.STUDENT_PASSWORD);
        BTN_ACTIVITY_RUN(CLASS_NAME).click();
        cy.get(ACTIVITY_PAGES.BTN_ACTIVITY_PAGE(1)).click();
        cy.get(automatedTestActivity1_Lara.TXT_PAGE1_QUESTION1_OPENRESPONSE_ANSWER).type('This is great question 1');
        cy.get(automatedTestActivity1_Lara.TXT_PAGE1_QUESTION2_OPENRESPONSE_ANSWER).type('This is great question 2');

        cy.get(ACTIVITY_PAGES.BTN_ACTIVITY_PAGE(2)).click();
        cy.get(automatedTestActivity1_Lara.CHK_PAGE2_QUESTION3_MCQ_CHOICE1).click();
        cy.get(automatedTestActivity1_Lara.CHK_PAGE2_QUESTION3_MCQ_CHOICE2).click();

        cy.get(automatedTestActivity1_Lara.BTN_SUBMIT_PAGE2_QUESTION3_MCQ).click();

        cy.get(automatedTestActivity1_Lara.CHK_PAGE2_QUESTION4_MCQ_CHOICE2).click();

        cy.get(ACTIVITY_PAGES.BTN_ACTIVITY_PAGE(3)).click();

        //TODO: Generate Report button click opens the report page which do not have any links to logout or to go to home page.
        //So, not clicking on GENERATE REPORT button for now.
        //cy.get(automatedTestActivity1_Lara.BTN_GENERATE_REPORT).click();

        cy.get(automatedTestActivity1_Lara.LNK_ADMIN_ACTIVITY_END).click();
        cy.get(automatedTestActivity1_Lara.LNK_NOT_YOU).click();

    });

});