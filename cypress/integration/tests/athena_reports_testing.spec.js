import * as AthenaReportsHelper from '../../support/helpers/athenaReportHelper';
import learnersReportPageElements from "../../support/elements/learners_report_page_elements";
import researcherReportsPageElements from '../../support/elements/researcher_reports_page_elements';
import * as C from "../../support/constants";


const RESEARCHER_REPORT_URL = 'https://researcher-reports.concord.org/branch/master/?portal=https%3A%2F%2Flearn-report.staging.concord.org';

context("Athena Reports Testing", () => {

    it('Verify Learners Report with 1 school, 1 teacher and 1 runnable', () => {

        const REPORT_URL = 'https://learn-report.staging.concord.org/api/v1/report_learners_es/external_report_query_jwt?schools=99117&teachers=362&runnables=externalactivity_1606';
        //naming convention for csv files
        //   s- school : cc concord consortium school Example: s_cc
        //  ur - usage report
        //  r - runnable : runnable names prefixed by r_
        // pf - permission form : permission form names prefixed by pf_
        const    USAGE_REPORT_EXPECTED_OUTPUT_FILE = 'cypress/fixtures/recordings/ur-s_cc-t_tejaladmin-r_athena_reports-ap_test.csv';
        const DETAILED_REPORT_EXPECTED_OUTPUT_FILE = 'cypress/fixtures/recordings/dr-s_cc-t_tejaladmin-r_athena_reports-ap_test.csv';

        AthenaReportsHelper.loginToAthenaReports(C.ADMIN_USERNAME, C.ADMIN_PASSWORD);
        AthenaReportsHelper.invokeUsageReportAPI(REPORT_URL, USAGE_REPORT_EXPECTED_OUTPUT_FILE);
        //This is to wait till we download the usage report file.
        cy.wait(2000);
        AthenaReportsHelper.invokeDetailedReportAPI(REPORT_URL, DETAILED_REPORT_EXPECTED_OUTPUT_FILE);
    });

});