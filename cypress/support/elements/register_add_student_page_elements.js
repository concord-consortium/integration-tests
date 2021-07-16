// Register and Add new students form elements
const registerAddNewStudentPageElements = {
  STUDENT_REGISTER_FORM : 'div[class^=modal] form',
  FIRST_NAME_FIELD : 'div[class^=modal] form tr:nth-child(1) input',
  LAST_NAME_FIELD : 'div[class^=modal] form tr:nth-child(2) input',
  PASSWORD_FIELD : 'div[class^=modal] form tr:nth-child(3) input',
  CONFIRM_PASSWORD_FIELD : 'div[class^=modal] form tr:nth-child(4) input',
  SUBMIT_BUTTON : 'div[class^=modal] form tr:nth-child(5) input',
  DIALOG_TEXT : 'div[class^=modal] div[class^=dialog] div[class^=title]',
  DIALOG_ADD_ANOTHER_STUDENT_BUTTON : 'div[class^=modal] div[class^=dialog] button:nth-child(1)',
  DIALOG_CANCEL_BUTTON : 'div[class^=modal] div[class^=dialog] button:nth-child(2)',
};


export default registerAddNewStudentPageElements;
