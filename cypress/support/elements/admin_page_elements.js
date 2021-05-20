const adminPageElements = {
  // Admin page elements
  USERS_LINK : {
    selector : 'div.admin-links-cols__column:nth-child(2) a[href$=\'/users\']',
    description : 'Admin Page Users link'
  },
  NOTICES_LINK : {
    selector : 'a[href$=\'/admin/site_notices\']',
    description : 'Admin Page Notices link'
  }
};

export default adminPageElements;
