import * as activityPlayerElements from "./ap_runtime_page_elements";

const getIframeBody = (iFrameSelector) => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
        .get(iFrameSelector)
        .its('0.contentDocument.body').should('not.be.empty')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        // https://on.cypress.io/wrap
        .then(cy.wrap)
}

let iFrameSelector = activityPlayerElements.getIframeSectionSelector() + ' iframe';
    
export const LandOfBumpElements = {
    getForwardArrow() {
        return getIframeBody(iFrameSelector).find('#controls #right');
    },
    getBackwardArrow() {
        return getIframeBody(iFrameSelector).find('#controls #left');
    },
    verifyForwardArrowDisabled() {
        this.getForwardArrow().invoke("attr", "class").should("contain", "disabled");
    },
    verifyInitalForwardArrowEnabled() {
        this.getForwardArrow().invoke("attr", "class").should("not.exist");
    },
    verifyForwardArrowEnabled() {
        this.getForwardArrow().invoke("attr", "class").should("contain", "");
    },
    verifyControlText(text) {
        getIframeBody(iFrameSelector).find('#controls #text').should("contain", text);
    },
    getAudio() {
        return getIframeBody(iFrameSelector).find('#controls #audio');
    },
    playAudio() {
        this.getAudio().click({ force: true });
        cy.wait(2000);
        this.getAudio().invoke("attr", "style").should("contain", "0.6", {timeout: 30000});
      },

}
