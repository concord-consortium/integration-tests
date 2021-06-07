// Student home page elements
const studentHomePageElements = {
  CLASS_AND_OFFERINGS_HEADING : '#content > h3:nth-child(8)',
  LEFT_NAV_CLASS : '#clazzes_nav li:nth-child(2) a',
  LEFT_NAV_CLASS_NAME : '#clazzes_nav [class^=\"leftNavigation\"] ul',
  RUN_ASSIGNMENT : '.offering_container:first-child .solo.button',
  BTN_RUN_CLASS_5614840edb5: '#item_portal__clazz_2 .offering_container .run_buttons>a'
};

export function BTN_ACTIVITY_RUN(className){
  return cy.contains('div.action_menu_header_left', className).parent().parent().contains('a.button', 'Run');
}

export default studentHomePageElements;

