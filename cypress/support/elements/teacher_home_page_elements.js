// Teacher Home page elements
const teacherHomePageElements = {
  BTN_MY_CLASSES: "a.portal-pages-main-nav-item__link.button.register",
  NAV_CLASSES: "#clazzes_nav",
  LEFT_NAV_CLASSES : '#clazzes_nav > div > ul > li[class^=\"section\"]',
  EXPANDED_LEFT_NAV_CLASSES : '#clazzes_nav > div > ul > li[class^=\"section\"][class*=\"open\"]',
  LEFT_NAV_CLASS_NAME : '#clazzes_nav > div > ul > li[class^=\"section\"] > ul > li[class^=\"section\"]',
  EXPANDED_LEFT_NAV_CLASS_NAME : '#clazzes_nav > div > ul > li[class^=\"section\"] > ul > li[class^=\"section\"][class*=\"open\"]',
  LEFT_NAV_CLASS_ASSIGNMENTS : 'a[href$=\"/materials\"]',
  LEFT_NAV_STUDENT_ROSTER : 'a[href$=\"/roster\"]',
  LEFT_NAV_CLASS_SETUP : 'a[href$=\"/edit\"]',
  LEFT_NAV_ADD_CLASS : 'a[href=\"/portal/classes/new\"]',
  LEFT_NAV_MANAGE_CLASSES : 'a[href=\"/portal/classes/manage\"]',
  LEFT_NAV_ALL_CLASSES_PARENT : '#clazzes_nav li[class^="section"]',
  LEFT_NAV_MANAGE_CLASSES_ID : "#manage-classes-component"
};

export default teacherHomePageElements;
