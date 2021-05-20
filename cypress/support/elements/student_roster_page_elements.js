const studentRosterPageElements = {
  // Student Roster page elements
  HEADING : {
    selector : '#student_roster h1',
    description : 'Student Roster heading'
  },
  TEACHER_NAME : {
    selector : '#student_roster dd:nth-child(2)',
    description : 'Student Roster Teacher name'
  },
  CLASS_WORD : {
    selector : '#student_roster dd:nth-child(4)',
    description : 'Student Roster Class word'
  },
  CLASS_COUNT : {
    selector : '#student_roster #oClassStudentCount',
    description : 'Student Roster Class count'
  },
  REGISTERED_STUDENT_DROPDOWN : {
    selector : '#student_id_selector',
    description : 'Student Roster Registered Student Dropdown'
  },
  ADD_STUDENT_BUTTON : {
    selector : '#student-roster button',
    description : 'Student Roster Add Student button'
  },
  REGISTER_ADD_STUDENT_LINK : {
    selector : '#student-roster span[role=link]',
    description : 'Student Roster Register Add Student link'
  },
  STUDENT_ROSTER_TABLE : {
    selector : '#student-roster table',
    description : 'Student Roster Table'
  },
  STUDENT_ROSTER_TABLE_STUDENT_NAME : {
    selector : '#student-roster table > tbody > tr:nth-child(2) > td:nth-child(1)',
    description : 'Student Roster Table first row student name'
  },
  STUDENT_ROSTER_TABLE_STUDENT_USERNAME : {
    selector : '#student-roster table > tbody > tr:nth-child(2) > td:nth-child(2)',
    description : 'Student Roster Table first row student username'
  },
  STUDENT_ROSTER_TABLE_REMOVE_STUDENT : {
    selector : '#student-roster > table > tbody > tr:nth-child(2) > .hide_in_print > :nth-child(1)',
    description : 'Student Roster Table first row remove student'
  },
  STUDENT_ROSTER_TABLE_CHANGE_PASSWORD : {
    selector : '#student-roster > table > tbody > tr:nth-child(2) > .hide_in_print > :nth-child(2)',
    description : 'Student Roster Table first row change student password'
  },
  STUDENT_ROSTER_TABLE_STUDENT_TWO_NAME : {
    selector : '#student-roster table > tbody > tr:nth-child(3) > td:nth-child(1)',
    description : 'Student Roster Table second row student name'
  },
  STUDENT_ROSTER_TABLE_STUDENT_TWO_USERNAME : {
    selector : '#student-roster table > tbody > tr:nth-child(3) > td:nth-child(2)',
    description : 'Student Roster Table second row student username'
  },
  STUDENT_ROSTER_TABLE_REMOVE_STUDENT_TWO : {
    selector : '#student-roster > table > tbody > tr:nth-child(3) > .hide_in_print > :nth-child(1)',
    description : 'Student Roster Table second row remove student'
  },
  STUDENT_ROSTER_TABLE_CHANGE_PASSWORD_TWO : {
    selector : '#student-roster > table > tbody > tr:nth-child(3) > .hide_in_print > :nth-child(2)',
    description : 'Student Roster Table second row change student password'
  }
};

export default studentRosterPageElements;
