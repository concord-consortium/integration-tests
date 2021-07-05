// Tags Admin page elements
const tagsPageElements = {
  SEARCH_FIELD : '#search',
  SEARCH_BUTTON : 'input[value=\"Search\"]',
  CREATE_TAG_LINK : 'a[href$=\"/admin/tags/new\"]',
  SCOPE_FIELD : '#admin_tag_scope',
  TAG_FIELD : '#admin_tag_tag',
  SAVE_BUTTON : 'input[value=\"Save\"]',
  TAGS_PAGE_CONTENT : '#content',
  SEARCH_RESULT : '> .container_element',
  SEARCH_RESULT_HEADER : '#content .container_element .action_menu_header_left a',
  LIST_TAGS_LINK : '#content a[href$=\"/admin/tags\"]'
};

export default tagsPageElements;
