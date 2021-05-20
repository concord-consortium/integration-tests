const signinPageElements = {
  // Sign in form elements
  FORM : {
    selector : '.signup-form',
    description : 'Signin Form'
  },
  USERNAME_FIELD : {
    selector : '.signup-form input[type=text]',
    description : 'Signin Form Username input field'
  },
  PASSWORD_FIELD : {
    selector : '.signup-form input[type=password]',
    description : 'Signin Form Password input field'
  },
  FORGOT_LINK : {
    selector : '.signup-form .submit-button-container a',
    description : 'Signin Form Forgot Password link'
  },
  LOGIN_BUTTON : {
    selector : '.signup-form .submit-btn',
    description : 'Signin Form Submit button'
  },
  SIGNUP_LINK : {
    selector : '.signup-form footer a',
    description : 'Signin Form Signup link'
  },
  CLOSE_BUTTON : {
    selector : '.portal-pages-close',
    description : 'Signin Form Close button'
  },
  CLOSE_BUTTON_II : {
    selector : '#login-default-modal .portal-pages-close',
    description : 'Default modal Close button'
  }
};

export default signinPageElements;
