import schoolsPageElements from '../../elements/schools_page_elements.js'
import adminPageElements from '../../elements/admin_page_elements.js'
import landingPageElements from '../../elements/landing_page_elements.js'
import signupPageElements from '../../elements/signup_page_elements.js'
import userHomePageElements from '../../elements/user_home_page_elements.js'
import * as teacherHelper from '../teacherHelper.js'
import * as adminHelper from '../adminHelper.js'
import constants from '../../constants.js'

export function accountsSetup() {

  // createSchool();
  accountsTeardown();
  createTeacherAccounts();
  activateTeacherAccounts();
  makeTeacher5Admin();
  createClass();
  registerStudents();
}

export function accountsTeardown() {
  var teachers = ["TEACHER1", "TEACHER2", "TEACHER3", "TEACHER4", "TEACHER5"];
  var students = ["STUDENT1", "STUDENT2", "STUDENT3", "STUDENT4", "STUDENT5"];

  cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user
  adminHelper.openUsersAdminSection();

  teachers.forEach(eachTeacher => {
    var username = constants[eachTeacher + '_USERNAME'];
    var fullName = constants[eachTeacher + '_FULLNAME'];
    adminHelper.removeUser(username, fullName);
  });

  students.forEach(eachStudent => {
    var username = constants[eachStudent + '_USERNAME'];
    var fullName = constants[eachStudent + '_FULLNAME'];
    adminHelper.removeUser(username, fullName);
  });

  cy.logout();
}

function createSchool() {
  cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user

  cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click(); // Click 'Admin' link from left nav
  cy.get(adminPageElements.SCHOOLS_LINK).click(); // Click 'Schools' link from left nav

  cy.get(schoolsPageElements.SEARCH_FIELD).type(constants.SCHOOL_NAME);
  cy.get(schoolsPageElements.SEARCH_BUTTON).click().then(() => {
    return cy.get(schoolsPageElements.SEARCH_PAGE_CONTENT);
  }).then(($searchPageContent) => {
    cy.log("$searchPageContent.find(schoolsPageElements.SEARCH_RESULT).length : " + $searchPageContent.find(schoolsPageElements.SEARCH_RESULT).length);
    if($searchPageContent.find(schoolsPageElements.SEARCH_RESULT).length < 1) {
      cy.get(schoolsPageElements.CREATE_SCHOOL).click();
      cy.get(schoolsPageElements.SCHOOL_NAME).type(constants.SCHOOL_NAME);
      cy.get(schoolsPageElements.SCHOOL_DESCRIPTION).type(constants.SCHOOL_DESCRIPTION);
      cy.get(schoolsPageElements.SCHOOL_ZIPCODE).type(constants.SCHOOL_ZIPCODE);
      cy.get(schoolsPageElements.SCHOOL_CITY).type(constants.SCHOOL_CITY);
      cy.get(schoolsPageElements.SCHOOL_STATE).select(constants.SCHOOL_STATE);
      cy.get(schoolsPageElements.SCHOOL_DISTRICT).select(constants.SCHOOL_DISTRICT);
      cy.get(schoolsPageElements.SAVE_BUTTON).click();
    }
  });
}

function createTeacherAccounts() {
  var teachers = ["TEACHER1", "TEACHER2", "TEACHER3", "TEACHER4", "TEACHER5"];

  teachers.forEach(eachTeacher => {
    var firstName = constants[eachTeacher + '_FIRSTNAME'];
    var lastName = constants[eachTeacher + '_LASTNAME'];
    var username = constants[eachTeacher + '_USERNAME'];
    var password = constants[eachTeacher + '_PASSWORD'];
    var email = constants[eachTeacher + '_EMAIL'];

    cy.get(landingPageElements.REGISTER_BUTTON).click();
    cy.get(signupPageElements.TEACHER_LINK).click();
    cy.get(signupPageElements.TEACHER_FIRSTNAME).type(firstName);
    cy.get(signupPageElements.TEACHER_LASTNAME).type(lastName);
    cy.get(signupPageElements.TEACHER_PASSWORD).type(password);
    cy.get(signupPageElements.TEACHER_CONFIRM_PASSWORD).type(password);
    cy.get(signupPageElements.NEXT_BUTTON).click();
    cy.get(signupPageElements.TEACHER_USERNAME).type(username);
    cy.get(signupPageElements.TEACHER_EMAIL).type(email);
    cy.get(signupPageElements.TEACHER_COUNTRY).type(constants.SCHOOL_COUNTRY + '{enter}');
    cy.get(signupPageElements.TEACHER_ZIPCODE).type(constants.SCHOOL_ZIPCODE);
    cy.get(signupPageElements.TEACHER_SCHOOL).click({force:true}).find('input').focus();
    cy.get(signupPageElements.TEACHER_SCHOOL_DROPDOWN).then(($dropdown) => {
      if($dropdown.find(signupPageElements.TEACHER_SCHOOL_OPTIONS).length < 2) {
        cy.get(signupPageElements.TEACHER_ADD_NEW_SCHOOL).click({force:true});
        cy.get(signupPageElements.TEACHER_ADD_NEW_SCHOOL_TEXT).type(constants.SCHOOL_NAME);
      } else {
        cy.contains(constants.SCHOOL_NAME).click({force:true});
      }
    });
    cy.get(signupPageElements.REGISTER_BUTTON).click();
    cy.wait(1000);
    cy.get(signupPageElements.CLOSE_BUTTON).click();
  });
}

function activateTeacherAccounts() {
  var teachers = ["TEACHER1", "TEACHER2", "TEACHER3", "TEACHER4", "TEACHER5"];

  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user
  adminHelper.openUsersAdminSection();

  teachers.forEach(eachTeacher => {
    var firstName = constants[eachTeacher + '_FIRSTNAME'];
    var lastName = constants[eachTeacher + '_LASTNAME'];
    var username = constants[eachTeacher + '_USERNAME'];
    var fullName = constants[eachTeacher + '_FULLNAME'];
    adminHelper.activateUser(username, fullName, firstName, lastName);
  });
  cy.logout();
}

function makeTeacher5Admin() {

  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user
  adminHelper.openUsersAdminSection();

  var username = constants['TEACHER5_USERNAME'];
  var fullName = constants['TEACHER5_FULLNAME'];
  adminHelper.addAdminRoleToUser(username, fullName);

  cy.logout();
}

function createClass() {
  cy.login(constants.TEACHER1_USERNAME, constants.TEACHER1_PASSWORD);
  teacherHelper.addClass("Setup Class", "Setup Class", constants.CLASS_WORD);
}

function registerStudents() {
  var students = ["STUDENT1", "STUDENT2", "STUDENT3", "STUDENT4", "STUDENT5"];
  var className = "Setup Class";
  teacherHelper.openStudentRosterSection(className);

  students.forEach(eachStudent => {
    var firstName = constants[eachStudent + '_FIRSTNAME'];
    var lastName = constants[eachStudent + '_LASTNAME'];
    var name = constants[eachStudent + '_NAME'];
    var password = constants[eachStudent + '_PASSWORD'];

    teacherHelper.addUnregisteredStudentToClass(name, firstName, lastName, password);
  });
  teacherHelper.archiveClass(className);
  cy.logout();
}
