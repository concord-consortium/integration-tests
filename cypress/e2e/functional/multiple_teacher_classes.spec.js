import * as c from '../../support/constants.js'
import * as teacherHelper from "../../support/helpers/teacherHelper"
import classSetupPageElements from '../../support/elements/class_setup_page_elements.js'
import flashNoticePageElements from '../../support/elements/flash_notice_page_elements.js'

// Note for db tracking : This test adds a class at the start and then archives it at the end

const CLASS_WORD = c.CLASS_WORD
const CLASS_NAME = 'Class ' + CLASS_WORD;

context("Verify teacher can add and edit teachers in a class", () => {

  before(function() {
    cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher is able to add a class", () => {
    teacherHelper.addClass(CLASS_NAME, c.CLASS_DESC, CLASS_WORD); // Teacher adds a class
  });

  it("Verify teacher can add other teachers to the class", () => {
    teacherHelper.openClassSetupSection(CLASS_NAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER1_USERNAME);
    cy.contains(classSetupPageElements.CURRENT_TEACHERS_ITEM, c.TEACHER1_USERNAME)
      .find(classSetupPageElements.DELETE_TEACHER_DISABLED).should('exist');
    // cy.get(classSetupPageElements.TEACHERS_DROPDOWN).select(c.TEACHER2_USERNAME);
    cy.get(classSetupPageElements.TEACHERS_DROPDOWN).find('option').contains(c.TEACHER2_USERNAME)
      .as('selectTeacher2').then( (selectTeacher2) => {
        cy.get(classSetupPageElements.TEACHERS_DROPDOWN).select(`${selectTeacher2.text()}`)
        cy.get(classSetupPageElements.ADD_BUTTON).click();
        cy.get(classSetupPageElements.SUBMIT_BUTTON).click();
        cy.contains(flashNoticePageElements.BANNER, "Class was successfully updated.");
    });
  });

  it("Verify teacher can see all teachers in the current class in teachers list", () => {
    teacherHelper.openClassSetupSection(CLASS_NAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER1_USERNAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER2_USERNAME);
  })

  it("Verify teacher can see other teacher options in teacher dropdown", () => {
    cy.get(classSetupPageElements.TEACHERS_DROPDOWN).find('option').contains(c.TEACHER4_USERNAME);
    cy.get(classSetupPageElements.TEACHERS_DROPDOWN).find('option').contains(c.TEACHER5_USERNAME);
  });

  it("Verify newly added teacher can access the class", () => {
    cy.logout();
    cy.login(c.TEACHER2_USERNAME, c.TEACHER2_PASSWORD);
    teacherHelper.openClassSetupSection(CLASS_NAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER1_USERNAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER2_USERNAME);
  });

  it("Verify newly added teacher can add other teachers to the class", () => {
    cy.get(classSetupPageElements.TEACHERS_DROPDOWN).find('option').contains(c.TEACHER4_USERNAME)
    .as('selectTeacher4').then( (selectTeacher4) => {
      cy.get(classSetupPageElements.TEACHERS_DROPDOWN).select(`${selectTeacher4.text()}`)
      cy.get(classSetupPageElements.ADD_BUTTON).click();
      cy.get(classSetupPageElements.SUBMIT_BUTTON).click();
      cy.contains(flashNoticePageElements.BANNER, "Class was successfully updated.");
      teacherHelper.openClassSetupSection(CLASS_NAME);
    });
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER1_USERNAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER2_USERNAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER4_USERNAME);
  });

  it("Verify teacher can remove newly added teacher2 from the class", () => {
    cy.logout();
    cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
    teacherHelper.openClassSetupSection(CLASS_NAME);

    cy.contains(classSetupPageElements.CURRENT_TEACHERS_ITEM, c.TEACHER2_USERNAME)
      .find(classSetupPageElements.DELETE_TEACHER).click().then(() => {
          cy.confirm("This action will remove the teacher: \'" + c.TEACHER2_LASTNAME
          + ", C. (" + c.TEACHER2_USERNAME + ")\' from this class.\\n\\nAre you sure you want to do this?");
    });

    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER1_USERNAME).should('exist');
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER2_USERNAME).should('not.exist');
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER4_USERNAME).should('exist');
    cy.get(classSetupPageElements.SUBMIT_BUTTON).click();
  });

  it("Verify teacher can remove newly added teacher4 from the class", () => {
    teacherHelper.openClassSetupSection(CLASS_NAME);

    cy.contains(classSetupPageElements.CURRENT_TEACHERS_ITEM, c.TEACHER4_USERNAME)
      .find(classSetupPageElements.DELETE_TEACHER).click().then(() => {
          cy.confirm("This action will remove the teacher: \'" + c.TEACHER4_LASTNAME
          + ", C. (" + c.TEACHER4_USERNAME + ")\' from this class.\\n\\nAre you sure you want to do this?");
    });

    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER1_USERNAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER2_USERNAME).should('not.exist');
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER4_USERNAME).should('not.exist');
    cy.get(classSetupPageElements.SUBMIT_BUTTON).click();
  });

  it("Verify teacher can not remove last teacher from the class", () => {
    teacherHelper.openClassSetupSection(CLASS_NAME);
    cy.contains(classSetupPageElements.CURRENT_TEACHERS_ITEM, c.TEACHER1_USERNAME)
      .find(classSetupPageElements.DELETE_TEACHER_DISABLED).should('exist');
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER1_USERNAME);
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER2_USERNAME).should('not.exist');
    cy.get(classSetupPageElements.CURRENT_TEACHERS_LIST).contains(c.TEACHER4_USERNAME).should('not.exist');
  });
});
