import signinPageElements from "../elements/signin_page_elements";
import researcherReportsPageElements from "../elements/researcher_reports_page_elements";
import learnersReportPageElements from "../elements/learners_report_page_elements";

const ATHENA_REPORTS_URL = 'https://learn-report.staging.concord.org/auth/login?after_sign_in_path=%2Freport%2Flearner';

export function loginToAthenaReports(username, password){
    cy.visit(ATHENA_REPORTS_URL);
    cy.url().then(url => {
        if(url.includes('/auth/login')){
            cy.get(signinPageElements.USERNAME_FIELD_SIGNIN_PAGE).type(username);
            cy.get(signinPageElements.PASSWORD_FIELD_SIGNIN_PAGE).type(password);
            cy.get(signinPageElements.SUBMIT_BUTTON_SIGNIN_PAGE).click();
        }
    });

}

export function addFiltersInUI(uiSelectElement, items){
    if(!items){
        return;
    }

    items.forEach(eachItem => {
        cy.get (uiSelectElement).type(eachItem + '{enter}', {force: true});
    });
}

export function verifyCountersInUI(counters){
    cy.get(learnersReportPageElements.LBL_LEARNERS_COUNT).should('have.text', counters.learnersCount);
    cy.get(learnersReportPageElements.LBL_STUDENTS_COUNT).should('have.text', counters.studentsCount);
    cy.get(learnersReportPageElements.LBL_CLASSES_COUNT).should('have.text', counters.classesCount);
    cy.get(learnersReportPageElements.LBL_RUNNABLES_COUNT).should('have.text', counters.runnableCount);
    cy.get(learnersReportPageElements.LBL_TEACHERS_COUNT).should('have.text', counters.teachersCount);
}

export function getLearnerReportUrl(props){
    let learnerReportUrl = 'https://learn-report.staging.concord.org' + props.queryUrl;
    let queryParams = props.queryParams;
    learnerReportUrl += '?'
    if(queryParams.schools){
        learnerReportUrl += ('schools=' + queryParams.schools + '&');
    }

    if(queryParams.teachers){
        learnerReportUrl += ('teachers=' + queryParams.teachers + '&');
    }

    if(queryParams.runnables){
        learnerReportUrl += ('runnables=' + queryParams.runnables );
    }

    if(queryParams.permission_forms){
        learnerReportUrl += ('permission_forms=' + queryParams.permission_forms );
    }

    return learnerReportUrl;
}

export function invokeQueryAPI(queryUrl, reportUrl, expectedOutputRile){
    cy.log("URL : " + queryUrl);
    cy.request(queryUrl).then(queryUrlResp => {
        invokeReportUrl(queryUrlResp.body, reportUrl, expectedOutputRile)
    })
}

function invokeReportUrl(queryUrlResp, reportUrl, expectedOutputRile){
    cy.request({
        method: 'POST',
        url: reportUrl,
        form: true,
        body: {
            json: JSON.stringify(queryUrlResp.json),
            jwt: queryUrlResp.token,
            allowDebug: 1,
            signature: null,
        },
    }).then((ignoreResp) => {
        downloadReport(expectedOutputRile);
    });
}

function downloadReport(expectedOutputFile){
    const REPORT_GENERATE_URL = 'https://researcher-reports.concord.org/branch/master/?portal=https%3A%2F%2Flearn-report.staging.concord.org';

    cy.visit(REPORT_GENERATE_URL);
    cy.get(researcherReportsPageElements.BTN_GENERATE_CSV_REPORT_LINK).click();

    cy.get(researcherReportsPageElements.LNK_TO_LAST_REPORT).then(($reportLink) => {
        //We are not clicking the UI link that we get after we click on 'Generate CSV Report Link"
        //We make a api get request to the URL in the UI.
        cy.request({
            url: $reportLink.text(),
            encoding: 'binary',
        }).then((actualOutputResp) => {
            //We get the report in actualOutpurResp.body.
            //We need to compare this report with our expected output in our recordings.
            readExpectedOutAndCompare(expectedOutputFile, actualOutputResp.body);
        })
    });
}

function readExpectedOutAndCompare(expectedOutputFile, actualOutput){
    cy.readFile(expectedOutputFile).then((expectedOutput) => {
        let isTestPass = verifyData(expectedOutput, actualOutput);
        if (!isTestPass) {
            //If the test fails we store the current report with suffix "_actual_output" so that we can compare with expected output file
            // to see if we have a bug. If the change is expected. delete the old expected out put file and use the new one as expected output.
            cy.writeFile(expectedOutputFile + '_actual_output' , actualOutput, 'binary').then((ignoreOutput) => {
                throw new Error("Expected output and actual output do not match. Please compare the files in fixtures/recording");
            });
        }
    });
}

function verifyData(expectedOutput, actualOutput){
    //We cannot compare expectedOutput and actualOutput as plain string comparision
    //as the rows are not ordered and same everytime
    let expectedLines = expectedOutput.split('\n');
    let actualLines = actualOutput.split('\n');
    if(expectedLines.length !== actualLines.length){
        return false;
    }

    //This is not a very optimal logic of comparing 2 files. But given that we will have only max of 10 to 20 lines of reports in our tests.
    //Keeping it this way for now.
    //Future optimization: We need to keep the recording sorted by one of the columns.
    //And then actual output should be sorted by the same column and then do a simple string comparision.
    //This optimization can take us to O(n) time complexity or O(log n) based on sorting logic that we use.
    //Other optimization could be in the product itself where rows are ordered by one column. Then no changes needed in automation.
    for(let actualLineIndex = 0 ; actualLineIndex < actualLines.length; actualLineIndex++){
        let foundMatch = false;
        for(let expectedLineIndex = 0 ; expectedLineIndex < expectedLines.length; expectedLineIndex++){
            if(expectedOutput[expectedLineIndex] === actualOutput[actualLineIndex]){
                foundMatch = true;
                break;
            }
        }
        if(!foundMatch){
            return false;
        }
    }
    return true;

}
