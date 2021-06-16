const automatedTestActivity1_Lara = {

    LBL_HEADER : '.content-hdr .h2',
    TXT_PAGE1_QUESTION1_OPENRESPONSE_ANSWER: 'div.questions-mod div.question:nth-child(1) #embeddable_open_response_answer_answer_text',

    TXT_PAGE1_QUESTION2_OPENRESPONSE_ANSWER: 'div.questions-mod div.question:nth-child(2) #embeddable_open_response_answer_answer_text',

    CHK_PAGE2_QUESTION3_MCQ_CHOICE1: 'div.questions-mod div.question:nth-child(1) div.choice-container div.choice:nth-child(1) input',
    CHK_PAGE2_QUESTION3_MCQ_CHOICE2: 'div.questions-mod div.question:nth-child(1) div.choice-container div.choice:nth-child(2) input',
    CHK_PAGE2_QUESTION3_MCQ_CHOICE3: 'div.questions-mod div.question:nth-child(1) div.choice-container div.choice:nth-child(3) input',

    BTN_SUBMIT_PAGE2_QUESTION3_MCQ : 'div.questions-mod div.question:nth-child(1) button.prediction_button',

    CHK_PAGE2_QUESTION4_MCQ_CHOICE1: 'div.questions-mod div.question:nth-child(2) div.choice-container div.choice:nth-child(1) input',
    CHK_PAGE2_QUESTION4_MCQ_CHOICE2: 'div.questions-mod div.question:nth-child(2) div.choice-container div.choice:nth-child(2) input',
    CHK_PAGE2_QUESTION4_MCQ_CHOICE3: 'div.questions-mod div.question:nth-child(2) div.choice-container div.choice:nth-child(3) input',

    BTN_GENERATE_REPORT: 'div.submit.report a.gen-report',
    LNK_ADMIN_ACTIVITY_END: 'div.profile-u-name a.popup-trigger',
    LNK_NOT_YOU: 'div.known-user.popup-prompt span a',

    SUMMARY_REPORT_ANSWER_1: 'div.summary-mod div.answer:nth-child(1)',
    SUMMARY_REPORT_ANSWER_2: 'div.summary-mod div.answer:nth-child(2)',
    SUMMARY_REPORT_ANSWER_3: 'div.summary-mod div.answer:nth-child(3)',
    SUMMARY_REPORT_ANSWER_4: 'div.summary-mod div.answer:nth-child(4)',

    BTN_CLOSE_SUMMARY_REPORT: '#nav-activity-menu ul li:nth-child(3)',


};

export default automatedTestActivity1_Lara;