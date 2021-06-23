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
  // manager user details
  MANAGER_USERNAME : config.manager.username,
  MANAGER_PASSWORD : config.password,
  // teacher 1 user details
  TEACHER1_USERNAME : config.teachers['1'].username,
  TEACHER1_PASSWORD : config.password,
  TEACHER1_FIRSTNAME : config.teachers['1'].firstName,
  TEACHER1_LASTNAME : config.teachers['1'].lastName,
  TEACHER1_EMAIL : config.teachers['1'].email,
  TEACHER1_FULLNAME : config.teachers['1'].fullName,
  TEACHER1_NAME : config.teachers['1'].name,
  // teacher 2 user details
  TEACHER2_USERNAME : config.teachers['2'].username,
  TEACHER2_PASSWORD : config.password,
  TEACHER2_FIRSTNAME : config.teachers['2'].firstName,
  TEACHER2_LASTNAME : config.teachers['2'].lastName,
  TEACHER2_EMAIL : config.teachers['2'].email,
  TEACHER2_FULLNAME : config.teachers['2'].fullName,
  TEACHER2_NAME : config.teachers['2'].name,
  // teacher 3 user details
  TEACHER3_USERNAME : config.teachers['3'].username,
  TEACHER3_PASSWORD : config.password,
  TEACHER3_FIRSTNAME : config.teachers['3'].firstName,
  TEACHER3_LASTNAME : config.teachers['3'].lastName,
  TEACHER3_EMAIL : config.teachers['3'].email,
  TEACHER3_FULLNAME : config.teachers['3'].fullName,
  TEACHER3_NAME : config.teachers['3'].name,
  // teacher 4 user details
  TEACHER4_USERNAME : config.teachers['4'].username,
  TEACHER4_PASSWORD : config.password,
  TEACHER4_FIRSTNAME : config.teachers['4'].firstName,
  TEACHER4_LASTNAME : config.teachers['4'].lastName,
  TEACHER4_EMAIL : config.teachers['4'].email,
  TEACHER4_FULLNAME : config.teachers['4'].fullName,
  TEACHER4_NAME : config.teachers['4'].name,
  // teacher 5 user details
  TEACHER5_USERNAME : config.teachers['5'].username,
  TEACHER5_PASSWORD : config.password,
  TEACHER5_FIRSTNAME : config.teachers['5'].firstName,
  TEACHER5_LASTNAME : config.teachers['5'].lastName,
  TEACHER5_EMAIL : config.teachers['5'].email,
  TEACHER5_FULLNAME : config.teachers['5'].fullName,
  TEACHER5_NAME : config.teachers['5'].name,
  // student 1 user details
  STUDENT1_USERNAME : config.students['1'].username,
  STUDENT1_PASSWORD : config.password,
  STUDENT1_FIRSTNAME : config.students['1'].firstName,
  STUDENT1_LASTNAME : config.students['1'].lastName,
  STUDENT1_EMAIL : config.students['1'].email,
  STUDENT1_FULLNAME : config.students['1'].fullName,
  STUDENT1_NAME : config.students['1'].name,
  // student 2 user details
  STUDENT2_USERNAME : config.students['2'].username,
  STUDENT2_PASSWORD : config.password,
  STUDENT2_FIRSTNAME : config.students['2'].firstName,
  STUDENT2_LASTNAME : config.students['2'].lastName,
  STUDENT2_EMAIL : config.students['2'].email,
  STUDENT2_FULLNAME : config.students['2'].fullName,
  STUDENT2_NAME : config.students['2'].name,
  // student 3 user details
  STUDENT3_USERNAME : config.students['3'].username,
  STUDENT3_PASSWORD : config.password,
  STUDENT3_FIRSTNAME : config.students['3'].firstName,
  STUDENT3_LASTNAME : config.students['3'].lastName,
  STUDENT3_EMAIL : config.students['3'].email,
  STUDENT3_FULLNAME : config.students['3'].fullName,
  STUDENT3_NAME : config.students['3'].name,
  // student 4 user details
  STUDENT4_USERNAME : config.students['4'].username,
  STUDENT4_PASSWORD : config.password,
  STUDENT4_FIRSTNAME : config.students['4'].firstName,
  STUDENT4_LASTNAME : config.students['4'].lastName,
  STUDENT4_EMAIL : config.students['4'].email,
  STUDENT4_FULLNAME : config.students['4'].fullName,
  STUDENT4_NAME : config.students['4'].name,
  // student 5 user details
  STUDENT5_USERNAME : config.students['5'].username,
  STUDENT5_PASSWORD : config.password,
  STUDENT5_FIRSTNAME : config.students['5'].firstName,
  STUDENT5_LASTNAME : config.students['5'].lastName,
  STUDENT5_EMAIL : config.students['5'].email,
  STUDENT5_FULLNAME : config.students['5'].fullName,
  STUDENT5_NAME : config.students['5'].name,
  // school details
  SCHOOL_NAME : config.schoolName,
  SCHOOL_DESCRIPTION : config.schoolDescription,
  SCHOOL_ZIPCODE : config.schoolZipcode,
  SCHOOL_CITY : config.schoolCity,
  SCHOOL_STATE : config.schoolState,
  SCHOOL_DISTRICT : config.schoolDistrict,
  SCHOOL_COUNTRY : config.schoolCountry,
  // LARA Admin Username
  LARA_ADMIN_USERNAME : config.lara.username,
  LARA_ADMIN_PASSWORD : config.password,
  // other misc details
  PUBLISH_ENV : config.publishEnvironment,
  LARA_PORTAL_ENV : config.laraPortalEnvironment,
  CLASS_WORD : uid(),
  CLASS_DESC : 'test class',
  NOTICE_TEXT : "This is a new notice",
  UID : uid()
};

export default constants;
