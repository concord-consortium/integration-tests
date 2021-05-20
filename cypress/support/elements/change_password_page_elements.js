const changePasswordPageElements = {
  // Change password page elements
  NEW_PASSWORD_FIELD : {
    selector : 'input[name=\"user_reset_password[password]\"]',
    description : 'Change Password input field'
  },
  CONFIRM_PASSWORD_FIELD : {
    selector : 'input[name=\"user_reset_password[password_confirmation]\"]',
    description : 'Confirm Password input field'
  },
  SAVE_BUTTON : {
    selector : 'input[value=\"Save\"]',
    description : 'Change Password Save button'
  }
};

export default changePasswordPageElements;
