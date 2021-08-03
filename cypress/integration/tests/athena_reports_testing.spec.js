import * as AthenaReportsHelper from '../../support/helpers/athenaReportHelper';
import * as C from "../../support/constants";
import learnersReportPageElements from "../../support/elements/learners_report_page_elements";
import {athenaReportsTestDataStaging} from "../../support/testdata/testdata_athena_reports";
import {addLearnerReportFilter} from "../../support/helpers/athenaReportHelper";

const LEARNER_REPORT_BASE_URL = 'https://learn-report.staging.concord.org/api/v1/report_learners_es/external_report_query_jwt?';

context("Athena Reports Testing", () => {

    it('Verify Learners Report with 1 school, 1 teacher and 1 runnable', () => {

        let inputData = athenaReportsTestDataStaging.test1.input;
        let outputData = athenaReportsTestDataStaging.test1.output

        AthenaReportsHelper.loginToAthenaReports(C.ADMIN_USERNAME, C.ADMIN_PASSWORD);
        AthenaReportsHelper.addFiltersInUI(learnersReportPageElements.SELECT_TEACHERS, inputData.teachers);
        AthenaReportsHelper.addFiltersInUI(learnersReportPageElements.SELECT_RUNNABLES, inputData.runnables);
        AthenaReportsHelper.verifyCountersInUI(outputData);

        let reportUrl = AthenaReportsHelper.addLearnerReportFilter(LEARNER_REPORT_BASE_URL, 'schools', inputData.schools);
        reportUrl = addLearnerReportFilter(reportUrl, 'teachers', inputData.teachers);
        reportUrl = addLearnerReportFilter(reportUrl, 'runnables', inputData.runnables);
        reportUrl = addLearnerReportFilter(reportUrl, 'permission_forms', inputData.permissionForms);

        AthenaReportsHelper.invokeReportAPI(reportUrl, inputData.usageReportExpectedOutput, true);
        AthenaReportsHelper.invokeReportAPI(reportUrl, inputData.detailedReportExpectedOutput, false);

    });

    it('Verify Learners Report with 1 school, 1 teacher and 1 runnable', () => {

        let inputData = athenaReportsTestDataStaging.test2.input;
        let outputData = athenaReportsTestDataStaging.test2.output

        AthenaReportsHelper.loginToAthenaReports(C.ADMIN_USERNAME, C.ADMIN_PASSWORD);
        AthenaReportsHelper.addFiltersInUI(learnersReportPageElements.SELECT_TEACHERS, inputData.teachers);
        AthenaReportsHelper.addFiltersInUI(learnersReportPageElements.SELECT_RUNNABLES, inputData.runnables);
        AthenaReportsHelper.verifyCountersInUI(outputData);

        let reportUrl = AthenaReportsHelper.addLearnerReportFilter(LEARNER_REPORT_BASE_URL, 'schools', inputData.schools);
        reportUrl = addLearnerReportFilter(reportUrl, 'teachers', inputData.teachers);
        reportUrl = addLearnerReportFilter(reportUrl, 'runnables', inputData.runnables);
        reportUrl = addLearnerReportFilter(reportUrl, 'permission_forms', inputData.permissionForms);

        AthenaReportsHelper.invokeReportAPI(reportUrl, inputData.usageReportExpectedOutput, true);
        AthenaReportsHelper.invokeReportAPI(reportUrl, inputData.detailedReportExpectedOutput, false);

    });

});