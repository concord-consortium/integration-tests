import automatedTestActivity1_Lara from "../elements/automated_test_activity1_lara_elements";
import * as ACTIVITY_PAGES from "../elements/activity_pagination_header";

export function goToPageNumber(pageNumber){
    cy.get(ACTIVITY_PAGES.BTN_ACTIVITY_PAGE(pageNumber)).click();
}

export function answerQuestion(questionNumberInPage, currentQuestion, studentIndex){

    let studentAnswer = currentQuestion[studentIndex];
    if(studentAnswer.answer === undefined){
        //This means student do not want to answer this question.
        return;
    }
    switch (currentQuestion.questionType){
        case 'OPEN_RESPONSE_QUESTION':
            answerOpenResponseQuestion(questionNumberInPage, studentAnswer.answer);
            break;
        case 'MCQ':
            answerMCQQuestion(questionNumberInPage, studentAnswer.answer, studentAnswer.shouldCheckAnswer,
                                                                        currentQuestion.isSubmitEnabled);
            break;
        default:
            break;
    }

}

export function answerOpenResponseQuestion(questionNumberInPage, studentAnswer){
    let selector = 'div.questions-mod div.question:nth-child('+questionNumberInPage+') #embeddable_open_response_answer_answer_text';
    cy.get(selector).type('{selectall}{backspace}' + studentAnswer);
}

export function answerMCQQuestion(questionNumberInPage, selectOptions, shouldCheckAnswer, isSubmitEnabled){

    let baseSelector = 'div.questions-mod div.question:nth-child(' + questionNumberInPage + ') ';
    let selectedAnswersSize = selectOptions.length;
    for(let optionNumber = 0 ; optionNumber < selectedAnswersSize ; optionNumber++){
        let checkboxSelector = baseSelector + 'div.choice-container div.choice:nth-child(' + selectOptions[optionNumber] +') input';
        cy.get(checkboxSelector).click();
    }
    if(shouldCheckAnswer){
        //need to click on check answer button.
    }

    if(isSubmitEnabled){
        let submitButtonSelector = 'div.questions-mod div.question:nth-child(' + questionNumberInPage + ') button.prediction_button'
        cy.get(submitButtonSelector).click();
    }
}

export function endAssignment(){
    cy.get(automatedTestActivity1_Lara.LNK_ADMIN_ACTIVITY_END).click();
    cy.get(automatedTestActivity1_Lara.LNK_NOT_YOU).click();
}
