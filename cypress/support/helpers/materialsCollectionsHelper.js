export function verifyMaterialsCollectionPage(){
  cy.get('#content .action_menu_header .action_menu_header_right a').contains("create Materials Collection");
}

export function verifyFilterResult(count){
  cy.get('.action_menu_header .action_menu_header_left p').contains(count);
}

export function selectProject(project){
  cy.get('#project_id').then($select => {
    const options = $select.find('option');
    const projectExists = options.toArray().some(option => option.textContent === project);
    if (projectExists) {
      cy.get('#project_id').select(project);
    } else {
      cy.log(`Project "${project}" not found in dropdown, skipping selection`);
    }
  });
}

export function verifyMaterialsName(name){
  cy.get('.list-item-wrapper .action_menu_header_left a').contains(name);
}

export function enterMaterialsName(name){
  cy.get('.action_menu_header_left #search').clear().type(name);
}

export function clickSearchButton(){
  cy.get('.action_menu_header_left input').eq(1).click({ force: true });
}
