// Register and Add new students form elements
const registerAddNewStudentPageElements = {
  FIRST_NAME_FIELD : 'div[class^=modal] form tr:nth-child(1) input',
  LAST_NAME_FIELD : 'div[class^=modal] form tr:nth-child(2) input',
  PASSWORD_FIELD : 'div[class^=modal] form tr:nth-child(3) input',
  CONFIRM_PASSWORD_FIELD : 'div[class^=modal] form tr:nth-child(4) input',
  SUBMIT_BUTTON : 'div[class^=modal] form tr:nth-child(5) input',
  DIALOG_TEXT : 'div[class^=modal] div[class^=dialog] div[class^=title]',
  DIALOG_ADD_ANOTHER_STUDENT_BUTTON : 'div[class^=modal] div[class^=dialog] button:nth-child(1)',
  DIALOG_CANCEL_BUTTON : 'div[class^=modal] div[class^=dialog] button:nth-child(2)',

  BTN_REGISTER_USER: 'a[href=\"/signup\"]',
  BTN_I_AM_STUDENT: 'button[value=\"student\"]',
  TXT_FIRST_NAME: 'div.signup-form dd.first-name-wrapper input[type=\"text\"]',
  TXT_LAST_NAME: 'div.signup-form dd.last-name-wrapper input[type=\"text\"]',
  TXT_PASSWORD: 'div.signup-form dd div.password input[type=\"password\"]',
  TXT_CONFIRM_PASSWORD: 'div.signup-form dd div.password_confirmation input[type=\"password\"]',
  BTN_SUBMIT_BUTTON: 'div.signup-form div.submit-button-container button.submit-btn',
  TXT_CLASS_WORD: 'div.signup-form div.class_word input[type=\"text\"]',
  LBL_SIGNUP_SUCCESS: 'div.signup-form div.registration-complete.student div p',
};


export default registerAddNewStudentPageElements;
