// Tags Admin page elements
const projectPageElements = {
  SEARCH_FIELD : '#search',
  SEARCH_BUTTON : 'input[value=\"Search\"]',
  CREATE_PROJECT_LINK : 'a[href$=\"/admin/projects/new\"]',
  NAME_FIELD : '#admin_project_name',
  SLUG_FIELD : '#admin_project_landing_page_slug',
  CONTENT_FIELD : '#admin_project_landing_page_content',
  SAVE_BUTTON : 'input[value=\"Save\"]',
  PROJECT_PAGE_CONTENT : '#content',
  SEARCH_RESULT : '> .container_element',
  SEARCH_RESULT_HEADER : '#content .container_element .action_menu_header_left a',
  LIST_PROJECTS_LINK : '#content a[href$=\"/admin/projects\"]'
};

export default projectPageElements;
