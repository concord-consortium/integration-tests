export const athenaReportsTestDataStaging = [
    {
        testName: 'One Teacher',
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
        testName: 'One Runnable',
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
    },
    {
        testName: 'Multiple Teachers',
        input: {
            teachers: ['Tejal Admin', 'srivardhan sunkesula'],

            usageReportExpectedOutput: 'cypress/fixtures/recordings/ur-t_tejaladmin_srivardhansunkesula.csv',
            detailedReportExpectedOutput: 'cypress/fixtures/recordings/dr-t_tejaladmin_srivardhansunkesula.csv',
        },
        output: {
            learnersCount: 89,
            studentsCount: 18,
            classesCount: 21,
            teachersCount: 2,
            runnableCount: 34,
        }
    },
    {
        testName: 'One Permission Form With One Runnable',
        input: {
            runnables: ['LARA Smoke test sequence'],
            permissionForms: ['ITSI: ITSI permissions form'],

            usageReportExpectedOutput: 'cypress/fixtures/recordings/ur-r_larasmoketestsequence-pf_itsiitsipermissionsform.csv',
            detailedReportExpectedOutput: 'cypress/fixtures/recordings/dr-r_larasmoketestsequence-pf_itsiitsipermissionsform.csv',
        },
        output: {
            learnersCount: 4,
            studentsCount: 4,
            classesCount: 2,
            teachersCount: 4,
            runnableCount: 1,
        }
    },
    {
        testName: 'One Teacher One Runnable - AP Activity',
        input: {
            teachers: ['Athena Teacher1'],
            runnables: ['Athena-Reports-AP-Test2'],

            usageReportExpectedOutput: 'cypress/fixtures/recordings/ur-t_athenateacher1-r_athenareportsaptest2.csv',
            detailedReportExpectedOutput: 'cypress/fixtures/recordings/dr-t_athenateacher1-r_athenareportsaptest2.csv',
        },
        output: {
            learnersCount: 6,
            studentsCount: 3,
            classesCount: 2,
            teachersCount: 2,
            runnableCount: 1,
        }
    },
    {
        testName: 'One Teacher One Runnable - LARA Activity',
        input: {
            teachers: ['Athena Teacher1'],
            runnables: ['Athena-Reports-LARA-Test2'],

            usageReportExpectedOutput: 'cypress/fixtures/recordings/ur-t_athenateacher1-r_athenareportslaratest2.csv',
            detailedReportExpectedOutput: 'cypress/fixtures/recordings/dr-t_athenateacher1-r_athenareportslaratest2.csv',
        },
        output: {
            learnersCount: 6,
            studentsCount: 3,
            classesCount: 2,
            teachersCount: 2,
            runnableCount: 1,
        }
    }
]