// Sign up form elements
const signupPageElements = {
  CONTENT : '.signup-default-modal-content',
  TEACHER_LINK : '.signup-default-modal-content [value=teacher]',
  STUDENT_LINK : '.signup-default-modal-content [value=student]',
  LOGIN_LINK : '.signup-default-modal-content .signup-form-login-option a',
  CLOSE_BUTTON : '#signup-default-modal .portal-pages-close',

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

export default signupPageElements;
