import userHomePageElements from "../elements/user_home_page_elements";
import admin_page_elements from "../elements/admin_page_elements";
import teacherHomePageElements from "../elements/teacher_home_page_elements";
import noticesPageElements from "../elements/notices_page_elements";
import * as c from "../constants";

export function disableOpenInNewWindow(activityName){
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();
    cy.get(admin_page_elements.LNK_AUTHORING).click();
    cy.contains('li a', activityName).click();
    cy.contains('#material_clazz_count a', '(portal settings)').click();
    cy.contains('div.config', ' Open the url in a new window ').get('input#external_activity_popup').uncheck();
    cy.get('.action_menu_header_right ul li input[value=\"Save\"]').click();
}


export function copyLaraActivity(existingActivityName, newActivityName){
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();
    cy.get(admin_page_elements.LNK_AUTHORING).click();

    cy.contains('li a', existingActivityName).first().click();
    cy.contains('a.button', 'Copy').invoke('removeAttr', 'target').click();
    cy.contains('#Activity_edit_container p strong', 'Admin Admin').click();

    //copy activity is in an iframe so, we need use this custom logic for accessing elements in an iframe.
    cy.get('iframe').then($iframe => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body).find('#lightweight_activity_name').type('{selectall}{backspace}' + newActivityName);
        cy.wrap($body).find('input#save-top').first().click();
    })


    cy.get(teacherHomePageElements.BTN_MY_CLASSES).click();
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();
    cy.get(admin_page_elements.LNK_AUTHORING).click();
    cy.contains('li a', newActivityName).click();
    cy.contains('#material_clazz_count a', '(portal settings)').click();
    cy.contains('div.config', ' Open the url in a new window ').get('input#external_activity_popup').click();
    cy.get('.action_menu_header_right ul li input[value=\"Save\"]');

}