const assignmentsPageElements = {
  // Assignments page elements
  HEADING : {
    selector : '#assignments-page h1',
    description : 'Assignments Page Heading'
  },
  TEACHER_NAME : {
    selector : 'table[class^=\"classInfo\"] > tbody > :nth-child(1) :nth-child(2)',
    description : 'Assignments Page Teacher Name'
  },
  CLASS_WORD : {
    selector : 'table[class^=\"classInfo\"] > tbody > :nth-child(2) :nth-child(2)',
    description : 'Assignments Page Class Word'
  }
};

export default assignmentsPageElements;
