import teacherHomePageElements from "../elements/teacher_home_page_elements";
import addClassPageElements from "../elements/add_class_page_elements";
import manageClassesPageElements from "../elements/manage_classes_page_elements";
import userHomePageElements from "../elements/user_home_page_elements";
import studentRosterPageElements from "../elements/student_roster_page_elements";
import assignmentsPageElements from '../elements/assignments_page_elements.js';
import searchAssignmentsPage from '../elements/search_assignments_page.js';

export function addClass(className, classDesc, classWord) {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click(); // Expand 'Classes' in left nav
    cy.get(teacherHomePageElements.LEFT_NAV_ADD_CLASS).click(); // Click 'Add Class'
    cy.get(addClassPageElements.CLASS_NAME).type(className); // Type into class name field
    cy.get(addClassPageElements.CLASS_DESCRIPTION).type(classDesc); // Type into class description field
    cy.get(addClassPageElements.CLASS_WORD).type(classWord); // Type into class word field
    cy.get(addClassPageElements.SUBMIT_BUTTON).click(); // Click 'Submit' button
}

export function addAssignment(className, assignmentName){
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click();
    cy.get(teacherHomePageElements.NAV_CLASSES).contains('li', className).click();
    cy.contains('li',className).contains('Assignments').click();
    cy.get(assignmentsPageElements.BTN_ASSIGN_MATERIALS).contains('ASSIGN MATERIALS').click();
    // cy.get(searchAssignmentsPage.TXT_SEARCH_BAR).type('Automation');
    cy.get(searchAssignmentsPage.CHK_AUTHORSHIP_COMMUNITY).click();
    cy.get(searchAssignmentsPage.CHK_AUTHORSHIP_OFFICIAL).click();
    cy.get('div[data-material_name=\"'+assignmentName+'\"').contains('a.button', 'Assign or Share').click();
    cy.contains('label.clazz_name', className).click();
    cy.contains(searchAssignmentsPage.BTN_SAVE_ASSIGN_DIALOG, 'Save').click();
    cy.contains('button', 'OK').click();
}

export function addStudentToClass(studentUserName, studentFirstName, studentLastName, className){
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, "Classes").click();
    cy.get(teacherHomePageElements.NAV_CLASSES).contains('li', className).click();
    cy.contains('li',className).contains('Student Roster').click();
    cy.get(studentRosterPageElements.REGISTERED_STUDENT_DROPDOWN).
            select(studentLastName + ", " +  studentFirstName+" (" + studentUserName + ")");
    cy.get(studentRosterPageElements.ADD_STUDENT_BUTTON).click();
    cy.contains(studentRosterPageElements.STUDENT_ROSTER_TABLE_USERNAME_COLUMN, studentUserName);
    cy.get(studentRosterPageElements.STUDENT_ROSTER_TABLE).contains('td', studentUserName);
}

export function verifyStudentCount(count){
    cy.get(studentRosterPageElements.CLASS_COUNT).should('have.text', count);
}

export function archiveClass(className){
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').click();
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click Manage Classes in the left nav bar
    cy.contains('span', className).parent().contains('button', 'Archive', {matchCase: false}).click();

    //Verify if the class is archived
    cy.get(teacherHomePageElements.BTN_MY_CLASSES).click();
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').click();// Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_CLASSES).should('not.have.text', className);
}

export function unArchiveClass(className) {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES, 'Classes').click();
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES).click(); // Click Manage Classes in the left nav bar
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