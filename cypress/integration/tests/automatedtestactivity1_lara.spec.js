import * as c from '../../support/constants.js'
import * as TeacherHelper from "../../support/helpers/teacherHelper";
import {
    BTN_ACTIVITY_RUN,
    getLinkGenerateReport
} from "../../support/elements/student_home_page_elements";
import * as adminHelper from "../../support/helpers/adminHelper";
import teacherHomePageElements from "../../support/elements/teacher_home_page_elements";
import assignmentsPageElements from "../../support/elements/assignments_page_elements";
import * as LaraRuntimeHelper from '../../support/helpers/laraRuntimeHelper';
import {automatedtestactivity1LaraData} from "../../support/testdata/testdata_automatedtestactivity1_lara";
import * as ReportHelper from '../../support/helpers/reportHelper';

const CLASS_WORD = c.CLASS_WORD;
const CLASS_NAME = 'Class '+ CLASS_WORD;
const ASSIGNMENT_NAME = 'Cypress_AutomatedTestActivity1_LARA';
const STUDENTS = ["STUDENT1", "STUDENT2", "STUDENT3", "STUDENT4", "STUDENT5"];

context("Verify Student Activity Work Flow", () => {

    before(function() {
        cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    });

    it("Edit portal settings to open activity in same browser tab", () => {
        cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
        adminHelper.disableOpenInNewWindow(ASSIGNMENT_NAME);
        cy.logout();
    });

    it("Verify teacher adds class, assignment and students to class", () => {
        cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
        TeacherHelper.addClass(CLASS_NAME, CLASS_NAME, CLASS_WORD);
        TeacherHelper.addAssignment(CLASS_NAME, ASSIGNMENT_NAME);
        TeacherHelper.openStudentRosterSection(CLASS_NAME);

        STUDENTS.forEach(eachStudent => {
          var username = c[eachStudent + '_USERNAME'];
          var firstName = c[eachStudent + '_FIRSTNAME'];
          var lastName = c[eachStudent + '_LASTNAME'];
          TeacherHelper.addRegisteredStudentToClass(username, firstName, lastName, CLASS_NAME);
        });
        cy.logout();
    });

    it("Run the assignment with students added to the class", () => {

        let studentIndex = 0;
        STUDENTS.forEach(eachStudent => {
          var username = c[eachStudent + '_USERNAME'];
          var password = c[eachStudent + '_PASSWORD'];
          studentIndex++;

          cy.login(username, password);

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
                  LaraRuntimeHelper.answerQuestion(questionIndex, currentQuestion, studentIndex);
              }
          }
          //THIS WILL END ASSIGNMENT AND LOGOUT
          LaraRuntimeHelper.endAssignment();
        });
    });

    it("Verify teacher can verify reports and provide feedback", () => {
        cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
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
                ReportHelper.verifyReportForAQuestion(pageIndex, questionIndex, currentQuestion, STUDENTS);
                ReportHelper.provideFeedbackForAQuestion(pageIndex, questionIndex, currentQuestion, STUDENTS);
            }
        }
        // ReportHelper.provideOverallFeedback(STUDENTS, automatedtestactivity1LaraData.overallFeedback);
        cy.go("back");
        cy.logout();
    });

    it("Verify student can see the feedback from their teacher", () => {

      let studentIndex = 0;
      STUDENTS.forEach(eachStudent => {
        var username = c[eachStudent + '_USERNAME'];
        var password = c[eachStudent + '_PASSWORD'];
        studentIndex++;

        cy.login(username, password);
        let studentGenerateReportLnk = getLinkGenerateReport(CLASS_NAME, 'Generate a report of your work');
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
                ReportHelper.viewTeachersFeedbackForAQuestion(pageIndex, questionIndex, currentQuestion, studentIndex);
            }
        }
        cy.go('back'); //Student report page do not have any links back to portal.
        cy.logout();
      });
    });

    it("Verify teacher archive class", () => {
        cy.visit(c.LEARN_PORTAL_BASE_URL); //even if the previous test fails in loading the report this test will pass with this.
        cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as admin user
        TeacherHelper.archiveClass(CLASS_NAME);
        cy.logout();
    });
});
