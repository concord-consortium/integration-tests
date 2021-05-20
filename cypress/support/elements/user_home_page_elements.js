const userHomePageElements = {
  // User Home page elements
  CONTENT : {
    selector : '#content h1',
    description : 'User Home Heading'
  },
  NOTICES_TABLE : {
    selector : '#portal-pages-notices',
    description : 'User Home Notices Table'
  },
  NOTICES_TABLE_ENTRY : {
    selector : '#portal-pages-notices td:nth-child(2)',
    description : 'User Home Notices Table entry'
  },
  HIDE_SHOW_NOTICES : {
    selector : '#oHideShowLink',
    description : 'User Home Hide-Show Notices link'
  },
  DISMISS_NOTICES : {
    selector : '#portal-pages-notices td:nth-child(3) a[title=\"Dismiss\"]',
    description : 'User Home Dismiss Notices button'
  },
  NO_NOTICES_TEXT : {
    selector : 'div[class^=\"siteNoticesListContainer\"]',
    description : 'User Home No Notices text'
  },
  LEFT_NAV_SETTINGS_LINK : {
    selector : 'a[href$=\"/preferences\"]',
    description : 'User Home Settings link'
  },
  LEFT_NAV_ADMIN_LINK : {
    selector : 'a[href$=\"/admin\"]',
    description : 'User Home Admin link'
  },
  HEADER_MYCLASSES : {
    selector : '#portal-pages-header .portal-pages-main-nav-item:nth-child(3) a',
    description : 'User Home My Classes button'
  },
  LOGOUT_BUTTON : {
    selector : 'a[title=\"Log Out\"]',
    description : 'Logout button'
  }
};

export default userHomePageElements;
