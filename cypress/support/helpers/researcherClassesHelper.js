import teacherHomePageElements from "../elements/teacher_home_page_elements.js";

export function expandResearchProjects() {
  cy.get(teacherHomePageElements.NAV_CLASSES).then(() => {
    return cy.contains(teacherHomePageElements.LEFT_NAV_RESEARCH_PROJECTS, 'Research Projects');
  }).then(($researchProjects) => {
    if($researchProjects.find('> span[class^=\"closed\"]').length > 0) {
      cy.contains(teacherHomePageElements.LEFT_NAV_RESEARCH_PROJECTS, 'Research Projects').click();
    }
  });
}

export function getResearchProjectsOpen() {
  return cy.get(teacherHomePageElements.LEFT_NAV_RESEARCH_PROJECTS).contains('Research Projects').find('> span[class^=\"open\"]');
}

export function verifyProjectsDisplayed() {
  return cy.get(teacherHomePageElements.LEFT_NAV_RESEARCH_PROJECTS).contains('Research Projects').find('ul').contains('Test Project');
}

export function verifyProjectsNotDisplayed() {
  return cy.get(teacherHomePageElements.LEFT_NAV_RESEARCH_PROJECTS).contains('Research Projects').find('ul').should("not.contain", "Test Project");
}

export function clickProject() {
  return cy.get(teacherHomePageElements.LEFT_NAV_RESEARCH_PROJECTS).contains('Research Projects').find('ul').contains('Test Project').click();
}

export function getResearchClassLandingPage() {
  return cy.get('#primary [class^=researcherClassesForm]');
}
