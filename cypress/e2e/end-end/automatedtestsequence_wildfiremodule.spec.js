import * as C from '../../support/constants.js'
import * as TeacherHelper from "../../support/helpers/teacherHelper";
import {
    BTN_ACTIVITY_RUN,
    joinClass,
    getLinkGenerateReport
} from "../../support/elements/student_home_page_elements";
import * as adminHelper from "../../support/helpers/adminHelper";
import teacherHomePageElements from "../../support/elements/teacher_home_page_elements";
import assignmentsPageElements from "../../support/elements/assignments_page_elements";
import {automatedtestSequenceWildFireModuleData} from "../../support/testdata/testdata_automatedtestsequence_wildfiremodule";
import * as LaraSequenceHelper from '../../support/helpers/laraSequenceHelper';
import * as ReportHelper from '../../support/helpers/genericReportHelper';
import laraSequenceElements from "../../support/elements/lara_sequence_elements";
import * as laraRuntimeHelper from "../../support/helpers/laraRuntimeHelper";

const CLASS_WORD = C.CLASS_WORD;
const CLASS_NAME = 'Class '+ CLASS_WORD;
const ASSIGNMENT_NAME = 'Cypress_AutomatedWildfire_Module';
const STUDENTS = ["STUDENT1"];


context("Verify Student Activity Work Flow", () => {

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
        cy.logout();
    });

    it("Verify students can use the class word and add themselves to the class", () => {
        STUDENTS.forEach(eachStudent => {
            cy.login(C[eachStudent + '_USERNAME'], C[eachStudent + '_PASSWORD']);
            joinClass(CLASS_WORD);
            cy.logout();
        });
    })

    it("Run the assignment with students added to the class", () => {
        let totalActivitiesInSequence = automatedtestSequenceWildFireModuleData.totalActivities;
        let studentIndex = 0;
        STUDENTS.forEach(eachStudent => {
            let studentDetails = {
                username: C[eachStudent + '_USERNAME'],
                firstName: C[eachStudent + '_FIRSTNAME'],
                lastName: C[eachStudent + '_LASTNAME'],
                password: C[eachStudent + '_PASSWORD'],
            }
            studentIndex++;
            cy.login(studentDetails.username, studentDetails.password);
            // BTN_ACTIVITY_RUN(CLASS_NAME).click();
            BTN_ACTIVITY_RUN(CLASS_NAME).click();
            for(let activityIndex = 1 ; activityIndex <= totalActivitiesInSequence - 4; activityIndex++){
                let currentActivity = automatedtestSequenceWildFireModuleData[activityIndex];
                let activityName = currentActivity.name;
                cy.wait(15000);
                LaraSequenceHelper.verifyLaraSequenceHeader(ASSIGNMENT_NAME);
                // cy.get(laraSequenceElements.LNK_HEADER_SEQUENCE_NAME).contains(ASSIGNMENT_NAME).click();
                // cy.wait(2000);
                cy.get(laraSequenceElements.LBL_ESTIMATED_TIME_IN_MINUTES).should('have.text', automatedtestSequenceWildFireModuleData.timeInMinutes);
                LaraSequenceHelper.goToActivity(activityIndex - 1);
                LaraSequenceHelper.goToActivityHome(activityName);
                LaraSequenceHelper.answerLaraActivity(activityName, currentActivity, studentIndex);
            }
            cy.go("back");
            cy.logout();

        });
    });

    it("Run the wildfire sim as students", () => {
        let totalActivitiesInSequence = automatedtestSequenceWildFireModuleData.totalActivities;
        let studentIndex = 0;
        STUDENTS.forEach(eachStudent => {
            let studentDetails = {
                username: C[eachStudent + '_USERNAME'],
                firstName: C[eachStudent + '_FIRSTNAME'],
                lastName: C[eachStudent + '_LASTNAME'],
                password: C[eachStudent + '_PASSWORD'],
            }
            studentIndex++;
            cy.login(studentDetails.username, studentDetails.password);
            // BTN_ACTIVITY_RUN(CLASS_NAME).click();
            BTN_ACTIVITY_RUN(CLASS_NAME).click();
            for(let activityIndex = 2 ; activityIndex <= totalActivitiesInSequence - 4; activityIndex++){
                let currentActivity = automatedtestSequenceWildFireModuleData[activityIndex];
                let activityName = currentActivity.name;
                cy.wait(15000);
                LaraSequenceHelper.verifyLaraSequenceHeader(ASSIGNMENT_NAME);
                // cy.get(laraSequenceElements.LNK_HEADER_SEQUENCE_NAME).contains(ASSIGNMENT_NAME).click();
                // cy.wait(2000);
                cy.get(laraSequenceElements.LBL_ESTIMATED_TIME_IN_MINUTES).should('have.text', automatedtestSequenceWildFireModuleData.timeInMinutes);
                LaraSequenceHelper.goToActivity(activityIndex - 1);
                LaraSequenceHelper.goToActivityHome(activityName);
                LaraSequenceHelper.answerWildFireSim();
            }
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
        cy.get(assignmentsPageElements.BTN_REPORT).contains('a', 'Report').invoke('removeAttr', 'target').click();
        cy.wait(6000);

        let totalActivities = automatedtestSequenceWildFireModuleData.totalActivities;
        for(let activityIndex = 1; activityIndex <= totalActivities - 5; activityIndex++){
            let currentActivity = automatedtestSequenceWildFireModuleData[activityIndex];
            let totalPagesInAssignment = currentActivity.assignmentPages.totalPages;

            for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment - 1; pageIndex++){

                if(currentActivity.assignmentPages[pageIndex] === undefined){
                    continue;
                }

                let questionsInThisPage = currentActivity.assignmentPages[pageIndex].questions;

                let totalQuestionsInPage = questionsInThisPage.totalQuestionsInPage;

                for(let questionIndex = 1 ; questionIndex <= totalQuestionsInPage; questionIndex++) {
                    let currentQuestion = questionsInThisPage[questionIndex];
                    ReportHelper.verifyReportForAQuestion(activityIndex, pageIndex, questionIndex, currentQuestion, STUDENTS);
                    ReportHelper.provideFeedbackForAQuestion(activityIndex, pageIndex, questionIndex, currentQuestion, STUDENTS);
                }
            }
        }
        // ReportHelper.provideOverallFeedback(automatedtestactivity1LaraData.students, automatedtestactivity1LaraData.overallFeedback);
        cy.go("back");
        cy.logout();
    });

    it("Verify student can see the feedback from their teacher", () => {
        let studentIndex = 0;
        STUDENTS.forEach(eachStudent => {
            let studentObj = {
                username: C[eachStudent + '_USERNAME'],
                firstName: C[eachStudent + '_FIRSTNAME'],
                lastName: C[eachStudent + '_LASTNAME'],
                password: C[eachStudent + '_PASSWORD'],
            }
            studentIndex++;
            cy.login(studentObj.username, studentObj.password);
            let studentGenerateReportLnk = getLinkGenerateReport(CLASS_NAME, 'Report');
            studentGenerateReportLnk.invoke('removeAttr', 'target').click();
            let totalActivities = automatedtestSequenceWildFireModuleData.totalActivities;
            for(let activityIndex = 1; activityIndex <= totalActivities - 5; activityIndex++) {
                let currentActivity = automatedtestSequenceWildFireModuleData[activityIndex];
                let totalPagesInAssignment = currentActivity.assignmentPages.totalPages;
                for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment - 1; pageIndex++){

                    if(currentActivity.assignmentPages[pageIndex] === undefined){
                        continue;
                    }

                    let questionsInThisPage = currentActivity.assignmentPages[pageIndex].questions;

                    let totalQuestionsInPage = questionsInThisPage.totalQuestionsInPage;

                    for(let questionIndex = 1 ; questionIndex <= totalQuestionsInPage; questionIndex++) {
                        let currentQuestion = questionsInThisPage[questionIndex];
                        ReportHelper.viewTeachersFeedbackForAQuestion(activityIndex, pageIndex, questionIndex, currentQuestion, studentIndex);
                    }

                }
            }
            cy.go('back'); //Student report page do not have any links back to portal.
            cy.logout();
        });

    });
});
