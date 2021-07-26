import constants from '../../constants.js'
import laraPageElements from '../../elements/lara_page_elements.js'

export function materialsSetup() {

  const testMaterials = [
    { materialPath: "activities/Cypress_AutomatedTestActivity1_AP.json", materialName: 'Cypress_AutomatedTestActivity1_AP', materialType: 'activities' },
    { materialPath: "activities/Cypress_AutomatedTestActivity1_LARA.json", materialName: 'Cypress_AutomatedTestActivity1_LARA', materialType: 'activities' },
    //{ materialPath: "sequences/Cypress_AutomatedTestSequence1_AP.json", materialName: 'Cypress_AutomatedTestSequence1_AP', materialType: 'investigations' },
    { materialPath: "sequences/Cypress_AutomatedTestSequence1_LARA.json", materialName: 'Cypress_AutomatedTestSequence1_LARA', materialType: 'investigations' }
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
        importMaterial(constants.AUTHORING_BASE_URL, `${material.materialPath}`, `${material.materialName}`);
        cy.reload();
        publishMaterial(`${material.materialType}`);
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

function importMaterial(baseUrl, fixturePath, materialNewName) {
  cy.visit(baseUrl); // Visit Authoring Portal page
  const url = baseUrl + '/api/v1/import';

  Cypress.log({
    name: "importMaterial",
    displayName: "import",
    message: fixturePath,
    consoleProps: () => {
      return {
        fixturePath: fixturePath,
        importUrl: url
      }
    }
  });

  return cy.fixture(fixturePath).then(materialJSON => {
    materialJSON.name = materialNewName;
    materialJSON.title = materialNewName;
    return requestWithCSRF({
      url: url,
      method: "POST",
      body: {"import": materialJSON},
      followRedirect: false,
      log: false
    }).then(response => {
      if (response.status !== 200){
        throw Error("Import response status was: " + response.status + " instead of 200. " +
          "The url was: " + url);
      }
      const body = response.body;
      if (!body.success) {
        throw Error("Import has failed " + response.body.error);
      }
      return body.url;
    });
  });
}

function publishMaterial(type) {
  if(type === "investigations")
    cy.get(laraPageElements.PUBLISH_LINK_SEQUENCES).click(); // Click Publish for that sequence
  else if(type === "activities")
    cy.get(laraPageElements.PUBLISH_LINK_ACTIVITIES).click(); // Click Publish for that activity
  cy.get(laraPageElements.PUBLISH_MODAL_ROW).contains(constants.PUBLISH_ENV).contains(laraPageElements.ADD_TO_PORTAL_LINK, "add to").click(); // Click 'add to' to publish
  cy.get(laraPageElements.PUBLISHED_TO_PORTAL_LABEL).should("have.text", "added"); // Check that the text 'added' appears in the modal
  cy.get(laraPageElements.CLOSE_PUBLISH_MODAL).click(); // Close the publish modal
}

// function deleteMaterial(materialUrl) {
//   let type
//   if (materialUrl.indexOf("/activities/") !== -1) {
//     type = "activities"
//   } else {
//     type = "sequences"
//   }
//   const [ baseUrl, id ] = materialUrl.split(`/${type}/`)
//   return requestWithCSRF({
//     url: `${baseUrl}/api/v1/${type}/${id}`,
//     method: "DELETE",
//   });
// }

function requestWithCSRF(options) {
  return cy.get('meta[name="csrf-token"]', {log: false}).then(token => {
    const newOptions = Object.assign({}, options)
    if (!newOptions.headers) {
      newOptions.headers = {}
    }
    newOptions.headers['X-CSRF-Token'] = token.attr('content');
    return cy.request(newOptions)
  });
}
