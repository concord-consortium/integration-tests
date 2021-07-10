const laraActivityReportElements = {
    SECTION_REPORT_PAGES: 'div.section div:nth-child(2)',
    //In student report section we have 2 div.report-content first one is hidden which is the teacher report section dom.
    SECTION_STUDENT_REPORT_PAGES: 'div.report-content:nth-child(2) div.section div:nth-child(2)',
    CHK_PROVIDE_FEEDBACK: 'input#feedbackEnabled',
    CHK_GIVE_SCORE: 'input#giveScore',
}
export default laraActivityReportElements;

export function getQuestionSectionSelector(pageNumber, questionNumberInPage){
    return laraActivityReportElements.SECTION_REPORT_PAGES +
        ' div.page:nth-child(' + pageNumber + ') div:nth-child(2) div:nth-child(' + questionNumberInPage + ') div.question';
}

export function getQuestionSectionSelectorForStudentReport(pageNumber, questionNumberInPage){
    return laraActivityReportElements.SECTION_STUDENT_REPORT_PAGES +
        ' div.page:nth-child(' + pageNumber + ') div:nth-child(2) div.question.for-student:nth-child(' + questionNumberInPage + ') ';
}

export function getSelectQuestionCheckboxSelector(pageNumber, questionNumberInPage){
    let questionSectionSelector = getQuestionSectionSelector(pageNumber, questionNumberInPage);
    return questionSectionSelector + ' div.question-header input';
}

export function getShowResponsesLinkSelector(pageNumber, questionNumberInPage){
    let questionSectionSelector = getQuestionSectionSelector(pageNumber, questionNumberInPage);
    return cy.get(questionSectionSelector).contains('div.question-header a.answers-toggle', 'Show responses');
}

export function getStudentResponseElement(pageNumber, questionNumberInPage, studentName){
    let questionSection = getQuestionSectionSelector(pageNumber, questionNumberInPage);
    let studentTableRowSelector = 'table.answers-table td';
    let responseColumnSelector = 'td:nth-child(2) div';
    return cy.get(questionSection).contains(studentTableRowSelector, studentName).parent().find(responseColumnSelector);
}

export function getOverallFeedbackTextAreaElementForAStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.get('div.student-answer h3').contains(studentName + "'s Work").parent().parent().find('textarea[data-cy=\"feedbackBox\"]');
}

export function getOverallFeedbackScoreTextElementForStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.get('div.student-answer h3').contains(studentName + "'s Work").parent().parent().find('div.score input.score-input');
}

export function getOverallFeedbackCompleteChkBoxElementForStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.get('div.student-answer h3').contains(studentName + "'s Work").parent().parent().find('div.feedback-complete input[type=\"checkbox\"]')
}

export function getQuestionFeedbackTextAreaElementForAStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.get('div.student-answer h3').contains(studentName + "'s Answer").parent().parent().find('textarea[data-cy=\"feedbackBox\"]');
}
export function getQuestionFeedbackCompleteChkBoxElementForStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.get('div.student-answer h3').contains(studentName + "'s Answer").parent().parent().find('div.feedback-complete input[type=\"checkbox\"]')
}

export function getQuestionScoreTextElementForStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.get('div.student-answer h3').contains(studentName + "'s Answer").parent().parent().find('div.score input.score-input');
}
export function getDoneButtonSelectorForQuestionFeedback(){
    return 'div.footer a.cc-button';
}
