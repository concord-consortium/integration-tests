const userSettingsPageElements = {
  // User settings page elements
  FORM_LEGEND : {
    selector : 'form legend',
    description : 'User Settings Form Legend'
  },
  FIRST_NAME_FIELD : {
    selector : '#user_first_name',
    description : 'User Settings first name input field'
  },
  LAST_NAME_FIELD : {
    selector : '#user_last_name',
    description : 'User Settings last name input field'
  },
  EMAIL_FIELD : {
    selector : '#user_email',
    description : 'User Settings email input field'
  },
  USERNAME_FIELD : {
    selector : '#user_login',
    description : 'User Settings username input field'
  },
  SAVE_BUTTON : {
    selector : 'form input[value=\"Save\"]',
    description : 'User Settings Save button'
  },
  CHANGE_PASSWORD_BUTTON : {
    selector : 'form a.button.secondary',
    description : 'User Settings Change Password button'
  },
  CANCEL_BUTTON : {
    selector : 'form input[value=\"Cancel\"]',
    description : 'User Settings Cancel button'
  }
};

export default userSettingsPageElements;
