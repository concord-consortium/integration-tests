import {uid} from 'uid'

import * as c from '../support/constants.js'
import manageClassesPageElements from '../support/elements/manage_classes_page_elements.js'
import teacherHomePageElements from '../support/elements/teacher_home_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'
import * as teacherHelper from '../support/helpers/teacherHelper'

// Note for db tracking : No db tracking required, using existing records

let className = undefined;

const CLASS_WORD = uid();
const CLASS_NAME = "AutoClass "+CLASS_WORD;
const CLASS_DESC = "AutoClass "+CLASS_WORD;

context("Verify teacher can archive and unarchive a class", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER_USERNAME, c.TEACHER_PASSWORD); // Login as teacher user
    teacherHelper.addClass(CLASS_NAME, CLASS_DESC, CLASS_WORD);
  });

  after(function() {
    teacherHelper.archiveClass(CLASS_NAME);
    cy.logout();
  });

  it("Verify teacher is able to archive a class", () => {
   teacherHelper.archiveClass(CLASS_NAME);
  });

  it("Verify teacher is able to unarchive a class", () => {
   teacherHelper.unArchiveClass(CLASS_NAME);
  });


});
