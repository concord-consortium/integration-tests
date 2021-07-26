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

        laraRuntimeHelper.goToPageNumber(pageIndex);

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
            if(currentQuestion.prompt && currentQuestion.prompt.length > 0){
                verifyQuestionPrompt(questionIndex, currentQuestion.prompt);
            }
            answerQuestion(questionIndex, currentQuestion, studentIndex);
        }
    }
    //THIS WILL END ASSIGNMENT AND LOGOUT
    // endAssignment();
}

export function verifyLaraSequenceHeader(sequenceName){
    cy.get(laraSequenceElements.LNK_HEADER_SEQUENCE_NAME).should('have.text', sequenceName);
}

export function goToLaraSequenceHome(){
    cy.get(laraSequenceElements.LNK_HEADER_SEQUENCE_NAME).click();
}

export function goToActivity(activityIndex){
    cy.get(laraSequenceFunctionElements.getActivityLinkInSequenceSelector(activityIndex)).click();
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
            cy.wait(2000);
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
        default:
            break;
    }
}

export function endAssignment(){
    cy.get(laraSequenceElements.LNK_USERNAME).click();
    cy.get(laraSequenceElements.LNK_NOT_YOU).click();
}


