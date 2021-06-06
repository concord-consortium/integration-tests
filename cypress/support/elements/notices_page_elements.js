// Notice page elements
const noticesPageElements = {
  NO_NOTICES_TEXT : 'div[class^=\"adminSiteNoticesNone\"]',
  NEW_NOTICE_LINK : 'a[href$=\"/admin/site_notices/new\"]',
  EDITOR : 'notice_html',
  NOTICE_SUBMIT : 'div[class^=\"adminSiteNoticesEditSubmit\"]',
  NOTICE_CANCEL : 'div[class^=\"adminSiteNoticesEditBackLink\"] a[href$=\"/site_notices\"]',
  EXISTING_NOTICE_EDIT : 'td[class^=\"adminSiteNoticesListItemOptions\"] a[href$=\"/edit\"]',
  EXISTING_NOTICE_DELETE : 'td[class^=\"adminSiteNoticesListItemOptions\"] a[href=\"#\"]',
  TABLE_ENTRY : 'td[class^=\"adminSiteNoticesListItemText\"] p',
  BLANK_NOTICE_ERROR : '#lightbox1 .content',
  BLANK_NOTICE_ERROR_OK_BUTTON : '#lightbox1 .button'
};

export default noticesPageElements;
