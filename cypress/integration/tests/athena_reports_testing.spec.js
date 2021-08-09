import * as AthenaReportsHelper from '../../support/helpers/athenaReportHelper';
import * as C from "../../support/constants";
import learnersReportPageElements from "../../support/elements/learners_report_page_elements";
import {athenaReportsTestDataStaging} from "../../support/testdata/testdata_athena_reports";
import {addLearnerReportFilter} from "../../support/helpers/athenaReportHelper";

context("Verify Athena Reports in Staging", () => {


    athenaReportsTestDataStaging.forEach((eachTest, index, arr) => {

        it("Verify " + eachTest.testName, () => {

            let inputData = eachTest.input;
            let outputData = eachTest.output;

            AthenaReportsHelper.loginToAthenaReports(C.ADMIN_USERNAME, C.ADMIN_PASSWORD);
            cy.waitForReact(1000, '#form-container');
            AthenaReportsHelper.addFiltersInUI(learnersReportPageElements.SELECT_SCHOOLS, inputData.schools);
            AthenaReportsHelper.addFiltersInUI(learnersReportPageElements.SELECT_TEACHERS, inputData.teachers);
            AthenaReportsHelper.addFiltersInUI(learnersReportPageElements.SELECT_RUNNABLES, inputData.runnables);
            AthenaReportsHelper.addFiltersInUI(learnersReportPageElements.SELECT_PERMISSION_FORMS, inputData.permissionForms);
            AthenaReportsHelper.verifyCountersInUI(outputData);

            let queryUrl = null;
            let usageReportUrl = null;
            let detailedReportUrl = null;

            cy.getReact('*', { props: { label: 'NEW Details Report' } }).getProps().then(detailedReportProps => {

                //Get Detailed Report URLS
                queryUrl = AthenaReportsHelper.getLearnerReportUrl(detailedReportProps);
                detailedReportUrl = detailedReportProps.reportUrl;
            }).then( () => {

                //NOW Get Usage Report URLS
                cy.getReact('*', { props: { label: 'NEW Usage Report' } }).getProps().then(usageReportProps => {
                    usageReportUrl = usageReportProps.reportUrl;

                    //Invoke detailed report api and usage report api.
                    AthenaReportsHelper.invokeQueryAPI(queryUrl, detailedReportUrl, inputData.detailedReportExpectedOutput);
                    AthenaReportsHelper.invokeQueryAPI(queryUrl, usageReportUrl, inputData.usageReportExpectedOutput);
                });
            });

        });
    });

});