import laraSequenceElements, {
    getIFrameSelectorForQuestion,
    getQuestionSectionSelector
} from "../elements/lara_sequence_elements";
import * as laraSequenceFunctionElements from "../elements/lara_sequence_elements";
import * as laraRuntimeHelper from "./laraRuntimeHelper";
import * as iFrameHelper from './iFrameHelper';
import {answerFillInTheBlanksQuestion} from "./iFrameHelper";


export function answerLaraActivity(activityName, activityTestData, studentIndex){
    let totalPagesInAssignment = activityTestData.assignmentPages.totalPages;

    for(let pageIndex = 1 ; pageIndex <= totalPagesInAssignment; pageIndex++){

        laraRuntimeHelper.goToPageNumber(pageIndex - 1);

        if(activityTestData.assignmentPages[pageIndex] === undefined){
            continue;
        }

        let questionsInThisPage = activityTestData.assignmentPages[pageIndex].questions;

        let totalQuestionsInPage = questionsInThisPage.totalQuestionsInPage;

        for(let questionIndex = 1 ; questionIndex <= totalQuestionsInPage; questionIndex++){
            let currentQuestion = questionsInThisPage[questionIndex];
            if(currentQuestion === null || currentQuestion === undefined){
                continue;
            }
            cy.log("question : " + questionIndex + " prompt : "+ currentQuestion.prompt);
            // if(currentQuestion.prompt && currentQuestion.prompt.length > 0){
            //     verifyQuestionPrompt(questionIndex, currentQuestion.prompt);
            // }
            answerQuestion(questionIndex, currentQuestion, studentIndex);
        }
    }
    //THIS WILL END ASSIGNMENT AND LOGOUT
    // endAssignment();
}

export function verifyLaraSequenceHeader(sequenceName){
  cy.get("body #app .app").then($body => {
    if ($body.find("[data-cy=activity-nav-header]").length > 0) {
      cy.log("Navigate To Sequence Home Page");
      cy.get('.title-container.link .sequence-icon').click();
      cy.wait(2000);
      cy.get(laraSequenceElements.LNK_HEADER_SEQUENCE_NAME).should('have.text', sequenceName);
    } else {
      cy.log("Sequence Home Page");
      cy.get(laraSequenceElements.LNK_HEADER_SEQUENCE_NAME).should('have.text', sequenceName);
    }
  });
}

export function goToActivityHome(activityName){
  cy.get("body #app .app").then($body => {
    if ($body.find("[data-cy=activity-summary]").length > 0) {
      cy.log("Verify Activity Name");
      cy.get("[data-cy=activity-summary] .activity-title h1").should('have.text', activityName);
    } else {
      cy.log("Activity Home Page");
      cy.get("[data-cy=home-button]").eq(0).click();
      cy.wait(2000);
      cy.get("[data-cy=activity-summary] .activity-title h1").should('have.text', activityName);
    }
  });
}

export function goToLaraSequenceHome(){
    cy.get(laraSequenceElements.LNK_HEADER_SEQUENCE_NAME).click();
}

// export function goToActivity(activityIndex){
//     cy.get(laraSequenceFunctionElements.getActivityLinkInSequenceSelector(activityIndex)).click();
// }

export function goToActivity(activityIndex){
    cy.get(laraSequenceFunctionElements.getActivityLinkInSequenceSelector()).eq(activityIndex).click();
    cy.wait(6000);
}

export function verifyIfActivityComplete(activityIndex){
    cy.get(laraSequenceFunctionElements.getActivityCompleteBannerSelector(activityIndex)).should('have.text', 'Completed');
}

function verifyQuestionPrompt(questionNumberInPage, questionPrompt){
    let iFrameSelector = laraSequenceFunctionElements.getIFrameSelectorForQuestion(questionNumberInPage);
    iFrameHelper.verifyQuestionPrompt(iFrameSelector, questionPrompt);
}

function answerQuestion(questionNumberInPage, currentQuestion, username){
    let iFrameSelector = laraSequenceFunctionElements.getIFrameSelectorForQuestion(questionNumberInPage);
    let studentAnswer = currentQuestion[username];
    if(studentAnswer.answer === undefined){
        //This means student do not want to answer this question.
        return;
    }
    switch (currentQuestion.questionType){
        case 'OPEN_RESPONSE_QUESTION':
            cy.wait(6000);
            iFrameHelper.answerOpenResponseQuestion(iFrameSelector, currentQuestion, studentAnswer);
            break;
        case 'MCQ':
            cy.wait(2000);
            iFrameHelper.answerMCQQuestion(iFrameSelector, currentQuestion, studentAnswer);
            break;
        case 'FILL_IN_THE_BLANKS':
            cy.wait(2000); //This is taking way too long to load and consistently failing
            iFrameHelper.answerFillInTheBlanksQuestion(iFrameSelector, currentQuestion, studentAnswer);
            break;
        case 'MULTI_SELECT':
            cy.wait(2000); //This is taking way too long to load and consistently failing
            iFrameHelper.answerMultiSelectQuestion(iFrameSelector, currentQuestion, studentAnswer);
            break;
        case 'IMAGE_QUESTION':
            cy.wait(2000); //This is taking way too long to load and consistently failing
            iFrameHelper.answerImageQuestion(iFrameSelector, currentQuestion, studentAnswer);
            break;
        default:
            break;
    }
}

export function endAssignment(){
    cy.get(laraSequenceElements.LNK_USERNAME).click();
    cy.get(laraSequenceElements.LNK_NOT_YOU).click();
}

export function answerWildFireSim(){
    laraRuntimeHelper.goToPageNumber(2);
    cy.wait(6000);
    cy.log("WildFire Explorer Sim");
    cy.get("[title='Wildfire Explorer']").then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=spark-button]').click();
            cy.wrap($body).find("[class^=app--mainContent] canvas").click(600, 400);
            cy.wrap($body).find('[data-test=spark-button]').click();
            cy.wrap($body).find("[class^=app--mainContent] canvas").click(400, 400);
            cy.wrap($body).find('[data-test=start-button]').click();
            cy.wait(6000);
            cy.wrap($body).find('[data-test=start-button]').click();
            cy.wrap($body).find('[data-test=restart-button]').click();
            cy.wait(1000);
            cy.wrap($body).find('[data-test=reload-button]').click();
            cy.wait(1000);
    });
}

export function answerHurricaneSim(){
    laraRuntimeHelper.goToPageNumber(1);
    cy.wait(6000);
    cy.log("Hurricane Explorer Sim");
    cy.get("[title='Hurricane Explorer']").then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[class^="wind-arrows-toggle"] input').click();
            cy.wrap($body).find('[class^="hurricane-image-toggle"] input').click();
            cy.wrap($body).find('[data-test=start-button]').click();
            cy.wait(2000);
            cy.wrap($body).find('[data-test=start-button]').click();
            cy.wrap($body).find('[data-test=restart-button]').click();
            cy.wait(1000);
            cy.wrap($body).find('[data-test=reload-button]').click();
            cy.wait(1000);
    });
}
