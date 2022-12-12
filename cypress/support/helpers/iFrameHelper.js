import activityPlayerRuntimeElements from "../elements/ap_runtime_page_elements";

export function verifyQuestionPrompt(iFrameSelector, questionPrompt){
    getIframeBody(iFrameSelector).find('.runtime--prompt--question-int p').should('have.text', questionPrompt);
    // getIframeBody(iFrameSelector).find('.runtime--prompt--question-int').contains('p', questionPrompt).should('exist');
}

export function verifyOpenResponseDefaultAnswer(iFrameSelector, defaultAnswer){
    getIframeBody(iFrameSelector).find('fieldset div textarea[placeholder=\"' + defaultAnswer +'\"]');
}

export function answerOpenResponseQuestion(iFrameSelector, questionDetails, userAnswerData){
  iFrameSelector.then($iframe => {
    const $body = $iframe.contents().find('#app')
          cy.wrap($body).find('fieldset div textarea').type(userAnswerData.answer);
  });
    // getIframeBody(iFrameSelector).find('fieldset div textarea').type(userAnswerData.answer);
    if(questionDetails.isSubmitEnabled){
        getIframeBody(iFrameSelector).find('div.base-app--runtime--question-int button[data-cy=\"lock-answer-button\"]').click();
        getIframeBody(iFrameSelector).find('div.locked-info--header--question-int').should('include.text', 'Your answer has been submitted and is locked.');
        if(userAnswerData.postSubmissionFeedback){
            getIframeBody(iFrameSelector).find('div.locked-info--feedback--question-int p').should('include.text', userAnswerData.postSubmissionFeedback);
        }
    }
    cy.wait(2000);
}

export function answerMCQQuestion(iFrameSelector, questionDetails, userAnswer){
    let selectedAnswersSize = userAnswer.answer.length;
    let optionsFeedbackText = userAnswer.optionsFeedback;
    for(let optionNumber = 0 ; optionNumber < selectedAnswersSize ; optionNumber++){
        let choiceSelector = 'div.runtime--choices--question-int div.radio-choice:nth-child(' + userAnswer.answer[optionNumber] +') input';
        iFrameSelector.then($iframe => {
          const $body = $iframe.contents().find('#app')
                cy.wrap($body).find(choiceSelector).click();
        });
        // getIframeBody(iFrameSelector).find(choiceSelector).click();
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

export function answerFillInTheBlanksQuestion(iFrameSelector, questionData, userAnswerData){
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

export function answerMultiSelectQuestion(iFrameSelector, questionDetails, userAnswer){
  cy.log("Inside Multiselct Question");
        let choiceSelector1 = 'div.runtime--choices--question-int div.radio-choice:nth-child('+userAnswer.answer1+') input';
        let choiceSelector2 = 'div.runtime--choices--question-int div.radio-choice:nth-child('+userAnswer.answer2+') input';
        cy.log("choiceSelector1 " + choiceSelector1)
        iFrameSelector.then($iframe => {
          const $body = $iframe.contents().find('#app')
                cy.wrap($body).find(choiceSelector1).click();
                cy.wrap($body).find(choiceSelector2).click();
        });
    cy.wait(6000);
}

export function answerImageQuestion(iFrameSelector, questionDetails, userAnswer){
  iFrameSelector.then($iframe => {
    const $body = $iframe.contents().find('#app')
          cy.wrap($body).find('[data-testid=snapshot-btn]').click();
          cy.wait(20000);
  });
  cy.get('.ReactModalPortal [class^=ReactModal__Overlay]').find('iframe').then($iframe => {
    const $body1 = $iframe.contents().find('#app')
    cy.wrap($body1).find('[class^=runtime--dialogContent]').should("exist");
    cy.wrap($body1).find('[class^=runtime--dialogRightPanel] textarea').type(userAnswer.answer);
    cy.wrap($body1).find('[data-test=close-dialog-btn]').click();
  });
  cy.wait(6000);
}

const getIframeBody = (iFrameSelector) => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
        .get(iFrameSelector)
        // .its('0.contentDocument.body').should('not.be.empty')
        .its('0.contentDocument.body').should('not.be.empty')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        // https://on.cypress.io/wrap
        .then(cy.wrap)
    // cy.get(iFrameSelector).find('body').then($iframe => {
    //   const $body = $iframe.contents().find('#app')
    //         return cy.wrap($body);
    // });
}
