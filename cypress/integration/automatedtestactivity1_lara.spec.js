import { uid } from 'uid';

import Constants from '../support/constants.js';
import * as TeacherHelper from "../support/helpers/teacherHelper";
import {
    BTN_ACTIVITY_RUN,
    getLinkGenerateReport
} from "../support/elements/student_home_page_elements";
import * as adminHelper from "../support/helpers/adminHelper";
import teacherHomePageElements from "../support/elements/teacher_home_page_elements";
import assignmentsPageElements from "../support/elements/assignments_page_elements";
import * as LaraRuntimeHelper from '../support/helpers/laraRuntimeHelper';
import {automatedtestactivity1LaraData} from "../support/testdata/testdata_automatedtestactivity1_lara";
import * as ReportHelper from '../support/helpers/reportHelper';

const CLASS_WORD = Constants.CLASS_WORD;
const CLASS_NAME = 'AutoClass '+ CLASS_WORD;
const ASSIGNMENT_NAME = 'AutomatedTestActivity1_LARA';

context("Verify Student Activity Work Flow", () => {

    before(function() {
        cy.visit(Constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    });

    it("Edit portal settings to open activity in same browser tab", () => {
        cy.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD);
        adminHelper.disableOpenInNewWindow(ASSIGNMENT_NAME);
        cy.logout();
    });

    it("Verify teacher adds class, assignment and 5 students to class", () => {
        cy.login(Constants.TEACHER_USERNAME, Constants.TEACHER_PASSWORD);
        TeacherHelper.addClass(CLASS_NAME, CLASS_NAME, CLASS_WORD);
        TeacherHelper.addAssignment(CLASS_NAME, ASSIGNMENT_NAME);
        let studentCount = automatedtestactivity1LaraData.students.totalStudentsAssigned;
        for(let studentIndex = 1 ; studentIndex <= studentCount; studentIndex++){
            let studentObj = automatedtestactivity1LaraData.students[studentIndex];
            TeacherHelper.addStudentToClass(studentObj.username, studentObj.firstName, studentObj.lastName, CLASS_NAME);
        }
        cy.logout();
    });

    it("Run the assignment with 5 students added to the class", () => {

        let studentCount = automatedtestactivity1LaraData.students.totalStudentsAssigned;

        for(let studentIndex = 1 ; studentIndex <= studentCount; studentIndex++){
            let studentObj = automatedtestactivity1LaraData.students[studentIndex];

            cy.login(studentObj.username, studentObj.password);

            BTN_ACTIVITY_RUN(CLASS_NAME).click();

            let totalPagesInAssignment = automatedtestactivity1LaraData.assignmentPages.totalPages;
            for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment; pageIndex++){

                LaraRuntimeHelper.goToPageNumber(pageIndex);
                if(automatedtestactivity1LaraData.assignmentPages[pageIndex] === undefined){
                    continue;
                }

                let questionsInThisPage = automatedtestactivity1LaraData.assignmentPages[pageIndex].questions;

                let totalQuestionsInPage = questionsInThisPage.totalQuestionsInPage;

                for(let questionIndex = 1 ; questionIndex <= totalQuestionsInPage; questionIndex++){
                    let currentQuestion = questionsInThisPage[questionIndex];
                    if(currentQuestion === null || currentQuestion === undefined){
                        continue;
                    }
                    LaraRuntimeHelper.answerQuestion(questionIndex, currentQuestion, studentObj.username);
                }
            }
            //THIS WILL END ASSIGNMENT AND LOGOUT
            LaraRuntimeHelper.endAssignment();
        }
    });

    it("Verify teacher can verify reports and provide feedback", () => {
        cy.login(Constants.TEACHER_USERNAME, Constants.TEACHER_PASSWORD);
        cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').click();
        cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).click();
        cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, CLASS_NAME).contains('li a', 'Assignments').click();
        cy.get(assignmentsPageElements.BTN_SHOW_DETAILS_ASSIGNMENT).click();
        cy.get(assignmentsPageElements.BTN_REPORT).invoke('removeAttr', 'target').click();
        cy.wait(2000);

        let totalPagesInAssignment = automatedtestactivity1LaraData.assignmentPages.totalPages;
        for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment; pageIndex++){

            if(automatedtestactivity1LaraData.assignmentPages[pageIndex] === undefined){
                continue;
            }

            let questionsInThisPage = automatedtestactivity1LaraData.assignmentPages[pageIndex].questions;

            let totalQuestionsInPage = questionsInThisPage.totalQuestionsInPage;

            for(let questionIndex = 1 ; questionIndex <= totalQuestionsInPage; questionIndex++) {
                let currentQuestion = questionsInThisPage[questionIndex];
                ReportHelper.verifyReportForAQuestion(pageIndex, questionIndex, currentQuestion, automatedtestactivity1LaraData.students);
                ReportHelper.provideFeedbackForAQuestion(pageIndex, questionIndex, currentQuestion, automatedtestactivity1LaraData.students);
            }
        }
        ReportHelper.provideOverallFeedback(automatedtestactivity1LaraData.students, automatedtestactivity1LaraData.overallFeedback);
        cy.go("back");
        cy.logout();
    });

    it("Verify student can see the feedback from their teacher", () => {
        let studentCount = automatedtestactivity1LaraData.students.totalStudentsAssigned;
        for(let studentIndex = 1; studentIndex <= studentCount; studentIndex++){
            let studentObj = automatedtestactivity1LaraData.students[studentIndex];
            cy.login(studentObj.username, studentObj.password);
            let studentGenerateReportLnk = getLinkGenerateReport(CLASS_NAME);
            studentGenerateReportLnk.invoke('removeAttr', 'target').click();
            let totalPagesInAssignment = automatedtestactivity1LaraData.assignmentPages.totalPages;
            for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment; pageIndex++){

                if(automatedtestactivity1LaraData.assignmentPages[pageIndex] === undefined){
                    continue;
                }

                let questionsInThisPage = automatedtestactivity1LaraData.assignmentPages[pageIndex].questions;

                let totalQuestionsInPage = questionsInThisPage.totalQuestionsInPage;

                for(let questionIndex = 1 ; questionIndex <= totalQuestionsInPage; questionIndex++) {
                    let currentQuestion = questionsInThisPage[questionIndex];
                    ReportHelper.viewTeachersFeedbackForAQuestion(pageIndex, questionIndex, currentQuestion, studentObj.username);
                }

            }
            cy.go('back'); //Student report page do not have any links back to portal.
            cy.logout();
        }
    });

    it("Verify teacher archive class", () => {
        cy.login(Constants.TEACHER_USERNAME, Constants.TEACHER_PASSWORD); // Login as admin user
        TeacherHelper.archiveClass(CLASS_NAME);
        cy.logout();
    });
});