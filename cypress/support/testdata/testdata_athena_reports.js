export const athenaReportsTestDataStaging = {
    test1: {
        input: {
            schools: [

            ],
            teachers: [
                {
                    //name is for UI filtering
                    name: 'Tejal Admin',
                    //id is for API filtering
                    id: '362'
                }

            ],
            runnables: [
                {
                    //name is for UI filtering
                    name: 'Athena-Reports-AP-Test',
                    //id is for API filtering
                    id: 'externalactivity_1606'
                }
            ],
            permissionForms: [

            ],

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
    test2:{
        input: {
            schools: [
            ],
            teachers: [
            ],
            runnables: [
                {
                    //name is for UI filtering
                    name: 'Athena-Reports-LARA-Test2',
                    //id is for API filtering
                    id: 'externalactivity_1607'
                }
            ],
            permissionForms: [

            ],
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
}