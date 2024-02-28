import {   
    BTN_ACTIVITY_RUN_WITH_INDEX
} from "../../support/elements/student_home_page_elements";
import * as apRuntimeHelper from '../../support/helpers/apRuntimeHelper';
import * as C from "../../support/constants";
import {GlossaryElements as glossary} from "../../support/elements/glossary_elements";

const ASSIGNMENT_NAME = 'Automation Activity For Display Second Language First';
const ASSIGNMENT_NAME1 = 'Automation Activity For Display Second Language First Unchecked';
const STUDENTS = ["STUDENT8"];

context("Verify Student Acitivty Player Glossary Second Language Display", () => {

  before(function() {
    cy.visit(C.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  });

  function clearCookies() {
		cy.clearAllCookies();
	};

  it("Verify glossary second language is displayed first", () => {
      let studentIndex = 0;
      STUDENTS.forEach(eachStudent => {
      let studentObj = {
      firstName: C[eachStudent + '_FIRSTNAME'],
      lastName: C[eachStudent + '_LASTNAME'],
      username: C[eachStudent + '_USERNAME'],
      password: C[eachStudent + '_PASSWORD'],
      };
      studentIndex++;
      cy.login(studentObj.username, studentObj.password);
      BTN_ACTIVITY_RUN_WITH_INDEX("Glossary Class", 0).click({ force: true });
      cy.wait(15000);
      apRuntimeHelper.goToActivityHome(ASSIGNMENT_NAME);
      apRuntimeHelper.goToPageNumber(0);
      cy.wait(5000);
      glossary.getGlossaryWord().click({ force: true });
      glossary.verifyLanguageButton(0, "Spanish");
      glossary.verifyLanguageButton(1, "English");
      glossary.verifyTestTerm("Test Term Spanish");
      cy.go("back");
      cy.logout();
      clearCookies();
    });
  });
  it("Verify glossary second language is not displayed first", () => {
      let studentIndex = 0;
      STUDENTS.forEach(eachStudent => {
      let studentObj = {
        firstName: C[eachStudent + '_FIRSTNAME'],
        lastName: C[eachStudent + '_LASTNAME'],
        username: C[eachStudent + '_USERNAME'],
        password: C[eachStudent + '_PASSWORD'],
      };
      studentIndex++;
      cy.visit(C.LEARN_PORTAL_BASE_URL);
      cy.login(studentObj.username, studentObj.password);
      cy.wait(5000);
      BTN_ACTIVITY_RUN_WITH_INDEX("Glossary Class", 1).click({ force: true });
      cy.wait(15000);
      apRuntimeHelper.goToActivityHome(ASSIGNMENT_NAME1);
      apRuntimeHelper.goToPageNumber(0);
      cy.wait(5000);
      glossary.getGlossaryWord().click({ force: true });
      glossary.verifyLanguageButton(0, "English");
      glossary.verifyLanguageButton(1, "Spanish");
      glossary.verifyTestTerm('What do you think "Test Term" means?');
      cy.go("back");
      cy.logout();
    });
  });

});
