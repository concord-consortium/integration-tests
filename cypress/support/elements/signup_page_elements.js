const signupPageElements = {
  // Sign up form elements
  CONTENT : {
    selector : '.signup-default-modal-content',
    description : 'Signup Form'
  },
  TEACHER_LINK : {
    selector : '.signup-default-modal-content [value=teacher]',
    description : 'Signup Form Teacher link'
  },
  STUDENT_LINK : {
    selector : '.signup-default-modal-content [value=student]',
    description : 'Signup Form Student link'
  },
  LOGIN_LINK : {
    selector : '.signup-default-modal-content .signup-form-login-option a',
    description : 'Signup Form Login link'
  },
  CLOSE_BUTTON : {
    selector : '#signup-default-modal .portal-pages-close',
    description : 'Signup Form Close button'
  }
};

export default signupPageElements;
