import { uid } from 'uid';

const constants = {
  // learn portal base url
  LEARN_PORTAL_BASE_URL : `${Cypress.config("learnPortalBaseUrl")}`,
  // authoring base url
  AUTHORING_BASE_URL : `${Cypress.config("laraBaseUrl")}`,
  // admin user details
  ADMIN_USERNAME : `${Cypress.config("admin")["username"]}`,
  ADMIN_PASSWORD : `${Cypress.config("password")}`,
  // author user details
  AUTHOR_USERNAME : `${Cypress.config("author")["username"]}`,
  AUTHOR_PASSWORD : `${Cypress.config("password")}`,
  // researcher user details
  RESEARCHER_USERNAME : `${Cypress.config("researcher")["username"]}`,
  RESEARCHER_PASSWORD : `${Cypress.config("password")}`,
  // teacher user details
  TEACHER_USERNAME : `${Cypress.config("teacher")["username"]}`,
  TEACHER_PASSWORD : `${Cypress.config("password")}`,
  TEACHER_FIRSTNAME : `${Cypress.config("teacher")["firstName"]}`,
  TEACHER_LASTNAME : `${Cypress.config("teacher")["lastName"]}`,
  TEACHER_EMAIL : `${Cypress.config("teacher")["email"]}`,
  // student user details
  STUDENT_USERNAME : `${Cypress.config("student")["username"]}`,
  STUDENT_PASSWORD : `${Cypress.config("password")}`,
  STUDENT_FIRSTNAME : `${Cypress.config("student")["firstName"]}`,
  STUDENT_LASTNAME : `${Cypress.config("student")["lastName"]}`,
  // student 1 user details
  STUDENT_ONE_USERNAME : `${Cypress.config("student1")["username"]}`,
  STUDENT_ONE_PASSWORD : `${Cypress.config("password")}`,
  STUDENT_ONE_FIRSTNAME : `${Cypress.config("student1")["firstName"]}`,
  STUDENT_ONE_LASTNAME : `${Cypress.config("student1")["lastName"]}`,
  // student 2 user details
  STUDENT_TWO_USERNAME : `${Cypress.config("student2")["username"]}`,
  STUDENT_TWO_PASSWORD : `${Cypress.config("password")}`,
  STUDENT_TWO_FIRSTNAME : `${Cypress.config("student2")["firstName"]}`,
  STUDENT_TWO_LASTNAME : `${Cypress.config("student2")["lastName"]}`,
  // student user details
  STUDENT_THREE_USERNAME : `${Cypress.config("student3")["username"]}`,
  STUDENT_THREE_PASSWORD : `${Cypress.config("password")}`,
  STUDENT_THREE_FIRSTNAME : `${Cypress.config("student3")["firstName"]}`,
  STUDENT_THREE_LASTNAME : `${Cypress.config("student3")["lastName"]}`,
  // manager user details
  MANAGER_USERNAME : `${Cypress.config("manager")["username"]}`,
  MANAGER_PASSWORD : `${Cypress.config("password")}`,
  // school details
  SCHOOL_NAME : `${Cypress.config("schoolName")}`,
  // other misc details
  CLASS_WORD : uid(),
  CLASS_DESC : 'test class',
  NOTICE_TEXT : "This is a new notice"
};

export default constants;
