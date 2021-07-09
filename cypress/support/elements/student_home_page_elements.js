// Student home page elements
const studentHomePageElements = {
  CLASS_AND_OFFERINGS_HEADING : '#content > h3:nth-child(8)',
  LEFT_NAV_CLASS : '#clazzes_nav li a',
  LEFT_NAV_CLASS_NAME : '#clazzes_nav [class^=\"leftNavigation\"] ul',
  RUN_ASSIGNMENT : '.offering_container:first-child .solo.button',
  BTN_RUN_CLASS_5614840edb5: '#item_portal__clazz_2 .offering_container .run_buttons>a',
  LBL_STUDENT_CLASS_SECTION: 'div.item_collection div.item div.action_menu div.action_menu_header_left',
  LBL_TEACHER_NAME_CLASS_SECTION: 'div.item_collection div.item div.action_menu div.action_menu_header_right',
  LNK_STUDENT_GENERATE_REPORT: 'div.status_graphs div.run_graph span.lightbox_report_link a[href$=\"student_report\"]',
  ASSIGNMENT_SECTION: 'div.offering_for_student',
  NO_OFFERINGS_TEXT: 'ul.quiet_list li div.tiny',

  TXT_CLASS_WORD: '#join-class ul li input[name=\"classWord\"]',
  BTN_SUBMIT_CLASS_WORD: '#join-class ul li input[value=\"Submit\"]',
  BTN_JOIN_CLASS: '#join-class p input[value=\"Join\"]',
  BTN_JOINING_CLASS: '#join-class p input[value=\"Joining ...\"]',
  BTN_CANCEL_JOIN_CLASS: '#join-class p button',
  LBL_JOIN_CLASS_MSG: '#join-class fieldset'

};

export function BTN_ACTIVITY_RUN(className){
  return cy.contains('div.action_menu_header_left', className).parent().parent().contains('a.button', 'Run');
}

export function getClassSectionElement(className){
  return cy.contains(studentHomePageElements.LBL_STUDENT_CLASS_SECTION, className).parent().parent();
}

export function getLinkGenerateReport(className){
  return getClassSectionElement(className).contains(studentHomePageElements.LNK_STUDENT_GENERATE_REPORT, 'Generate a report of your work');
}

export default studentHomePageElements;
