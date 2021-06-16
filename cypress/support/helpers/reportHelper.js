import laraActivityReportElements from "../elements/lara_activity_report_elements";
import * as LaraReportElements from '../elements/lara_activity_report_elements';

export function provideOverallFeedback(studentsData, overallFeedbackData){
    cy.contains('div.feedback-button.cc-button', 'Provide overall feedback').click();
    cy.get('input#feedbackEnabled').check();
    cy.get('input#giveScore').check();
    let studentCount = studentsData.totalStudentsAssigned;
    for(let studentIndex = 1; studentIndex <= studentCount; studentIndex++) {
        let studentObj = studentsData[studentIndex];
        let feedbackDataOfStudent = overallFeedbackData[studentObj.username];
        LaraReportElements.getOverallFeedbackTextAreaElementForAStudent(studentObj.firstName, studentObj.lastName).type(feedbackDataOfStudent.teacherFeedback)
        LaraReportElements.getOverallFeedbackScoreTextElementForStudent(studentObj.firstName, studentObj.lastName).type(feedbackDataOfStudent.teacherScore);
        LaraReportElements.getOverallFeedbackCompleteChkBoxElementForStudent(studentObj.firstName, studentObj.lastName).check();
    }
    cy.get(LaraReportElements.getDoneButtonSelectorForQuestionFeedback()).click();
}

export function provideFeedbackForAQuestion(pageNumber, questionNumberInPage, questionData, studentsData){
    let questionSectionSelector = LaraReportElements.getQuestionSectionSelector(pageNumber, questionNumberInPage);
    //Inside question section look for feedback button. There should only be one button as we are looking inside question selector.
    let provideFeedbackButtonSelector = questionSectionSelector + ' div.feedback-container div.feedback-button';
    cy.get(provideFeedbackButtonSelector).click();
    cy.get(laraActivityReportElements.CHK_PROVIDE_FEEDBACK).check();
    cy.get(laraActivityReportElements.CHK_GIVE_SCORE).check();

    let studentCount = studentsData.totalStudentsAssigned;
    for(let studentIndex = 1; studentIndex <= studentCount; studentIndex++){
        let studentObj = studentsData[studentIndex];
        let studentQuestionData = questionData[studentObj.username];
        if(questionData.questionType === 'MCQ' && studentQuestionData.answer.length === 0 ){
            //as student did not answer we don't have a feedback option
            continue;
        }
        if(studentQuestionData.teacherFeedback !== undefined && studentQuestionData.teacherFeedback !== ''){
            LaraReportElements.getQuestionFeedbackTextAreaElementForAStudent(studentObj.firstName, studentObj.lastName).type(studentQuestionData.teacherFeedback);
        }
        if( studentQuestionData.teacherScore !== undefined && studentQuestionData.teacherScore !== ''){
            LaraReportElements.getQuestionScoreTextElementForStudent(studentObj.firstName, studentObj.lastName).type(studentQuestionData.teacherScore);
        }
        LaraReportElements.getQuestionFeedbackCompleteChkBoxElementForStudent(studentObj.firstName, studentObj.lastName).click();

    }
    cy.get(LaraReportElements.getDoneButtonSelectorForQuestionFeedback()).click();

}

export function verifyReportForAQuestion(pageNumber, questionNumberInPage, questionData, studentsData){

    cy.get(LaraReportElements.getSelectQuestionCheckboxSelector(pageNumber, questionNumberInPage)).check();
    LaraReportElements.getShowResponsesLinkSelector(pageNumber, questionNumberInPage).click();
    let studentCount = studentsData.totalStudentsAssigned;
    for(let studentIndex = 1; studentIndex <= studentCount; studentIndex++){
        let studentObj = studentsData[studentIndex];
        let studentAnswer = questionData[studentObj.username].answer;
        switch(questionData.questionType){
            case 'OPEN_RESPONSE_QUESTION':
                verifyOpenResponseQuestionAnswer(pageNumber, questionNumberInPage, studentsData[studentIndex], studentAnswer);
                break;
            case 'MCQ':
                verifyMCQAnswer(pageNumber, questionNumberInPage, studentsData[studentIndex], questionData.options, studentAnswer);
                break;
            default:
                break;
        }

    }
}

export function viewTeachersFeedbackForAQuestion(pageNumber, questionNumberInPage, currentQuestionData, studentUsername){
    let studentAnswerData = currentQuestionData[studentUsername];

    let questionSectionSelector = LaraReportElements.getQuestionSectionSelectorForStudentReport(pageNumber, questionNumberInPage);
    let feedbackSectionSelector = questionSectionSelector + ' div.activity-feedback div.act-feedback-panel';
    let noFeedbackSelector = questionSectionSelector + 'div.activity-feedback div[data-cy=\"no-feedback\"]';
    let feedbackSelector = 'div.feedback-section.written-feedback span';
    let scoreLabelSelector = 'div.feedback-section.score span.scoreLabel';
    let scoreValueSelector = 'div.feedback-section.score span.studentScore';
    let maxScoreValueSelector = 'div.feedback-section.score span.maxScore';
    cy.get(feedbackSectionSelector).find(feedbackSelector).should('include.text', studentAnswerData.teacherFeedback);
    cy.get(feedbackSectionSelector).find(scoreLabelSelector).should('include.text', 'Score');
    if(studentAnswerData.teacherScore === undefined){
        cy.get(feedbackSectionSelector).find(scoreValueSelector).should('not.exist');
        cy.get(feedbackSectionSelector).find(maxScoreValueSelector).should('not.exist');
    }else{
        cy.get(feedbackSectionSelector).find(scoreValueSelector).should('include.text', studentAnswerData.teacherScore);
        cy.get(feedbackSectionSelector).find(maxScoreValueSelector).should('include.text', currentQuestionData.maxScore);

    }
}

export function verifyOpenResponseQuestionAnswer(pageNumber, questionNumberInPage, studentObj, studentResponse){
    let studentName = studentObj.firstName + ' ' + studentObj.lastName;
    LaraReportElements.getStudentResponseElement(pageNumber, questionNumberInPage, studentName).should('contain.text', studentResponse);
}

export function verifyMCQAnswer(pageNumber, questionNumberInPage, studentObj, options, studentAnswer){
    //studentAnswer in MCQ is an array with one answer or more than one answer.
    //if student do not submit any answer it would be an empty array.
    let studentName = studentObj.firstName + ' ' + studentObj.lastName;
    let answerCount = studentAnswer.length;
    let mcqAnswer = answerCount === 0 ? 'No response' : options[studentAnswer[0]];
    for(let answerIndex = 1; answerIndex < answerCount ; answerIndex++){
       mcqAnswer = mcqAnswer + ', ' + options[studentAnswer[answerIndex]];
    }
    LaraReportElements.getStudentResponseElement(pageNumber, questionNumberInPage, studentName).should('have.text', mcqAnswer);
}
//
// export function getQuestionSectionSelector(pageNumber, questionNumberInPage){
//     return laraActivityReportElements.SECTION_REPORT_PAGES +
//         ' div.page:nth-child(' + pageNumber + ') div:nth-child(2) div:nth-child(' + questionNumberInPage + ') div.question';
// }
//
// export function getQuestionSectionSelectorForStudentReport(pageNumber, questionNumberInPage){
//     return laraActivityReportElements.SECTION_STUDENT_REPORT_PAGES +
//         ' div.page:nth-child(' + pageNumber + ') div:nth-child(2) div.question.for-student:nth-child(' + questionNumberInPage + ') ';
// }
//
// export function selectQuestionInReport(pageNumber, questionNumberInPage){
//     let questionSectionSelector = getQuestionSectionSelector(pageNumber, questionNumberInPage);
//     cy.get(questionSectionSelector).find('div.question-header input').check();
// }
//
// export function showResponsesForQuestion(pageNumber, questionNumberInPage){
//     let questionSectionSelector = getQuestionSectionSelector(pageNumber, questionNumberInPage);
//     cy.get(questionSectionSelector).contains('div.question-header a.answers-toggle', 'Show responses').click();
// }
//
// export function getStudentResponseElement(pageNumber, questionNumberInPage, studentName){
//     let questionSection = getQuestionSectionSelector(pageNumber, questionNumberInPage);
//     let studentTableRowSelector = 'table.answers-table td';
//     let responseColumnSelector = 'td:nth-child(2) div';
//     return cy.get(questionSection).contains(studentTableRowSelector, studentName).parent().find(responseColumnSelector);
// }
//
// function getOverallFeedbackTextAreaElementForAStudent(firstName, lastName){
//     let studentName = firstName + ' ' + lastName;
//     return cy.contains('div.student-answer h3', studentName + "'s Work").parent().parent().find('textarea[data-cy=\"feedbackBox\"]');
// }
//
// function getOverallFeedbackScoreTextElementForStudent(firstName, lastName){
//     let studentName = firstName + ' ' + lastName;
//     return cy.contains('div.student-answer h3', studentName + "'s Work").parent().parent().find('div.score input.score-input');
// }
//
// function getOverallFeedbackCompleteChkBoxElementForStudent(firstName, lastName){
//     let studentName = firstName + ' ' + lastName;
//     return cy.contains('div.student-answer h3', studentName + "'s Work").parent().parent().find('div.feedback-complete input[type=\"checkbox\"]')
// }
//
// export function getQuestionFeedbackTextAreaElementForAStudent(firstName, lastName){
//     let studentName = firstName + ' ' + lastName;
//     return cy.contains('div.student-answer h3', studentName + "'s Answer").parent().parent().find('textarea[data-cy=\"feedbackBox\"]');
// }
// export function getQuestionFeedbackCompleteChkBoxElementForStudent(firstName, lastName){
//     let studentName = firstName + ' ' + lastName;
//     return cy.contains('div.student-answer h3', studentName + "'s Answer").parent().parent().find('div.feedback-complete input[type=\"checkbox\"]')
// }
//
// export function getQuestionScoreTextElementForStudent(firstName, lastName){
//     let studentName = firstName + ' ' + lastName;
//     return cy.contains('div.student-answer h3', studentName + "'s Answer").parent().parent().find('div.score input.score-input');
// }
// export function getDoneButtonSelectorForQuestionFeedback(){
//     return 'div.footer a.cc-button';
// }