const noticesPageElements = {
  // Notice page elements
  NO_NOTICES_TEXT : {
    selector : 'div[class^=\"adminSiteNoticesNone\"]',
    description : 'Admin Notices no notices text'
  },
  NEW_NOTICE_LINK : {
    selector : 'a[href$=\"/admin/site_notices/new\"]',
    description : 'Admin Notices create new notice link'
  },
  EDITOR : {
    selector : 'notice_html',
    description : 'Admin Notices notice editor'
  },
  NOTICE_SUBMIT : {
    selector : 'div[class^=\"adminSiteNoticesEditSubmit\"]',
    description : 'Admin Notices Submit notice'
  },
  NOTICE_CANCEL : {
    selector : 'div[class^=\"adminSiteNoticesEditBackLink\"] a[href$=\"/site_notices\"]',
    description : 'Admin Notices Cancel notice'
  },
  EXISTING_NOTICE_EDIT : {
    selector : 'td[class^=\"adminSiteNoticesListItemOptions\"] a[href$=\"/edit\"]',
    description : 'Admin Notices Edit notice'
  },
  EXISTING_NOTICE_DELETE : {
    selector : 'td[class^=\"adminSiteNoticesListItemOptions\"] a[href=\"#\"]',
    description : 'Admin Notices Delete notice'
  },
  TABLE_ENTRY : {
    selector : 'td[class^=\"adminSiteNoticesListItemText\"]',
    description : 'Admin Notices Table entry for notice'
  },
  BLANK_NOTICE_ERROR : {
    selector : '#lightbox1 .content',
    description : 'Admin Notices blank notice error dialog'
  },
  BLANK_NOTICE_ERROR_OK_BUTTON : {
    selector : '#lightbox1 .button',
    description : 'Admin Notices blank notice error OK button'
  }
};

export default noticesPageElements;
