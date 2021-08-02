import adminPageElements from "../elements/admin_page_elements";
import signinPageElements from "../elements/signin_page_elements";
import researcherReportsPageElements from "../elements/researcher_reports_page_elements";

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

export function invokeUsageReportAPI(reportAPI, expectedOutputFile){
    invokeReportAPI(reportAPI, expectedOutputFile, true);
}

export function invokeDetailedReportAPI(reportAPI, expectedOutputFile){
    invokeReportAPI(reportAPI, expectedOutputFile, false);
}

export function invokeReportAPI(reportAPI, expectedOutputFile, isUsageReport){
    cy.request(reportAPI).then((reportAPIResponse) => {
        invokeLambdaFunction(reportAPIResponse.body, expectedOutputFile, isUsageReport);
    });
}

function invokeLambdaFunction(inputData, expectedOutputFile, isUsageReport){

    const USAGE_REPORT_LAMBDA = 'https://bn84q7k6u0.execute-api.us-east-1.amazonaws.com/Prod/create-query/?reportServiceSource=authoring.staging.concord.org&tokenServiceEnv=staging&usageReport=true';
    const DETAILED_REPORT_LAMBDA = 'https://bn84q7k6u0.execute-api.us-east-1.amazonaws.com/Prod/create-query/?reportServiceSource=authoring.staging.concord.org&tokenServiceEnv=staging';

    let currentUrl = isUsageReport ? USAGE_REPORT_LAMBDA : DETAILED_REPORT_LAMBDA;

    cy.request({
        method: 'POST',
        url: currentUrl,
        form: true,
        body: {
            json: JSON.stringify(inputData.json),
            jwt: inputData.token,
            allowDebug: 1,
            signature: null,
        },
    }).then((resp) => {
        downloadReport(expectedOutputFile);
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
            cy.writeFile(expectedOutputFile + '_actual_output' , actualOutput, 'binary').then((writeoutput) => {
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
