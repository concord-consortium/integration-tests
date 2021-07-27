import activityPlayerRuntimeElements from "../elements/ap_runtime_page_elements";
import * as activityPlayerElements from "../elements/ap_runtime_page_elements";

/*
In Lara runtime Dom has all pages with questions.
But in Activity Player runtime Dom has only selected page questions.
So, after clicking the page number, we just need the question number in that page.
 */

export function answerQuestionsInPage(pageNumber, allQuestionsInPage, userIndex){
    let questionCount = allQuestionsInPage.totalQuestionsInPage;
    for(let questionIndex = 1 ; questionIndex <= questionCount; questionIndex++){
        let currentQuestion = allQuestionsInPage[questionIndex];
        if(currentQuestion.prompt && currentQuestion.prompt.length > 0){
            verifyQuestionPrompt(questionIndex, currentQuestion.prompt);
        }
        switch(currentQuestion.questionType){
            case 'OPEN_RESPONSE_QUESTION':
                verifyOpenResponseDefaultAnswer(questionIndex, currentQuestion.defaultAnswer);
                answerOpenResponseQuestion(questionIndex, currentQuestion, currentQuestion[userIndex]);
                break;

            case 'MCQ':
                 answerMCQQuestion(questionIndex, currentQuestion, currentQuestion[userIndex]);
                 break;

            case 'FILL_IN_THE_BLANKS':
                 answerFillInTheBlanksQuestion(questionIndex, currentQuestion, currentQuestion[userIndex]);
                 break;

            case 'IMAGE_QUESTION':
                answerImageQuestion(questionIndex, currentQuestion, currentQuestion[userIndex]);
                break;
        }
    }
}

export function gotoPage(pageNumber){
    cy.get(activityPlayerElements.getLinkPageNumberSelector(pageNumber)).first().click();
    cy.wait(2000);
}

const getIframeBody = (iFrameSelector) => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
        .get(iFrameSelector)
        .its('0.contentDocument.body').should('not.be.empty')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        // https://on.cypress.io/wrap
        .then(cy.wrap)
}

export function verifyQuestionPrompt(questionNumberInPage, questionPrompt){
    let iFrameSelector = activityPlayerElements.getQuestionSectionSelector(questionNumberInPage) + ' iframe';
    getIframeBody(iFrameSelector).find('.runtime--prompt--question-int').contains('p', questionPrompt).should('exist');
}

export function verifyOpenResponseDefaultAnswer(questionNumberInPage, defaultAnswer){
    let iFrameSelector = activityPlayerElements.getQuestionSectionSelector(questionNumberInPage) + ' iframe';
    getIframeBody(iFrameSelector).find('fieldset div textarea');
}

export function answerOpenResponseQuestion(questionNumberInPage, questionDetails, userAnswerData){
    let iFrameSelector = activityPlayerElements.getQuestionSectionSelector(questionNumberInPage) + ' iframe';
    getIframeBody(iFrameSelector).find('fieldset div textarea').type(userAnswerData.answer);
    if(questionDetails.isSubmitEnabled){
        getIframeBody(iFrameSelector).find('div.base-app--runtime--question-int button[data-cy=\"lock-answer-button\"]').click();
        getIframeBody(iFrameSelector).find('div.locked-info--header--question-int').should('include.text', 'Your answer has been submitted and is locked.');
        if(userAnswerData.postSubmissionFeedback){
            getIframeBody(iFrameSelector).find('div.locked-info--feedback--question-int p').should('include.text', userAnswerData.postSubmissionFeedback);
        }
    }
}

export function answerMCQQuestion(questionNumberInPage, questionDetails, userAnswer){
    let iFrameSelector = activityPlayerElements.getQuestionSectionSelector(questionNumberInPage) + ' iframe';
    let selectedAnswersSize = userAnswer.answer.length;
    let optionsFeedbackText = userAnswer.optionsFeedback;
    for(let optionNumber = 0 ; optionNumber < selectedAnswersSize ; optionNumber++){
        let choiceSelector = 'div.runtime--choices--question-int div.radio-choice:nth-child(' + userAnswer.answer[optionNumber] +') input';
        getIframeBody(iFrameSelector).find(choiceSelector).click();
        if(!optionsFeedbackText && questionDetails.optionsFeedback){
            optionsFeedbackText = questionDetails.optionsFeedback[userAnswer.answer[optionNumber]];
        }
    }
    if(questionDetails.checkAnswer){
        getIframeBody(iFrameSelector).find('div.base-app--runtime--question-int button[data-cy=\"check-answer-button\"]').click();
        if(userAnswer.isRightAnswer){
            getIframeBody(iFrameSelector).find('div.runtime--answerFeedback--question-int[data-cy=\"feedback-true\"]').should('exist');
            getIframeBody(iFrameSelector).find('div.runtime--feedback--question-int').should('have.text', optionsFeedbackText)
        }else{
            getIframeBody(iFrameSelector).find('div.runtime--answerFeedback--question-int[data-cy=\"feedback-false\"]').should('exist');
        }
    }
    if(questionDetails.isSubmitEnabled){
        getIframeBody(iFrameSelector).find('div.base-app--runtime--question-int button[data-cy=\"lock-answer-button\"]').click();
        getIframeBody(iFrameSelector).find('div.locked-info--header--question-int').should('include.text', 'Your answer has been submitted and is locked.');
        if(questionDetails.postSubmissionFeedback){
            getIframeBody(iFrameSelector).find('div.locked-info--feedback--question-int p').should('include.text', questionDetails.postSubmissionFeedback);
        }
    }else{
        //wait for a second as options with no submit button are not recording the answer as the script runs very fast.
        cy.wait(1000);
    }
}

export function answerFillInTheBlanksQuestion(questionNumberInPage, questionData, userAnswerData){
    let iFrameSelector = activityPlayerElements.getQuestionSectionSelector(questionNumberInPage) + ' iframe';
    let numberOfBlanks = questionData.numberOfBlanks;
    for(let blankIndex = 1; blankIndex <= numberOfBlanks; blankIndex++){
        let blankInputSelector = activityPlayerRuntimeElements.FILL_IN_THE_BLANK_SECTION + ' input:nth-child(' + blankIndex + ')';
        getIframeBody(iFrameSelector).find(blankInputSelector).should('exist');
        getIframeBody(iFrameSelector).find(blankInputSelector).type(userAnswerData.answer[blankIndex]);
    }
    if(questionData.checkAnswer){
        getIframeBody(iFrameSelector).find('div.base-app--runtime--question-int button[data-cy=\"check-answer-button\"]').click();
    }
    if(questionData.isSubmitEnabled){
        getIframeBody(iFrameSelector).find('div.base-app--runtime--question-int button[data-cy=\"lock-answer-button\"]').click();
        getIframeBody(iFrameSelector).find('div.locked-info--header--question-int').should('include.text', 'Your answer has been submitted and is locked.');
        if(userAnswerData.postSubmissionFeedback){
            getIframeBody(iFrameSelector).find('div.locked-info--feedback--question-int p').should('include.text', userAnswerData.postSubmissionFeedback);
        }
    }
}

export function answerImageQuestion(questionNumberInPage, questionDetails, userAnswerData){
    cy.get(activityPlayerElements.getQuestionSectionSelector(questionNumberInPage)).find('iframe').then($iframe => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body).find('button[data-test=\"upload-btn\"]').click();
        const filepath = 'images/earthlayers.png';
        cy.wrap($body).get('input[type="file"]').attachFile(filepath);

        if(questionDetails.isSubmitEnabled){
            cy.wrap($body).find('div.base-app--runtime--question-int button[data-cy=\"lock-answer-button\"]').click();
        }
    });
}

export function showReport(){
    cy.get(activityPlayerRuntimeElements.BTN_SHOW_MY_WORK).click();
}
