export const automatedtestActivity1APData = {
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
        1 : {
            teacherFeedback: 'Great Job!',
            teacherScore: 100,
        },
        2: {
            teacherFeedback: 'Need to improve',
            teacherScore: 5,
        },
        3: {
            teacherFeedback: 'Failed',
            teacherScore: 0,
        },
        4: {
            teacherFeedback: 'You are right.',
            teacherScore: 8,
        },
        5: {
            teacherFeedback: 'Failed',
            teacherScore: 3,
        }
    },

    assignmentPages: {
        totalPages: 2,
        1: {
            questions: {
                totalQuestionsInPage: 2,
                1: {
                    questionType: 'OPEN_RESPONSE_QUESTION',
                    giveScore: true,
                    maxScore: 10,
                    prompt: 'Open response type question',
                    defaultAnswer: 'This is the default answer',
                    hint: 'This is the hint',
                    isSubmitEnabled: false,
                    postSubmissionFeedback: 'This is the post-submission feedback',
                    1 : {
                        answer: 'autotest1 answer',
                        teacherFeedback: 'Great Job!',
                        teacherScore: 10,
                    },
                    2: {
                        answer: 'autotest2 answer',
                        teacherFeedback: 'Need to improve',
                        teacherScore: 5,
                    },
                    3: {
                        answer: 'autotest3 answer',
                        teacherFeedback: 'Failed',
                        teacherScore: 1,
                    },
                    4: {
                        answer: 'autotest4 answer',
                        teacherFeedback: 'You are right.',
                        teacherScore: 8,
                    },
                    5: {
                        answer: 'autotest5 answer',
                        teacherFeedback: 'Failed',
                        teacherScore: 3,
                    }


                },
                2: {
                    questionType: 'OPEN_RESPONSE_QUESTION',
                    giveScore: true,
                    maxScore: 10,
                    prompt: 'This is the question',
                    defaultAnswer: 'This is the default answer',
                    hint: 'This is the hint',
                    isSubmitEnabled: true,
                    postSubmissionFeedback: 'This is post-submission feedback',
                    1 : {
                        answer: 'autotest1 answer',
                        teacherFeedback: 'Great Job!',
                        teacherScore: 10,
                    },
                    2: {
                        answer: 'autotest2 answer',
                        teacherFeedback: 'Need to improve',
                        teacherScore: 5,
                    },
                    3: {
                        answer: 'autotest3 answer',
                        teacherFeedback: 'Failed',
                        teacherScore: 1,
                    },
                    4: {
                        answer: 'autotest4 answer',
                        teacherFeedback: 'You are right.',
                        teacherScore: 8,
                    },
                    5: {
                        answer: 'autotest5 answer',
                        teacherFeedback: 'Failed',
                        teacherScore: 3,
                    }
                },

            }
        },
        2: {
            questions:{
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
                    optionsFeedback:{
                        1: 'Good job.',
                        2: 'Nice work.',
                        3: 'Nope.'
                    },
                    rightAnswer: [1,2],
                    prompt: 'why does',
                    postSubmissionFeedback: 'This is the post-submission feedback',
                    hint: 'This is the hint',
                    checkAnswer: true,
                    isSubmitEnabled: true,
                    giveScore: true,
                    maxScore: 10,
                    1 : {
                        answer: [1,2],
                        isRightAnswer: true,
                        optionsFeedback: 'Yes! You are correct.',
                        shouldCheckAnswer: true,
                        teacherFeedback: 'Great Job!',
                        teacherScore: 10,
                    },
                    2: {
                        answer: [2,3],
                        isRightAnswer: false,
                        optionsFeedback: 'Nope.',
                        shouldCheckAnswer: true,
                        teacherFeedback: 'Need to improve',
                        teacherScore: 5,
                    },
                    3: {
                        answer: [1,3],
                        shouldCheckAnswer: false,
                        optionsFeedback: 'Nope.',
                        isRightAnswer: false,
                        teacherFeedback: 'Failed',
                        teacherScore: 1,
                    },
                    4: {
                        answer: [1],
                        shouldCheckAnswer: true,
                        optionsFeedback: 'You\'re on the right track, but you didn\'t select all the right answers yet.',
                        isRightAnswer: false,
                        teacherFeedback: 'You need to improve.',
                        teacherScore: 8,
                    },
                    5: {
                        answer: [2],
                        shouldCheckAnswer: false,
                        optionsFeedback: 'You\'re on the right track, but you didn\'t select all the right answers yet.',
                        isRightAnswer: false,
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
                    optionsFeedback:{
                        1: 'Sorry. Wrong answer.',
                        2: 'You are right.',
                        3: 'Sorry. Wrong answer.'
                    },
                    rightAnswer: [2],
                    prompt: 'why does ...',
                    // postSubmissionFeedback: 'post-submission feedback.',
                    hint: 'This is hint',
                    checkAnswer: false,
                    isSubmitEnabled: false,
                    giveScore: true,
                    maxScore: 10,
                    1 : {
                        answer: [1],
                        isRightAnswer: true,
                        shouldCheckAnswer: false,
                        teacherFeedback: 'Great Job!',
                        teacherScore: 10,
                    },
                    2: {
                        answer: [2],
                        isRightAnswer: false,
                        shouldCheckAnswer: false,
                        teacherFeedback: 'Need to improve',
                        teacherScore: 5,
                    },
                    3: {
                        answer: [3],
                        shouldCheckAnswer: false,
                        isRightAnswer: false,
                        teacherFeedback: 'Failed',
                        teacherScore: 1,
                    },
                    4: {
                        answer: [1],
                        shouldCheckAnswer: true,
                        isRightAnswer: true,
                        teacherFeedback: 'You need to improve.',
                        teacherScore: 8,
                    },
                    5: {
                        answer: [2],
                        shouldCheckAnswer: false,
                        isRightAnswer: false,
                        teacherFeedback: 'Failed',
                        teacherScore: 3,
                    }
                },
            },
        }
    },

}

export default automatedtestActivity1APData;