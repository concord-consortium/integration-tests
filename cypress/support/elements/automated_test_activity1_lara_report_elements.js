const automatedTestActivity1_Lara_Report = {

    LBL_REPORT_FOR_VALUE: 'div.report-header div.title h1',
    LBL_ACTIVITY_NAME: '',

    BTN_SHOW_SELECTED: '',
    BTN_SHOW_ALL: '',
    BTN_HIDE_NAMES: '',
    BTN_PRINT_STUDENT_REPORTS: '',
    BTN_PROVIDE_OVERALL_FEEDBACK: 'div.feedback-button',

    LNK_SHOW_RESPONSE: 'a.answers-toggle',
    BTN_PROVIDE_QUESTION_FEEDBACK: 'div.feedback-button',

    LBL_HEADER_QUESTION_FEEDBACK_PANEL: 'div.feedback-panel h1',
    LBL_STUDENTS_AWAITING_FEEDBACK_VALUE: 'div.feedback-overview div:nth-child(1) span.value',
    LBL_STUDENTS_PROVIDED_FEEDBACK_VALUE: 'div.feedback-overview div:nth-child(2) span.value',
    LBL_STUDENTS_WITH_NO_ANSWER_VALUE: 'div.feedback-overview div:nth-child(3) span.value',

    CHK_STUDENTS_THAT_NEED_REVIEW: 'input#needsReview',
    CHK_ALL_STUDENTS: 'input#all',

    CHK_PROVIDE_WRITTEN_FEEDBACK_QUESTION: 'input#feedbackEnabled',
    CHK_GIVE_SCORE_QUESTION_FEEDBACK: 'input#giveScore',
    TXT_SCORE_QUESTION: 'input.score-input',

    SELECT_JUMP_TO_USER_FEEDBACK_FILTERS: 'div.feedback-filters div.filters div select',

    BTN_DONE_QUESTION_FEEDBACK_DIALOG: 'div.footer a.cc-button'

};

export function getQuestionSectionSelector(pageNumber, questionNumber){
    return 'div.section div.page:nthchild(' + pageNumber + ') div.question:nth-child(' + questionNumber + ')';
}

export function getStudentResponseElement(studentName, pageNumber, questionNumber){
    return cy.get(getQuestionSectionSelector(pageNumber, questionNumber)).contains('table.answers-table td', studentName).parent().find('td:nth-child(2)');
}

export function getStudentFeedbackElement(studentName, pageNumber, questionNumber){
    return cy.get(getQuestionSectionSelector(pageNumber, questionNumber)).contains('table.answers-table td', studentName).parent().find('td.feedback');
}

export function getQuestionFeedbackTextAreaElementForStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.contains('div.student-answer h3', studentName + "'s Work").parent().parent().find('textarea[data-cy=\"feedbackBox\"]');
}

export function getQuestionFeedbackCompleteChkBoxElementForStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.contains('div.student-answer h3', studentName + "'s Work").parent().parent().find('div.feedback-complete input[type=\"checkbox\"]')
}

export function getQuestionScoreTextElementForStudent(firstName, lastName){
    let studentName = firstName + ' ' + lastName;
    return cy.contains('div.student-answer h3', studentName + "'s Work").parent().parent().find('div.score input.score-input');
}




export default automatedTestActivity1_Lara_Report;