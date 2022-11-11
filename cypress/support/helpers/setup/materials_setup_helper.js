import constants from '../../constants.js'
import laraPageElements from '../../elements/lara_page_elements.js'

export function materialsSetup() {

  const testMaterials = [
    { materialPath: "cypress/fixtures/activities/Cypress_AutomatedTestActivity1_AP.json", materialName: 'Test Coastal Erosion Activity', materialType: 'activities' },
    //{ materialPath: "activities/Cypress_AutomatedTestActivity1_LARA.json", materialName: 'Cypress_AutomatedTestActivity1_LARA', materialType: 'activities' },
    //{ materialPath: "sequences/Cypress_AutomatedTestSequence1_AP.json", materialName: 'Cypress_AutomatedTestSequence1_AP', materialType: 'investigations' },
    //{ materialPath: "sequences/Cypress_AutomatedTestSequence1_LARA.json", materialName: 'Cypress_AutomatedTestSequence1_LARA', materialType: 'investigations' }
  ];

  cy.visit(constants.AUTHORING_BASE_URL); // Visit Authoring Portal page
  cy.loginLARAWithSSO(constants.ADMIN_USERNAME, constants.ADMIN_PASSWORD); // Login as admin user

  testMaterials.forEach(material => {

    var materialExists = true;

    checkMaterialExistsInPortal(`${material.materialName}`).then(response => {

      response.body.results.forEach(result => {
        cy.log("result : " + JSON.stringify(result));
        if(result.type == `${material.materialType}` && result.materials.length < 1 ) {
          materialExists = false;
        }
      });

      cy.log("materialExists : " + JSON.stringify(materialExists));

      if(!materialExists) {
        importMaterial(constants.AUTHORING_BASE_URL, `${material.materialPath}`);
        cy.wait(1000);
      }
    });
  });
}

function checkMaterialExistsInPortal(materialName) {

  cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page

  const url = constants.LEARN_PORTAL_BASE_URL + '/api/v1/search/search?search_term='+ materialName + '&include_official=1&include_contributed=1';
  return cy.request({
    url: url,
    method: "GET"
  }).then(response => {
    if (response.status !== 200){
      throw Error("Search for materials status was: " + response.status + " instead of 200. " +
        "The url was: " + url);
    }
  });
}

function importMaterial(baseUrl, fixturePath) {
  var learnPortalBaseUrl = constants.LEARN_PORTAL_BASE_URL;
    var learnUrl = learnPortalBaseUrl.replace('https://', '');
  cy.visit(baseUrl); // Visit Authoring Portal page

  cy.get('.top-header [href="/import"]').click();
  cy.get('input.import_file').selectFile(fixturePath);
  cy.get('.import_activity_sequence .import.btn-primary').click();

  cy.get('#publication-details  .publication_details .btn-primary').click();
  cy.get('.publication [href*="'+ learnUrl + '"]').click();
  cy.get('.publication .close_link').click();

  cy.get('.breadcrumbs [href="/"]').click();
}
