import { uid } from 'uid';

import * as TeacherHelper from "../../support/helpers/teacherHelper";
import {
    BTN_ACTIVITY_RUN,
    getLinkGenerateReport
} from "../../support/elements/student_home_page_elements";
import * as adminHelper from "../../support/helpers/adminHelper";
import automatedtestActivity1APData from "../../support/testdata/testdata_automatedtestactivity1_ap";
import * as apRuntimeHelper from '../../support/helpers/apRuntimeHelper';
import teacherHomePageElements from "../../support/elements/teacher_home_page_elements";
import assignmentsPageElements from "../../support/elements/assignments_page_elements";
import * as assignmentPageFunctions from '../../support/elements/assignments_page_elements';
import * as ReportHelper from "../../support/helpers/reportHelper";
import * as C from "../../support/constants";
import * as c from "../../support/constants";

const CLASS_WORD = C.CLASS_WORD;
const CLASS_NAME = 'Class '+ CLASS_WORD;
const ASSIGNMENT_NAME = 'Cypress_AutomatedTestActivity1_AP';
const STUDENTS = ["STUDENT1", "STUDENT2", "STUDENT3", "STUDENT4", "STUDENT5"];

context("Verify Student Acitivty Player Activity Work Flow", () => {

    before(function() {
        cy.visit(C.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    });

    it("Edit portal settings to open activity in same browser tab", () => {
        cy.login(C.ADMIN_USERNAME, C.ADMIN_PASSWORD);
        adminHelper.disableOpenInNewWindow(ASSIGNMENT_NAME);
        cy.logout();
    });

    it("Verify teacher adds class, assignment and 5 students to class", () => {
        cy.login(C.TEACHER1_USERNAME, C.TEACHER1_PASSWORD);
        TeacherHelper.addClass(CLASS_NAME, CLASS_NAME, CLASS_WORD);
        TeacherHelper.addAssignment(CLASS_NAME, ASSIGNMENT_NAME);
        TeacherHelper.openStudentRosterSection(CLASS_NAME);
        STUDENTS.forEach(eachStudent => {
            var username = C[eachStudent + '_USERNAME'];
            var firstName = C[eachStudent + '_FIRSTNAME'];
            var lastName = C[eachStudent + '_LASTNAME'];
            TeacherHelper.addRegisteredStudentToClass(username, firstName, lastName, CLASS_NAME);
        });
        cy.logout();
    });

    it("Verify student submitting answers", () => {
        let studentIndex = 0;
        STUDENTS.forEach(eachStudent => {
           let studentObj = {
             firstName: C[eachStudent + '_FIRSTNAME'],
             lastName: C[eachStudent + '_LASTNAME'],
             username: C[eachStudent + '_USERNAME'],
             password: C[eachStudent + '_PASSWORD'],
           };
            studentIndex++;
            cy.login(studentObj.username, studentObj.password);
            BTN_ACTIVITY_RUN(CLASS_NAME).click();
            let totalPagesInAssignment = automatedtestActivity1APData.assignmentPages.totalPages;
            for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment; pageIndex++){
                // let questionsInThisPage = automatedtestActivity1APData.assignmentPages[pageIndex].questions;
                let currentPageQuestions = automatedtestActivity1APData.assignmentPages[pageIndex];
                apRuntimeHelper.gotoPage(pageIndex);
                apRuntimeHelper.answerQuestionsInPage(pageIndex, currentPageQuestions.questions, studentIndex);
            }
            //Show report button is opening in a new tab in activity player. There is no target tag to remove.
            //Till we figure out a way to view the report, not clicking on the show report.
            // apRuntimeHelper.showReport();
            apRuntimeHelper.gotoPage(0);
            cy.go("back");
            cy.logout();
        });
    });

    it("Verify teacher can verify reports and provide feedback", () => {
        cy.login(C.TEACHER1_USERNAME, C.TEACHER1_PASSWORD);
        cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').click();
        cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).click();
        cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).contains('li a', 'Assignments').click();
        cy.get(assignmentsPageElements.BTN_SHOW_DETAILS_ASSIGNMENT).click();
        assignmentPageFunctions.getAPAssignmentSectionElement(ASSIGNMENT_NAME).invoke('removeAttr', 'target').click();

        let totalPagesInAssignment = automatedtestActivity1APData.assignmentPages.totalPages;
        for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment; pageIndex++){

            if(automatedtestActivity1APData.assignmentPages[pageIndex] === undefined){
                continue;
            }

            let questionsInThisPage = automatedtestActivity1APData.assignmentPages[pageIndex].questions;

            let totalQuestionsInPage = questionsInThisPage.totalQuestionsInPage;

            for(let questionIndex = 1 ; questionIndex <= totalQuestionsInPage; questionIndex++) {
                let currentQuestion = questionsInThisPage[questionIndex];
                ReportHelper.verifyReportForAQuestion(pageIndex, questionIndex, currentQuestion, STUDENTS);
                ReportHelper.provideFeedbackForAQuestion(pageIndex, questionIndex, currentQuestion, STUDENTS);
            }
        }
        // ReportHelper.provideOverallFeedback(STUDENTS, automatedtestActivity1APData.overallFeedback);
        cy.go("back");
        cy.logout();
    });

    it("Verify student can see the feedback from their teacher", () => {
        let studentIndex = 0;

        STUDENTS.forEach(eachStudent => {
            let studentObj = {
                firstName: C[eachStudent + '_FIRSTNAME'],
                lastName: C[eachStudent + '_LASTNAME'],
                username: C[eachStudent + '_USERNAME'],
                password: C[eachStudent + '_PASSWORD'],
            };
            studentIndex++;
            cy.login(studentObj.username, studentObj.password);
            let studentGenerateReportLnk = getLinkGenerateReport(CLASS_NAME, 'AP Report');
            studentGenerateReportLnk.invoke('removeAttr', 'target').click();
            let totalPagesInAssignment = automatedtestActivity1APData.assignmentPages.totalPages;
            for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment; pageIndex++){

                if(automatedtestActivity1APData.assignmentPages[pageIndex] === undefined){
                    continue;
                }

                let questionsInThisPage = automatedtestActivity1APData.assignmentPages[pageIndex].questions;

                let totalQuestionsInPage = questionsInThisPage.totalQuestionsInPage;

                for(let questionIndex = 1 ; questionIndex <= totalQuestionsInPage; questionIndex++) {
                    let currentQuestion = questionsInThisPage[questionIndex];
                    ReportHelper.viewTeachersFeedbackForAQuestion(pageIndex, questionIndex, currentQuestion, studentIndex);
                }

            }
            cy.go('back'); //Student report page do not have any links back to portal.
            cy.logout();
        });
    });

    it("Verify teacher archive class", () => {
        cy.visit(C.LEARN_PORTAL_BASE_URL); //even if the previous test fails in loading the report this test will pass with this.
        cy.login(C.TEACHER1_USERNAME, C.TEACHER1_PASSWORD); // Login as admin user
        TeacherHelper.archiveClass(CLASS_NAME);
        cy.logout();
    });

});
