import teacherHomePageElements from "../elements/teacher_home_page_elements";
import addClassPageElements from "../elements/add_class_page_elements";
import userHomePageElements from "../elements/user_home_page_elements";
import studentRosterPageElements from "../elements/student_roster_page_elements";
import assignmentsPageElements from '../elements/assignments_page_elements.js';
import advancedSearchMaterialsPage from '../elements/advanced_search_materials_page.js';
import registerAddStudentPageElements from '../elements/register_add_student_page_elements.js'
import changePasswordPageElements from '../elements/change_password_page_elements.js'
import flashNoticePageElements from '../elements/flash_notice_page_elements.js'
import * as assignmentPageElementFunctions from "../elements/assignments_page_elements";
import * as C from '../constants';

export function addClass(className, classDesc, classWord) {
    openAddClassSection();
    cy.get(addClassPageElements.CLASS_NAME).type(className); // Type into class name field
    cy.get(addClassPageElements.CLASS_DESCRIPTION).type(classDesc); // Type into class description field
    cy.get(addClassPageElements.CLASS_WORD).type(classWord); // Type into class word field
    cy.get(addClassPageElements.GRADE_LEVEL_5).check(); // Type into class word field
    cy.get(addClassPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button
}

export function addAssignment(className, assignmentName){
    cy.visit(C.LEARN_PORTAL_BASE_URL + '/search');
    cy.get(searchAssignmentsPage.TXT_SEARCH_BAR).type(assignmentName);
    cy.get(searchAssignmentsPage.CHK_AUTHORSHIP_COMMUNITY).click();
    cy.get(searchAssignmentsPage.CHK_AUTHORSHIP_OFFICIAL).click();
    cy.get('div[data-material_name=\"'+assignmentName+'\"').contains('a.button', 'Assign or Share').click();
    cy.contains('label.clazz_name', className).click();
    cy.get(searchAssignmentsPage.BTN_SAVE_ASSIGN_DIALOG).contains('Save').click();
    cy.get('div.ReactModal__Content button').contains('OK').click();
}

export function addRegisteredStudentToClass(studentUserName, studentFirstName, studentLastName){
    cy.get(studentRosterPageElements.REGISTERED_STUDENT_DROPDOWN).
            select(studentLastName + ", " +  studentFirstName+" (" + studentUserName + ")");
    cy.get(studentRosterPageElements.ADD_STUDENT_BUTTON).click();
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE_USERNAME_COLUMN).should('include.text',studentUserName);
}

export function addUnregisteredStudentToClass(studentName, studentFirstName, studentLastName, studentPassword){

  cy.get(studentRosterPageElements.REGISTER_ADD_STUDENT_LINK).click(); // Click 'Register & Add Student' link
  cy.get(registerAddStudentPageElements.FIRST_NAME_FIELD).type(studentFirstName, ); // Type student first name in the Register and add student form
  cy.get(registerAddStudentPageElements.LAST_NAME_FIELD).type(studentLastName); // Type student last name in the Register and add student form
  cy.get(registerAddStudentPageElements.PASSWORD_FIELD).type(studentPassword); // Type student password in the Register and add student form
  cy.get(registerAddStudentPageElements.CONFIRM_PASSWORD_FIELD).type(studentPassword); // Confirm password in the Register and add student form
  cy.get(registerAddStudentPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button
  cy.wait(15000);
  cy.get(registerAddStudentPageElements.DIALOG_TEXT).contains("Success! The student was registered and added to the class"); // Check success dialog text
  cy.get(registerAddStudentPageElements.DIALOG_CANCEL_BUTTON).click(); // Click 'Add Another Student' in success dialog
  cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).contains('td', studentName);
}

export function verifyClassCount(count){
    cy.get(studentRosterPageElements.CLASS_COUNT).should('have.text', count);
}

export function getStudentUsername(studentName) {
  return cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).contains('td', studentName).parent().find('td:nth-child(2)').then(($elem) => {
     return $elem.text();
  });
}

export function changeStudentPassword(studentFullName, studentUserName, newPassword) {
  cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).contains('td', studentFullName).parent().contains('td span', "Change Password").click();
  cy.get(changePasswordPageElements.NEW_PASSWORD_FIELD).type(newPassword); //Type new password in the change password form
  cy.get(changePasswordPageElements.CONFIRM_PASSWORD_FIELD).type(newPassword); // Confirm new password in the change password form
  cy.get(changePasswordPageElements.SAVE_BUTTON).click(); // Click 'Save' button`
  cy.get(flashNoticePageElements.BANNER).contains("Password for " + studentUserName + " was successfully updated."); // Check banner for password change success message
}

export function removeStudentFromRoster(studentFullName, className) {
  cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).contains('td', studentFullName).parent().contains('td span', "Remove Student").click(); // Click 'Remove Student' in the student roster table
  cy.confirm("This will remove the student: \'" + studentFullName + "\' from the class: " + className + ".\\n\\nAre you sure you want to do this?"); // Confirm student removal from class
}

export function verifyRosterTableDoesNotExist() {
  cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).should("not.exist");
}

export function verifyRosterTableExists() {
  return  cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).should("exist");
}

export function archiveClass(className){
    openManageClassesSection();
    cy.contains('span', className).parent().contains('button', 'Archive', {matchCase: false}).click();

    //Verify if the class is archived
    cy.get(teacherHomePageElements.BTN_MY_CLASSES).click();
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').click();// Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_CLASSES).should('not.have.text', className);
}

export function unArchiveClass(className) {
    openManageClassesSection();
    cy.contains('strike', className).parent().parent().contains('button', 'Unarchive', {matchCase: false}).click();

    //verify if its unarchived.
    cy.get(teacherHomePageElements.BTN_MY_CLASSES).click();
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click Manage Classes in the left nav bar
    cy.contains('span', className).parent().contains('button', 'Archive', {matchCase: false});
    cy.get(userHomePageElements.HEADER_MYCLASSES).click(); // Navigate to the Getting Started page
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand Classes section in the left nav bar
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').contains('li', className); // The unarchived class should exist in the left nav bar
}

export function expandClass(className) {

  cy.get(teacherHomePageElements.NAV_CLASSES).then(() => {
    return cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes');
  }).then(($classes) => {
    if($classes.find('> span[class^=\"closed\"]').length > 0) {
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').click();
      return cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, className);
    }
  }).then(($className) => {
    if($className.find('> span[class^=\"closed\"]').length > 0 ) {
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASS_NAME, className).click();
    }
  });
}

export function expandClasses() {
  cy.get(teacherHomePageElements.NAV_CLASSES).then(() => {
    return cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes');
  }).then(($classes) => {
    if($classes.find('> span[class^=\"closed\"]').length > 0) {
      cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').click();
    }
  });
}

export function openAssignmentsSection(className) {
  expandClass(className);
  cy.contains(teacherHomePageElements.EXPANDED_LEFT_NAV_CLASS_NAME, className).within(() => {
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_ASSIGNMENTS).click(); // Click 'Assignments' section
  });
}

export function openStudentRosterSection(className) {
  expandClass(className);
  cy.contains(teacherHomePageElements.EXPANDED_LEFT_NAV_CLASS_NAME, className).within(() => {
    cy.get(teacherHomePageElements.LEFT_NAV_STUDENT_ROSTER).click(); // Click 'Student Roster' section
  });
}

export function openClassSetupSection(className) {
  expandClass(className);
  cy.contains(teacherHomePageElements.EXPANDED_LEFT_NAV_CLASS_NAME, className).within(() => {
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_SETUP).click(); // Click 'Class Setup' section
  });
}

export function openAddClassSection() {
  expandClasses();
  cy.get(teacherHomePageElements.LEFT_NAV_ADD_CLASS).click(); // Click 'Add Class'
}

export function openManageClassesSection() {
  expandClasses();
  cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click 'Add Class'
  cy.get(teacherHomePageElements.MANAGE_CLASSES_HEADER).should('exist');
}

export function deActivateAssignment(assignmentName){
    assignmentPageElementFunctions.getActiveCheckboxElement(assignmentName).uncheck();
}

export function activateAssignment(assignmentName){
    assignmentPageElementFunctions.getActiveCheckboxElement(assignmentName).check();
}
