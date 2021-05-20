const registerAddNewStudentPageElements = {
  FIRST_NAME_FIELD : {
    selector : 'div[class^=modal] form tr:nth-child(1) input',
    description : 'Register Student First Name input field'
  },
  LAST_NAME_FIELD : {
    selector : 'div[class^=modal] form tr:nth-child(2) input',
    description : 'Register Student Last Name input field'
  },
  PASSWORD_FIELD : {
    selector : 'div[class^=modal] form tr:nth-child(3) input',
    description : 'Register Student Password input field'
  },
  CONFIRM_PASSWORD_FIELD : {
    selector : 'div[class^=modal] form tr:nth-child(4) input',
    description : 'Register Student Confirm Password input field'
  },
  SUBMIT_BUTTON : {
    selector : 'div[class^=modal] form tr:nth-child(5) input',
    description : 'Register Student Submit button'
  },
  DIALOG_TEXT : {
    selector : 'div[class^=modal] div[class^=dialog] div[class^=title]',
    description : 'Register Student dialog text heading'
  },
  DIALOG_ADD_ANOTHER_STUDENT_BUTTON : {
    selector : 'div[class^=modal] div[class^=dialog] button:nth-child(1)',
    description : 'Register Student Add another student button'
  },
  DIALOG_CANCEL_BUTTON : {
    selector : 'div[class^=modal] div[class^=dialog] button:nth-child(2)',
    description : 'Register Student dialog cancel button'
  }
};

export default registerAddNewStudentPageElements;
