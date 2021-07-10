import * as c from '../constants.js'
import laraActivityReportElements from "../elements/lara_activity_report_elements";
import * as LaraReportElements from '../elements/lara_activity_report_elements';

export function provideOverallFeedback(students, overallFeedbackData){
    cy.get('div.feedback-button.cc-button').contains('Provide overall feedback').click();
    cy.get('input#feedbackEnabled').check();
    cy.get('input#giveScore').check();
    let studentIndex = 0;
    students.forEach(eachStudent => {
      var firstName = c[eachStudent + '_FIRSTNAME'];
      var lastName = c[eachStudent + '_LASTNAME'];
      var username = c[eachStudent + '_USERNAME'];
      studentIndex++;

      let feedbackDataOfStudent = overallFeedbackData[studentIndex];
      LaraReportElements.getOverallFeedbackTextAreaElementForAStudent(firstName, lastName).type(feedbackDataOfStudent.teacherFeedback);
      LaraReportElements.getOverallFeedbackScoreTextElementForStudent(firstName, lastName).type(feedbackDataOfStudent.teacherScore);
      LaraReportElements.getOverallFeedbackCompleteChkBoxElementForStudent(firstName, lastName).check();
    });
    cy.get(LaraReportElements.getDoneButtonSelectorForQuestionFeedback()).click();
}

export function provideFeedbackForAQuestion(pageNumber, questionNumberInPage, questionData, students){
    let questionSectionSelector = LaraReportElements.getQuestionSectionSelector(pageNumber, questionNumberInPage);
    //Inside question section look for feedback button. There should only be one button as we are looking inside question selector.
    let provideFeedbackButtonSelector = questionSectionSelector + ' div.feedback-container div.feedback-button';
    cy.get(provideFeedbackButtonSelector).click();
    cy.get(laraActivityReportElements.CHK_PROVIDE_FEEDBACK).check();
    cy.get(laraActivityReportElements.CHK_GIVE_SCORE).check();

    let studentIndex = 0;
    students.forEach(eachStudent => {
      var firstName = c[eachStudent + '_FIRSTNAME'];
      var lastName = c[eachStudent + '_LASTNAME'];
      var username = c[eachStudent + '_USERNAME'];
      studentIndex++;

      let studentQuestionData = questionData[studentIndex];
      if(questionData.questionType === 'MCQ' && studentQuestionData.answer.length === 0 ){
          //as student did not answer we don't have a feedback option
      }else{
        if(studentQuestionData.teacherFeedback !== undefined && studentQuestionData.teacherFeedback !== ''){
            LaraReportElements.getQuestionFeedbackTextAreaElementForAStudent(firstName, lastName).type(studentQuestionData.teacherFeedback);
        }
        if( studentQuestionData.teacherScore !== undefined && studentQuestionData.teacherScore !== ''){
            LaraReportElements.getQuestionScoreTextElementForStudent(firstName, lastName).type(studentQuestionData.teacherScore);
        }
        LaraReportElements.getQuestionFeedbackCompleteChkBoxElementForStudent(firstName, lastName).click();

      }


    });
    cy.get(LaraReportElements.getDoneButtonSelectorForQuestionFeedback()).click();
}

export function verifyReportForAQuestion(pageNumber, questionNumberInPage, questionData, students){

    cy.get(LaraReportElements.getSelectQuestionCheckboxSelector(pageNumber, questionNumberInPage)).check();
    LaraReportElements.getShowResponsesLinkSelector(pageNumber, questionNumberInPage).click();
    let studentIndex = 0;
    students.forEach(eachStudent => {
      var firstName = c[eachStudent + '_FIRSTNAME'];
      var lastName = c[eachStudent + '_LASTNAME'];
      var username = c[eachStudent + '_USERNAME'];
      studentIndex++;
        let studentAnswer = questionData[studentIndex].answer;
        switch(questionData.questionType){
            case 'OPEN_RESPONSE_QUESTION':
                verifyOpenResponseQuestionAnswer(pageNumber, questionNumberInPage, eachStudent, studentAnswer);
                break;
            case 'MCQ':
                verifyMCQAnswer(pageNumber, questionNumberInPage, eachStudent, questionData.options, studentAnswer);
                break;
            default:
                break;
        }
    });
}

export function viewTeachersFeedbackForAQuestion(pageNumber, questionNumberInPage, currentQuestionData, studentIndex){
    let studentAnswerData = currentQuestionData[studentIndex];

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
    var firstName = c[studentObj + '_FIRSTNAME'];
    var lastName = c[studentObj + '_LASTNAME'];
    let studentName = firstName + ' ' + lastName;
    let answerCount = studentAnswer.length;

    let mcqAnswer = answerCount === 0 ? 'No response' : options[studentAnswer[0]];
    for(let answerIndex = 1; answerIndex < answerCount ; answerIndex++){
       mcqAnswer = mcqAnswer + ', ' + options[studentAnswer[answerIndex]];
    }
    LaraReportElements.getStudentResponseElement(pageNumber, questionNumberInPage, studentName).should('have.text', mcqAnswer);
}
