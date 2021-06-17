export const automatedtestactivity1LaraData = {
    students: {
        totalStudentsAssigned: 5,
        1: {
            username: 'suser1',
            password: 'password',
            firstName: 'silly',
            lastName: 'user1',
        },
        2: {
            username: 'suser2',
            password: 'password',
            firstName: 'silly',
            lastName: 'user2',
        },
        3:{
            username: 'suser3',
            password: 'password',
            firstName: 'silly',
            lastName: 'user3',

        },
        4: {
            username: 'suser4',
            password: 'password',
            firstName: 'silly',
            lastName: 'user4',
        },
        5: {
            username: 'suser5',
            password: 'password',
            firstName: 'silly',
            lastName: 'user5',
        }

    },

    overallFeedback:{
        suser1 : {
            teacherFeedback: 'Great Job!',
            teacherScore: 100,
        },
        suser2: {
            teacherFeedback: 'Need to improve',
            teacherScore: 5,
        },
        suser3: {
            teacherFeedback: 'Failed',
            teacherScore: 0,
        },
        suser4: {
            teacherFeedback: 'You are right.',
            teacherScore: 8,
        },
        suser5: {
            teacherFeedback: 'Failed',
            teacherScore: 3,
        }
    },

    assignmentPages: {
        totalPages: 3,
        1: {
            questions: {
                totalQuestionsInPage: 2,
                1: {
                    questionType: 'OPEN_RESPONSE_QUESTION',
                    giveScore: true,
                    maxScore: 10,
                    prompt: '',
                    defaultAnswerText: '',
                    suser1 : {
                        answer: 'autotest1 answer',
                        teacherFeedback: 'Great Job!',
                        teacherScore: 100,
                    },
                    suser2: {
                        answer: 'autotest2 answer',
                        teacherFeedback: 'Need to improve',
                        teacherScore: 5,
                    },
                    suser3: {
                        answer: 'autotest3 answer',
                        teacherFeedback: 'Failed',
                        teacherScore: 0,
                    },
                    suser4: {
                        answer: 'autotest4 answer',
                        teacherFeedback: 'You are right.',
                        teacherScore: 8,
                    },
                    suser5: {
                        answer: 'autotest5 answer',
                        teacherFeedback: 'Failed',
                        teacherScore: 3,
                    }


                },
                2: {
                    questionType: 'OPEN_RESPONSE_QUESTION',
                    giveScore: true,
                    maxScore: 10,
                    prompt: '',
                    defaultAnswerText: '',
                    suser1 : {
                        answer: 'autotest1 answer',
                        teacherFeedback: 'Great Job!',
                        teacherScore: 10,
                    },
                    suser2: {
                        answer: 'autotest2 answer',
                        teacherFeedback: 'Need to improve',
                        teacherScore: 5,
                    },
                    suser3: {
                        answer: 'autotest3 answer',
                        teacherFeedback: 'Failed',
                        teacherScore: 0,
                    },
                    suser4: {
                        answer: 'autotest4 answer',
                        teacherFeedback: 'You are right.',
                        teacherScore: 8,
                    },
                    suser5: {
                        answer: 'autotest5 answer',
                        teacherFeedback: 'Failed',
                        teacherScore: 3,
                    }
                },
            }
        },
        2: {
            questions: {
                totalQuestionsInPage: 2,
                1: {
                    questionType: 'MCQ',
                    multipleAnswers: true,
                    numberOfOptions: 3,
                    options:{
                      1: 'a',
                      2: 'b',
                      3: 'c'
                    },
                    checkAnswer: true,
                    isSubmitEnabled: true,
                    giveScore: true,
                    maxScore: 10,

                    suser1 : {
                        answer: [2, 3],
                        shouldCheckAnswer: true,
                        teacherFeedback: 'Great Job!',
                        teacherScore: 10,
                    },
                    suser2: {
                        answer: [1, 3],
                        shouldCheckAnswer: true,
                        teacherFeedback: 'Need to improve',
                        teacherScore: 5,
                    },
                    suser3: {
                        answer: [3],
                        shouldCheckAnswer: false,
                        teacherFeedback: 'Failed',
                        teacherScore: 0,
                    },
                    suser4: {
                        answer: [1],
                        shouldCheckAnswer: true,
                        teacherFeedback: 'You are right.',
                        teacherScore: 8,
                    },
                    suser5: {
                        answer: [2],
                        shouldCheckAnswer: false,
                        teacherFeedback: 'Failed',
                        teacherScore: 3,
                    }
                },
                2: {
                    questionType: 'MCQ',
                    multipleAnswers: false,
                    numberOfOptions: 3,
                    options:{
                        1: 'a',
                        2: 'b',
                        3: 'c'
                    },
                    checkAnswer: false,
                    isSubmitEnabled: false,
                    giveScore: true,
                    maxScore: 10,

                    suser1 : {
                        answer: [3],
                        teacherFeedback: 'Great Job!',
                        teacherScore: 3,
                    },
                    suser2: {
                        answer: [2],
                        teacherFeedback: 'Need to improve',
                        teacherScore: 3,
                    },
                    suser3: {
                        answer: [3],
                        teacherFeedback: 'Failed',
                        teacherScore: 3,
                    },
                    suser4: {
                        answer: [2],
                        teacherFeedback: 'You are right.',
                        teacherScore: 3,
                    },
                    suser5: {
                        answer: [1],
                        teacherFeedback: 'Failed',
                        teacherScore: 3,
                    }
                },
            }

        }
    },

}