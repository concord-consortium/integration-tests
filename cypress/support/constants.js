import { uid } from 'uid';

const config = Cypress.config();

const constants = {
  // learn portal base url
  LEARN_PORTAL_BASE_URL : config.learnPortalBaseUrl,
  // authoring base url
  AUTHORING_BASE_URL : config.laraBaseUrl,
  // admin user details
  ADMIN_USERNAME : config.admin.username,
  ADMIN_PASSWORD : config.password,
  // author user details
  AUTHOR_USERNAME : config.author.username,
  AUTHOR_PASSWORD : config.password,
  // researcher user details
  RESEARCHER_USERNAME : config.researcher.username,
  RESEARCHER_PASSWORD : config.password,
  // teacher user details
  TEACHER_USERNAME : config.teacher.username,
  TEACHER_PASSWORD : config.password,
  TEACHER_FIRSTNAME : config.teacher.firstName,
  TEACHER_LASTNAME : config.teacher.lastName,
  TEACHER_EMAIL : config.teacher.email,
  // student user details
  STUDENT_USERNAME : config.student.username,
  STUDENT_PASSWORD : config.password,
  STUDENT_FIRSTNAME : config.student.firstName,
  STUDENT_LASTNAME : config.student.lastName,
  // student 1 user details
  STUDENT_ONE_USERNAME : config.student1.username,
  STUDENT_ONE_PASSWORD : config.password,
  STUDENT_ONE_FIRSTNAME : config.student1.firstName,
  STUDENT_ONE_LASTNAME : config.student1.lastName,
  // student 2 user details
  STUDENT_TWO_USERNAME : config.student2.username,
  STUDENT_TWO_PASSWORD : config.password,
  STUDENT_TWO_FIRSTNAME : config.student2.firstName,
  STUDENT_TWO_LASTNAME : config.student2.lastName,
  // student user details
  STUDENT_THREE_USERNAME : config.student3.username,
  STUDENT_THREE_PASSWORD : config.password,
  STUDENT_THREE_FIRSTNAME : config.student3.firstName,
  STUDENT_THREE_LASTNAME : config.student3.lastName,
  // manager user details
  MANAGER_USERNAME : config.manager.username,
  MANAGER_PASSWORD : config.password,
  // school details
  SCHOOL_NAME : config.schoolName,
  // LARA Admin Username
  LARA_ADMIN_USERNAME : config.lara.username,
  LARA_ADMIN_PASSWORD : config.password,
  // other misc details
  PUBLISH_ENV : config.publishEnvironment,
  LARA_PORTAL_ENV : config.laraPortalEnvironment,
  CLASS_WORD : uid(),
  CLASS_DESC : 'test class',
  NOTICE_TEXT : "This is a new notice"
};

export default constants;
