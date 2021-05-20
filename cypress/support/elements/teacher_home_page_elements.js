const teacherHomePageElements = {
  // Teacher Home page elements
  LEFT_NAV_CLASSES : {
    selector : '#clazzes_nav li[class^=\"section\"]:nth-child(3)',
    description : 'Teacher Left Nav Classes link'
  },
  LEFT_NAV_CLASS_NAME : {
    selector : '#clazzes_nav li[class^=\"section\"] li[class^=\"section\"]',
    description : 'Teacher Left Nav Class Name'
  },
  LEFT_NAV_CLASS_ASSIGNMENTS : {
    selector : 'a[href$=\"/materials\"]',
    description : 'Teacher Left Nav Class Assignments'
  },
  LEFT_NAV_STUDENT_ROSTER : {
    selector : 'a[href$=\"/roster\"]',
    description : 'Teacher left Nav Class Student Roster'
  },
  LEFT_NAV_CLASS_SETUP : {
    selector : 'a[href$=\"/edit\"]',
    description : 'Teacher Left nav Class Setup'
  },
  LEFT_NAV_ADD_CLASS : {
    selector : 'a[href=\"/portal/classes/new\"]',
    description : 'Teacher Left Nav Add Class'
  },
  LEFT_NAV_MANAGE_CLASSES : {
    selector : 'a[href=\"/portal/classes/manage\"]',
    description : 'Teacher Left Nav Manage Classes'
  },
  LEFT_NAV_ALL_CLASSES_PARENT : {
    selector : '#clazzes_nav li[class^="section"]',
    description : 'Teacher Left Nav All Classes Parent'
  }
};

export default teacherHomePageElements;
