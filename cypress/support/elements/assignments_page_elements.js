// Assignments page elements
const assignmentsPageElements = {
  HEADING : '#assignments-page h1',
  TEACHER_NAME : 'table[class^=\"classInfo\"] > tbody > :nth-child(1) :nth-child(2)',
  CLASS_WORD : 'table[class^=\"classInfo\"] > tbody > :nth-child(2) :nth-child(2)',
  BTN_ASSIGN_MATERIALS: '#assignments-page a.button',

  BTN_REPORT: '#assignments-page a[title=\"Report\"]',
  BTN_SHOW_DETAILS_ASSIGNMENT: '#assignments-page button.textButton.adminOption',
};

export default assignmentsPageElements;

export function getActiveCheckboxElement(assignmentName){
  let selector = '#assignments-page div div:nth-child(2)';
  return cy.get(selector).find('span', assignmentName).parent().find('span:nth-child(3) input');
}
