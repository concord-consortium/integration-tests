export const athenaReportsTestDataStaging = [
    {
        input: {
            teachers: ['Tejal Admin'],
            runnables: ['Athena-Reports-AP-Test'],

            //naming convention for csv files
            //   s- school : cc concord consortium school Example: s_cc
            //  ur - usage report
            //  r - runnable : runnable names prefixed by r_
            // pf - permission form : permission form names prefixed by pf_
            usageReportExpectedOutput: 'cypress/fixtures/recordings/ur-s_cc-t_tejaladmin-r_athena_reports-ap_test.csv',
            detailedReportExpectedOutput: 'cypress/fixtures/recordings/dr-s_cc-t_tejaladmin-r_athena_reports-ap_test.csv',
        },
        output: {
            learnersCount: 6,
            teachersCount: 2,
            studentsCount: 5,
            classesCount: 3,
            runnableCount: 1,

        }
    },
    {
        input: {
            runnables: ['Athena-Reports-LARA-Test2'],

            usageReportExpectedOutput: 'cypress/fixtures/recordings/ur-r_athena-reports-lara-test2.csv',
            detailedReportExpectedOutput: 'cypress/fixtures/recordings/dr-r_athena-reports-lara-test2.csv',
        },
        output: {
            learnersCount: 11,
            studentsCount: 6,
            classesCount: 4,
            teachersCount: 4,
            runnableCount: 1,
        }
    }
]