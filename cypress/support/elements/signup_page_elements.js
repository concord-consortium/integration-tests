// Sign up form elements
const signupPageElements = {
  CONTENT : '.signup-default-modal-content',
  TEACHER_LINK : '.signup-default-modal-content [value=teacher]',
  STUDENT_LINK : '.signup-default-modal-content [value=student]',
  LOGIN_LINK : '.signup-default-modal-content .signup-form-login-option a',
  CLOSE_BUTTON : '#signup-default-modal .portal-pages-close',
  TEACHER_FIRSTNAME : '.text-input.first_name input',
  TEACHER_LASTNAME : '.text-input.last_name input',
  TEACHER_PASSWORD : '.text-input.password input',
  TEACHER_CONFIRM_PASSWORD : '.text-input.password_confirmation input',
  NEXT_BUTTON : '.submit-btn',
  TEACHER_USERNAME :'.text-input.login input',
  TEACHER_EMAIL :'.text-input.email input',
  TEACHER_COUNTRY : '.select-input input',
  TEACHER_ZIPCODE : '.text-input.zipcode input',
  TEACHER_SCHOOL : '.signup-form-school-select > .select-input > div[class$=\"container\"] > div[class$=\"control\"] > div:first-child',
  TEACHER_SCHOOL_DROPDOWN : '.signup-form-school-select',
  TEACHER_SCHOOL_OPTIONS : '[class$=\"menu\"] [id^=\"react-select\"]',
  TEACHER_ADD_NEW_SCHOOL : '.new-school-link',
  TEACHER_ADD_NEW_SCHOOL_TEXT : '.text-input.school_name',
  REGISTER_BUTTON : '.submit-button-container .submit-btn',
  BTN_REGISTER_USER: 'a[href=\"/signup\"]',
  BTN_I_AM_STUDENT: 'button[value=\"student\"]',
  TXT_FIRST_NAME: 'div.signup-form dd.first-name-wrapper input[type=\"text\"]',
  TXT_LAST_NAME: 'div.signup-form dd.last-name-wrapper input[type=\"text\"]',
  TXT_PASSWORD: 'div.signup-form dd div.password input[type=\"password\"]',
  TXT_CONFIRM_PASSWORD: 'div.signup-form dd div.password_confirmation input[type=\"password\"]',
  LBL_ERROR_CONFIRM_PASSWORD: 'div.signup-form dd div.password_confirmation.error div.input-error',
  BTN_SUBMIT_BUTTON: 'div.signup-form div.submit-button-container button.submit-btn',
  TXT_CLASS_WORD: 'div.signup-form div.class_word input[type=\"text\"]',
  LBL_SIGNUP_SUCCESS: 'div.signup-form div.registration-complete.student div p',
  LBL_INVALID_WORD_ERROR: 'div.signup-form div.class_word.error div.input-error',
<<<<<<< HEAD

=======
  LBL_SIGNUP_SUCCESS: 'div.signup-form div.registration-complete.student div p',
>>>>>>> fc38843 (fixed merge conflicts)
};

export default signupPageElements;
