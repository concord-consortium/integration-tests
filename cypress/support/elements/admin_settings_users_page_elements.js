// Admin Settings 'Users' page elements
const adminSettingsUsersPageElements = {
  SEARCH_FIELD : '#search',
  SEARCH_BUTTON : 'input[value=Search]',
  SEARCH_LIST_HEADER : '.item_collection .quiet_list',
  SEARCH_RESULT : '> #action_menu_wrapper',
  SEARCH_RESULT_USER_NAME : 'div#action_menu_wrapper:nth-child(1) .action_menu_header_left a',
  SEARCH_RESULT_FIXED: 'div#action_menu_wrapper .action_menu_header_left a',
  DELETE_USER : 'div#action_menu_wrapper:nth-child(1) .action_menu_header_right li:nth-child(3) a[onclick^=confirmUserDelete]',
  ACTIVATE_USER : 'div#action_menu_wrapper:nth-child(1) .action_menu_header_right a[href$=\"/confirm\"]',
  EDIT_USER : 'div#action_menu_wrapper:nth-child(1) .action_menu_header_right a[href$=\"/edit\"]'
}

export default adminSettingsUsersPageElements;
