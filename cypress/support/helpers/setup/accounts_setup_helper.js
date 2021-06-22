import schoolsPageElements from '../../elements/schools_page_elements.js'
import adminPageElements from '../../elements/admin_page_elements.js'
import landingPageElements from '../../elements/landing_page_elements.js'
import signupPageElements from '../../elements/signup_page_elements.js'
import userHomePageElements from '../../elements/user_home_page_elements.js'
import * as teacherHelper from '../teacherHelper.js'
import * as adminHelper from '../adminHelper.js'
import constants from '../../constants.js'

export function accountsSetup() {

  //createSchool();
  accountsTeardown();
  createTeacherAccounts();
  activateTeacherAccounts();
  createClass();
  registerStudents();
}

export function accountsTeardown() {
  cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user

  adminHelper.openUsersAdminSection();

  cy.fixture('UserAccounts.json').then(($userAccounts) => {
    $userAccounts.teacher.forEach(eachTeacher => {
      cy.log("eachTeacher : " + JSON.stringify(eachTeacher));
      var firstName = eachTeacher.firstName;
      var lastName = eachTeacher.lastName;
      var username = eachTeacher.username;
      var fullName = firstName + " " + lastName;

      adminHelper.removeUser(username, fullName);
    });
    $userAccounts.student.forEach(eachStudent => {
      cy.log("eachStudent : " + JSON.stringify(eachStudent));
      var firstName = eachStudent.firstName;
      var lastName = eachStudent.lastName;
      var username = eachStudent.username;
      var fullName = firstName + " " + lastName;

      adminHelper.removeUser(username, fullName);
    });
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
  cy.fixture('UserAccounts.json').then(($userAccounts) => {
    $userAccounts.teacher.forEach(eachTeacher => {
      cy.get(landingPageElements.REGISTER_BUTTON).click();
      cy.get(signupPageElements.TEACHER_LINK).click();
      cy.log("eachTeacher : " + JSON.stringify(eachTeacher));

      cy.get(signupPageElements.TEACHER_FIRSTNAME).type(eachTeacher.firstName);
      cy.get(signupPageElements.TEACHER_LASTNAME).type(eachTeacher.lastName);
      cy.get(signupPageElements.TEACHER_PASSWORD).type(constants.TEACHER_PASSWORD);
      cy.get(signupPageElements.TEACHER_CONFIRM_PASSWORD).type(constants.TEACHER_PASSWORD);
      cy.get(signupPageElements.NEXT_BUTTON).click();
      cy.get(signupPageElements.TEACHER_USERNAME).type(eachTeacher.username);
      cy.get(signupPageElements.TEACHER_EMAIL).type(eachTeacher.email);
      cy.get(signupPageElements.TEACHER_COUNTRY).type(constants.SCHOOL_COUNTRY + '{enter}');
      cy.get(signupPageElements.TEACHER_ZIPCODE).type(constants.SCHOOL_ZIPCODE);
      //cy.get(signupPageElements.TEACHER_SCHOOL).type(constants.SCHOOL_NAME + '{enter}');

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
      cy.get(signupPageElements.CLOSE_BUTTON).click();
    });
  });
}

function activateTeacherAccounts() {
  cy.login(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user
  adminHelper.openUsersAdminSection();

  cy.fixture('UserAccounts.json').then(($userAccounts) => {
    $userAccounts.teacher.forEach(eachTeacher => {
      cy.log("eachTeacher : " + JSON.stringify(eachTeacher));
      var fullName = eachTeacher.firstName + " " + eachTeacher.lastName;
      adminHelper.activateUser(eachTeacher.username, fullName, eachTeacher.firstName, eachTeacher.lastName);
    });
  });
  cy.logout();
}

function createClass() {
  cy.fixture('UserAccounts.json').then(($userAccounts) => {
    cy.login($userAccounts.teacher[0].username, constants.TEACHER_PASSWORD);
    teacherHelper.addClass("Setup Class", "Setup Class", constants.CLASS_WORD);
  });
}

function registerStudents() {
  var classCount = 0;
  var className = "Setup Class";
  teacherHelper.openStudentRosterSection(className);

  cy.fixture('UserAccounts.json').then(($userAccounts) => {
    $userAccounts.student.forEach(eachStudent => {
      cy.log("eachStudent : " + JSON.stringify(eachStudent));
      var fullName = eachStudent.lastName + ", " + eachStudent.firstName;

      teacherHelper.addUnregisteredStudentToClass(fullName, eachStudent.firstName, eachStudent.lastName, constants.STUDENT_PASSWORD, classCount++);
    });
  });

  teacherHelper.archiveClass(className);
  cy.logout();
}
