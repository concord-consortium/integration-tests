const schoolsPageElements = {
  CREATE_SCHOOL : '.action_menu_header .action_menu_header_right .menu a',
  SEARCH_FIELD : '#search',
  SEARCH_BUTTON : '.action_menu_header input[type=submit]',
  SEARCH_PAGE_CONTENT : '#content',
  SEARCH_RESULT : '.container_element',
  SEARCH_SCHOOL_NAME : '.action_menu .action_menu_header_left a',
  SEARCH_SCHOOL_DELETE : '.action_menu .action_menu_header_right [data-method=delete]',

  SCHOOL_NAME : '#portal_school_name',
  SCHOOL_DESCRIPTION : '#portal_school_description',
  SCHOOL_ZIPCODE : '#portal_school_zipcode',
  SCHOOL_CITY : '#portal_school_city',
  SCHOOL_STATE : '#portal_school_state',
  SCHOOL_DISTRICT : ':nth-child(6) > #portal_school_state', //'#portal_school_district'
  SAVE_BUTTON : 'input[type=submit]'
};

export default schoolsPageElements;
