const laraPageElements = {
  // Home page elements
  LOGIN_LINK : '.login-link',
  LOGIN_SESSION_LINK : '.authoring-header .header-menu-links.show a',
  LOGOUT_LINK : '[href="/users/sign_out"]',
  PUBLISH_LINK_ACTIVITIES : '.quiet_list.activities .item.community:first-child .publish > a',
  PUBLISH_LINK_SEQUENCES : '.quiet_list.sequences .item:first-child .publish > a',
  // Signin page elements
  SIGNIN_PAGE_ROUTE : '/users/sign_in',
  USERNAME_FIELD : '#user_email',
  PASSWORD_FIELD : '#user_password',
  LOGIN_BUTTON : 'input[name="commit"]',
  // Publish modal elements
  PUBLISH_MODAL_ROW : '#modal .publication .info li',
  ADD_TO_PORTAL_LINK : 'a',
  PUBLISHED_TO_PORTAL_LABEL : '#modal .published',
  CLOSE_PUBLISH_MODAL : '.close'
};

export default laraPageElements;
