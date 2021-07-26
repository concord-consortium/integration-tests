import allActivityReportElements, {getStudentResponseElementForBlanks} from "../elements/all_activity_report_elements";
import * as allReportElements from '../elements/all_activity_report_elements';
import * as C from '../constants';

export function provideOverallFeedback(studentsData, overallFeedbackData){
    cy.contains('div.feedback-button.cc-button', 'Provide overall feedback').click();
    cy.get('input#feedbackEnabled').check();
    cy.get('input#giveScore').check();
    studentsData.forEach(eachStudent => {
        let studentObj = {
            username: C[eachStudent + '_USERNAME'],
            firstName: C[eachStudent + '_FIRSTNAME'],
            lastName: C[eachStudent + '_LASTNAME'],
            password: C[eachStudent + '_PASSWORD']
        }
        let feedbackDataOfStudent = overallFeedbackData[studentObj.username];
        allReportElements.getOverallFeedbackTextAreaElementForAStudent(studentObj.firstName, studentObj.lastName).type(feedbackDataOfStudent.teacherFeedback)
        allReportElements.getOverallFeedbackScoreTextElementForStudent(studentObj.firstName, studentObj.lastName).type(feedbackDataOfStudent.teacherScore);
        allReportElements.getOverallFeedbackCompleteChkBoxElementForStudent(studentObj.firstName, studentObj.lastName).check();
    });
    cy.get(allReportElements.getDoneButtonSelectorForQuestionFeedback()).click();
}

export function provideFeedbackForAQuestion(activityNumber, pageNumber, questionNumberInPage, questionData, studentsData){
    let questionSectionSelector = allReportElements.getQuestionSectionSelector(activityNumber, pageNumber, questionNumberInPage);
    //Inside question section look for feedback button. There should only be one button as we are looking inside question selector.
    let provideFeedbackButtonSelector = questionSectionSelector + ' div.feedback-container div.feedback-button';
    cy.get(provideFeedbackButtonSelector).click();
    cy.get(allActivityReportElements.CHK_PROVIDE_FEEDBACK).check();
    cy.get(allActivityReportElements.CHK_GIVE_SCORE).check();
    let studentIndex = 0;
    studentsData.forEach(eachStudent => {
        let studentObj = {
            username: C[eachStudent + '_USERNAME'],
            firstName: C[eachStudent + '_FIRSTNAME'],
            lastName: C[eachStudent + '_LASTNAME'],
            password: C[eachStudent + '_PASSWORD'],
        }
        studentIndex++;
        let studentQuestionData = questionData[studentIndex];

        if(questionData.questionType !== 'MCQ' || studentQuestionData.answer.length > 0 ){

            if(studentQuestionData.teacherFeedback !== undefined && studentQuestionData.teacherFeedback !== ''){
                allReportElements.getQuestionFeedbackTextAreaElementForAStudent(studentObj.firstName, studentObj.lastName).type(studentQuestionData.teacherFeedback);
            }
            if( studentQuestionData.teacherScore !== undefined && studentQuestionData.teacherScore !== ''){
                allReportElements.getQuestionScoreTextElementForStudent(studentObj.firstName, studentObj.lastName).type(studentQuestionData.teacherScore);
            }
            allReportElements.getQuestionFeedbackCompleteChkBoxElementForStudent(studentObj.firstName, studentObj.lastName).click();
        }

    });

    cy.get(allReportElements.getDoneButtonSelectorForQuestionFeedback()).click();

}

export function verifyReportForAQuestion(activityNumber, pageNumber, questionNumberInPage, questionData, studentsData){

    cy.get(allReportElements.getSelectQuestionCheckboxSelector(activityNumber, pageNumber, questionNumberInPage)).check();
    allReportElements.getShowResponsesLinkSelector(activityNumber, pageNumber, questionNumberInPage).click();
    let studentIndex = 0;
    studentsData.forEach(eachStudent => {
        let studentObj = {
            username: C[eachStudent + '_USERNAME'],
            firstName: C[eachStudent + '_FIRSTNAME'],
            lastName: C[eachStudent + '_LASTNAME'],
            password: C[eachStudent + '_PASSWORD'],
        }
        studentIndex++;
        let studentAnswer = questionData[studentIndex].answer;
        switch(questionData.questionType){
            case 'OPEN_RESPONSE_QUESTION':
                verifyOpenResponseQuestionAnswer(activityNumber, pageNumber, questionNumberInPage, studentObj, studentAnswer);
                break;
            case 'MCQ':
                verifyMCQAnswer(activityNumber, pageNumber, questionNumberInPage, studentObj, questionData.options, studentAnswer);
                break;
            case 'FILL_IN_THE_BLANKS':
                verifyFillInTheBlanksQuestionAnswer(activityNumber, pageNumber, questionNumberInPage, studentObj, questionData[studentIndex]);
                break;
            default:
                break;
        }
    });
}

export function viewTeachersFeedbackForAQuestion(activityNumber, pageNumber, questionNumberInPage, currentQuestionData, studentIndex){
    let studentAnswerData = currentQuestionData[studentIndex];

    let questionSectionSelector = allReportElements.getQuestionSectionSelectorForStudentReport(activityNumber, pageNumber, questionNumberInPage);
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

export function verifyOpenResponseQuestionAnswer(activityNumber, pageNumber, questionNumberInPage, studentObj, studentResponse){
    let studentName = studentObj.firstName + ' ' + studentObj.lastName;
    allReportElements.getStudentResponseElement(activityNumber, pageNumber, questionNumberInPage, studentName).should('contain.text', studentResponse);
}

export function verifyMCQAnswer(activityNumber, pageNumber, questionNumberInPage, studentObj, options, studentAnswer){
    //studentAnswer in MCQ is an array with one answer or more than one answer.
    //if student do not submit any answer it would be an empty array.
    let studentName = studentObj.firstName + ' ' + studentObj.lastName;
    let answerCount = studentAnswer.length;
    let mcqAnswer = answerCount === 0 ? 'No response' : options[studentAnswer[0]];
    for(let answerIndex = 1; answerIndex < answerCount ; answerIndex++){
        mcqAnswer = mcqAnswer + ', ' + options[studentAnswer[answerIndex]];
    }
    allReportElements.getStudentResponseElement(activityNumber, pageNumber, questionNumberInPage, studentName).should('have.text', mcqAnswer);
}

export function verifyFillInTheBlanksQuestionAnswer(activityNumber, pageNumber, questionNumberInPage, studentObj, studentAnswer){
    //studentAnswer in MCQ is an array with one answer or more than one answer.
    //if student do not submit any answer it would be an empty array.
    let studentName = studentObj.firstName + ' ' + studentObj.lastName;
    allReportElements.getStudentResponseElementForBlanks(activityNumber, pageNumber, questionNumberInPage, studentName).should('have.text', studentAnswer.verifyAnswer);
}
