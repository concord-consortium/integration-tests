const adminSettingsUsersPageElements = {
  SEARCH_FIELD : {
    selector : '#search',
    description : 'Admin Settings Users Search field'
  },
  SEARCH_BUTTON : {
    selector : 'input[value=Search]',
    description : 'Admin Settings User Search button'
  },
  SEARCH_RESULT : {
    selector : 'div#action_menu_wrapper:nth-child(1) .action_menu_header_left a',
    description : 'Admin Settings Search result entry'
  },
  DELETE_USER : {
    selector : 'div#action_menu_wrapper:nth-child(1) .action_menu_header_right li:nth-child(3) a[onclick^=confirmUserDelete]',
    description : 'Admin Settings Search result entry delete user link'
  },
}

export default adminSettingsUsersPageElements;
