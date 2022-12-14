export const automatedtestSequenceWildFireModuleData = {
    totalActivities: 6,
    timeInMinutes: '235 minutes',
    1:{
      name: "Cypress Feelin' Hot, Hot, Hot!",
        assignmentPages: {
            totalPages: 7,
            1: {
                questions: {
                    totalQuestionsInPage: 2,
                    1: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'What are some ways that the people living in this town may be impacted by the wildfire?',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    2: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "Describe you or your family's experience with wildfires, if any.",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                }
            },
            2: {
                questions: {
                    totalQuestionsInPage: 3,
                    1: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "Tree rings can tell a story about a tree's history. Look at the picture of the tree rings to the right. ",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    2: {
                        questionType: 'MULTI_SELECT',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'All the trees will be gone and no new plants will be able to grow.',
                            2: 'Additional light will be able to reach the forest floor so new plants can grow.',
                            3: 'The soil on the forest floor will be enriched with nutrients for the plants that survived.',
                            4: 'The land will be robbed of nutrients and new plants will not survive. '
                        },
                        optionsFeedback:{
                            1: 'Some trees and plants will burn but others will survive. And, new plants will be able to grow.',
                            2: "You're on the right track, but you didn't select all the right answers yet.",
                            3: 'Yes! You are correct.',
                        },
                        rightAnswer: [3],
                        prompt: 'What effect might a wildfire have on a forested area in the years after it burns through? Check all that apply.',
                        postSubmissionFeedback: '',
                        hint: '',
                        checkAnswer: false,
                        isSubmitEnabled: false,
                        giveScore: true,
                        maxScore: 10,
                        1 : {
                            answer: [1],
                            answer1: '2',
                            answer2: '3',
                            isRightAnswer: true,
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: [2],
                            isRightAnswer: false,
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    3: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "In the western United States, there are many pine trees like the Giant Sequoia that has pine cones that only open when they are exposed to extremely high temperatures. ",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                }

            },
            3: {
                questions: {
                    totalQuestionsInPage: 2,
                    1: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Why do you think it was important for people to control wildfires during that time?',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    2: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "How do you think forests change when wildfires are put out quickly for many years?",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                }

            },
            4: {
                questions: {
                    totalQuestionsInPage: 4,
                    1: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'Overall increase',
                            2: 'Overall decrease',
                            3: 'Up and down',
                            4: 'No trend'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                        },
                        rightAnswer: [1],
                        prompt: 'What trend do you see in the amount of acres burned from 1915 to 2015?',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    2: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Use the graph to explain your answer.',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    3: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'Very certain',
                            2: 'Somewhat certain',
                            3: 'Somewhat uncertain',
                            4: 'Very uncertain'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                        },
                        rightAnswer: [1],
                        prompt: 'How certain are you about the trend you see?',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    4: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "Explain why you are certain or uncertain about the trend.",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                }

            },
            5: {
                questions: {
                    totalQuestionsInPage: 2,
                    1: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'Yes',
                            2: 'No'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                        },
                        rightAnswer: [1],
                        prompt: 'Are there certain groups of people that you think are more at risk than others when wildfires move close to the city?',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    2: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Explain your answer.',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                }

            },
            6: {
                questions: {
                    totalQuestionsInPage: 4,
                    1: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'List three ways that you think the wildfire in the video impacts this area.',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    2: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'Yes',
                            2: 'No'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct."
                        },
                        rightAnswer: [1],
                        prompt: 'Do you think people could be affected by this wildfire even if they are not near it? ',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    3: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Explain your answer to Question 15.',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    4: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "What questions do you have about wildfires?",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                }

            }
        },

    },
    2:{
      name: "Cypress Earth, Wind, and Wildfire",
        assignmentPages: {
            totalPages: 8,
            1: {
                questions: {
                    totalQuestionsInPage: 2,
                    1: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Why do you think there are more wildfires in the late summer and early fall than there are in the winter and spring?',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    2: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "How does the wind affect the wildfire spread? ",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                }
            },
            2: {
                questions: {
                    totalQuestionsInPage: 2,
                    1: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "According to the video, what are the three factors needed for a wildfire?",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    2: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "One component of the Fire Triangle is heat.",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                }

            },
            3: {
                questions: {
                    totalQuestionsInPage: 4,
                    1: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'The blackened area on the model',
                            2: 'The amount of acres burned on the graph',
                            3: 'The slope of the acres burned line on the graph',
                            4: 'The time in hours in the graph.'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                            4: 'Yes! You are correct.'
                        },
                        rightAnswer: [1],
                        prompt: 'Which of the following information represents the rate of wildfire spread? ',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    2: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'No drought',
                            2: 'Mild drought',
                            3: 'Medium drought',
                            4: 'No difference'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                        },
                        rightAnswer: [1],
                        prompt: 'Which drought condition made the wildfire spread the fastest?',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    3: {
                        questionType: 'IMAGE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Circle the zone with the fastest wildfire spread. ',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    4: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "Explain why the wildfire burned fastest under the drought condition you selected. Think about the moisture level of the vegetation.",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                }

            },
            4: {
                questions: {
                    totalQuestionsInPage: 6,
                    1: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'The lower the wind speed, the faster the fire spreads.',
                            2: 'The higher the wind speed, the faster the fire spreads.',
                            3: 'The higher the wind speed, the faster the fire burns out.',
                            4: 'Wind speed has little effect on the spread of wildfires.'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                        },
                        rightAnswer: [1],
                        prompt: 'Experiment with different wind speeds. Watch how the wildfires spread.',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    2: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Based on what you observed in the model, explain your answer to Question 9.',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    3: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'The fire spreads in the same direction of the wind',
                            2: 'The fire spreads in the opposite direction of the wind',
                            3: 'The fire spreads evenly in all directions.',
                            4: 'Wind direction has little effect on the spread of wildfires'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                        },
                        rightAnswer: [1],
                        prompt: 'Experiment with different wind directions. Watch how the wildfires spread.',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    4: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "Based on what you observed in the model, explain your answer to Question 11.",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    5: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'Drought level',
                            2: 'Wind speed',
                            3: 'Wind direction',
                            4: 'None'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                        },
                        rightAnswer: [1],
                        prompt: 'Experiment with different wind directions. Watch how the wildfires spread.',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    6: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: "Explain why you are uncertain about the factor you chose.",
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                }

            },
            5: {
                questions: {
                    totalQuestionsInPage: 6,
                    1: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'Foothills, Plains, Mountains',
                            2: 'Plains, Foothills, Mountains',
                            3: 'Mountains, Foothills, Plains',
                            4: 'Mountains, Plains, Foothills'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                            4: 'Yes! You are correct.',
                        },
                        rightAnswer: [1],
                        prompt: 'Based on your observations when you placed a spark in each zone, choose the option below that ranks the zones from the fastest spread to the slowest.',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    2: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'The fire spread more quickly as it moved up the mountain',
                            2: 'The fire spread more quickly as it moved down the mountain',
                            3: 'The fire spread at the same rate through the mountains'
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.'
                        },
                        rightAnswer: [1],
                        prompt: 'Did the wildfire move more quickly as it moved up or down the mountain?',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    3: {
                        questionType: 'IMAGE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: ' Take a snapshot to support your answer. ',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    4: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Explain your answer.',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                    5: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'The type of terrain (mountain, foothills or plains) ',
                            2: 'The location of the spark (at the top or bottom of a mountain)',
                            3: "I'm certain about both",
                            4: "I'm uncertain about both",
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                            4: 'Yes! You are correct.'
                        },
                        rightAnswer: [1],
                        prompt: 'Based on what you observed in the Wildfire Explorer, which effect on wildfire spread are you more uncertain about?',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    6: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Explain why you are certain or uncertain about the factor you chose.',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                }

            },
            6: {
                questions: {
                    totalQuestionsInPage: 4,
                    1: {
                        questionType: 'MCQ',
                        multipleAnswers: true,
                        numberOfOptions: 4,
                        options:{
                            1: 'Flat plain',
                            2: 'Gentle slope',
                            3: 'Steep slope lit at the bottom of the slope',
                            4: 'Steep slope lit at the top of the slope',
                            5: 'They all spread at the same rate',
                        },
                        optionsFeedback:{
                            1: 'Yes! You are correct.',
                            2: "Yes! You are correct.",
                            3: 'Yes! You are correct.',
                            4: "Yes! You are correct.",
                            5: "Yes! You are correct."
                        },
                        rightAnswer: [1],
                        prompt: 'In which experimental setup did the fire spread the fastest?',
                        postSubmissionFeedback: '',
                        hint: '',
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
                            shouldCheckAnswer: true,
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }
                    },
                    2: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'How does that help explain how wildfires spread differently on flat plains versus mountains?',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                }

            },
            7: {
                questions: {
                    totalQuestionsInPage: 1,
                    1: {
                        questionType: 'OPEN_RESPONSE_QUESTION',
                        giveScore: true,
                        maxScore: 10,
                        prompt: 'Given what you now know about drought level, wind direction and speed, and terrain how would you explain why the Camp Fire was so severe?',
                        defaultAnswer: '',
                        hint: '',
                        isSubmitEnabled: false,
                        postSubmissionFeedback: '',
                        1 : {
                            answer: 'autotest1 answer',
                            teacherFeedback: 'Great Job!',
                            teacherScore: 10,
                        },
                        2: {
                            answer: 'autotest2 answer',
                            teacherFeedback: 'Need to improve',
                            teacherScore: 5,
                        }

                    },
                }

            }
        },

    },

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

}
