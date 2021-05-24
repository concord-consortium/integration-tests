const studentRosterPageElements = {
  // Student Roster page elements
  HEADING : '#student_roster h1',
  TEACHER_NAME : '#student_roster dd:nth-child(2)',
  CLASS_WORD : '#student_roster dd:nth-child(4)',
  CLASS_COUNT : '#student_roster #oClassStudentCount',
  REGISTERED_STUDENT_DROPDOWN : '#student_id_selector',
  ADD_STUDENT_BUTTON : '#student-roster button',
  REGISTER_ADD_STUDENT_LINK : '#student-roster span[role=link]',
  STUDENT_ROSTER_TABLE : '#student-roster table',
  STUDENT_ROSTER_TABLE_STUDENT_NAME : '#student-roster table > tbody > tr:nth-child(2) > td:nth-child(1)',
  STUDENT_ROSTER_TABLE_STUDENT_USERNAME : '#student-roster table > tbody > tr:nth-child(2) > td:nth-child(2)',
  STUDENT_ROSTER_TABLE_REMOVE_STUDENT : '#student-roster > table > tbody > tr:nth-child(2) > .hide_in_print > :nth-child(1)',
  STUDENT_ROSTER_TABLE_CHANGE_PASSWORD : '#student-roster > table > tbody > tr:nth-child(2) > .hide_in_print > :nth-child(2)',
  STUDENT_ROSTER_TABLE_STUDENT_TWO_NAME : '#student-roster table > tbody > tr:nth-child(3) > td:nth-child(1)',
  STUDENT_ROSTER_TABLE_STUDENT_TWO_USERNAME : '#student-roster table > tbody > tr:nth-child(3) > td:nth-child(2)',
  STUDENT_ROSTER_TABLE_REMOVE_STUDENT_TWO : '#student-roster > table > tbody > tr:nth-child(3) > .hide_in_print > :nth-child(1)',
  STUDENT_ROSTER_TABLE_CHANGE_PASSWORD_TWO : '#student-roster > table > tbody > tr:nth-child(3) > .hide_in_print > :nth-child(2)'
};

export default studentRosterPageElements;
