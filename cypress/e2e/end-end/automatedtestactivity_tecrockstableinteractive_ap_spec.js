import { uid } from 'uid';

import * as TeacherHelper from "../../support/helpers/teacherHelper";
import {
    BTN_ACTIVITY_RUN,
    joinClass,
    getLinkGenerateReport
} from "../../support/elements/student_home_page_elements";
import * as adminHelper from "../../support/helpers/adminHelper";
import * as apRuntimeHelper from '../../support/helpers/apRuntimeHelper';
import * as C from "../../support/constants";
import * as tecrocksTableHelper from '../../support/helpers/tecrocksTableInteractiveHelper';

const CLASS_WORD = C.CLASS_WORD;
const CLASS_NAME = 'Class '+ CLASS_WORD;
const ASSIGNMENT_NAME = 'Automation Activity For TecRocks Table Interactive';
const STUDENTS = ["STUDENT3"];

context("Verify Student Acitivty Player Activity Work Flow", () => {

  before(function() {
    cy.visit(C.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  });

  function clearCookies() {
		cy.clearAllCookies();
	};

  it("Edit portal settings to open activity in same browser tab", () => {
    cy.login(C.ADMIN_USERNAME, C.ADMIN_PASSWORD);
    adminHelper.disableOpenInNewWindow(ASSIGNMENT_NAME);
    cy.logout();
    clearCookies();
  });

  it("Verify teacher adds class, assignment and 5 students to class", () => {
    cy.login(C.TEACHER1_USERNAME, C.TEACHER1_PASSWORD);
    TeacherHelper.addClass(CLASS_NAME, CLASS_NAME, CLASS_WORD);
    TeacherHelper.addAssignment(CLASS_NAME, ASSIGNMENT_NAME);
    cy.logout();
    clearCookies();
  });
  it("Verify students can use the class word and add themselves to the class", () => {
    STUDENTS.forEach(eachStudent => {
      cy.login(C[eachStudent + '_USERNAME'], C[eachStudent + '_PASSWORD']);
      joinClass(CLASS_WORD);
      cy.logout();
      clearCookies();
    });
  })
  it("Verify TecRocks Table Interactive", () => {
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
      BTN_ACTIVITY_RUN(CLASS_NAME).click();
      cy.wait(15000);
      apRuntimeHelper.goToPageNumber(0);
      cy.wait(5000);
      tecrocksTableHelper.verifyInitialDisplay();
      tecrocksTableHelper.verifySelectDataDialog();
      tecrocksTableHelper.verifyExitDataCollectionModeDialog();
      // tecrocksTableHelper.verifyTecRocksTable();
      tecrocksTableHelper.verifyDataCollectionModeDialog();
    });
  });

});
