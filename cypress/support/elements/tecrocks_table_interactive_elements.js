import * as activityPlayerElements from "./ap_runtime_page_elements";

let iFrameSelector1 = activityPlayerElements.getQuestionSectionSelector(1) + ' iframe';
let iFrameSelector2 = activityPlayerElements.getQuestionSectionSelector(2) + ' iframe';

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

const mainCanvasDrag = (positions) => {
    const options = positions.map(pos => (
      { button: 0, clientX: pos.x, clientY: pos.y, pageX: pos.x, pageY: pos.y, force: true, pointerId: 1 }
    ));
    cy.wait(500);
    options.forEach((opt, idx) => {
        getIframeBody(iFrameSelector1).find(".planet-view .canvas-3d").first().trigger(idx === 0 ? "pointerdown" : "pointermove", opt);
      cy.wait(200);
    });
    getIframeBody(iFrameSelector1).find(".planet-view .canvas-3d").first().trigger("pointerup");
    cy.wait(300);
  }
  
    
export const TecRocksTableInteractiveElements = {
    clickDrawCrossSection() {
        getIframeBody(iFrameSelector1).find("[data-test=draw-cross-section]").click();
        cy.wait(1000);
    },
    getCollectData() {
        return getIframeBody(iFrameSelector1).find("[data-test=collect-data]");
    },
    verifyCollectDataDisabled() {
        this.getCollectData().invoke("attr", "disabled").should("exist");
    },
    verifyCollectDataEnabled() {
        this.getCollectData().invoke("attr", "disabled").should("not.exist");
    },
    drawMainCanvasDrag() {
        mainCanvasDrag([
            { x: 400, y: 300 },
            { x: 500, y: 300 }
          ]);
    },
    getCrossSection() {
        return getIframeBody(iFrameSelector1).find('#cross-section-canvas');
    },
    getDialog() {
        return getIframeBody(iFrameSelector1).find(".MuiDialog-paper.MuiDialog-paperScrollPaper");
    },
    verifyDialogTitle(title) {
        this.getDialog().find('#draggable-dialog-title').should("contain", title);
    },
    verifyDataCollectionDialogHeader() {
        this.getDialog().find('.data-collection-dialog--dataCollectionDialogContent--tectonic-explorer table thead tr')
        .should("contain", "Category")
        .should("contain", "Type")
        .should("contain", "Temperature & Pressure")
        .should("contain", "Iron Content")
        .should("contain", "Cooling")
        .should("contain", "Metamorphic Grade")
        .should("contain", "Size of Particles")
        .should("contain", "Magma Temperature");
    },
    getDiscardButton() {
        return this.getDialog().find('.draggable-dialog--dialogButton--tectonic-explorer').eq(0);
    }, 
    getSubmitButton() {
        return this.getDialog().find('.draggable-dialog--dialogButton--tectonic-explorer').eq(1);
    },
    verifyExitDataCollectionDialogContent() {
        this.getDialog().find('.exit-data-collection-dialog--exitDataCollectionDialogContent--tectonic-explorer')
        .should("contain", "Are you finished collecting data? If you are finished placing pins, click Save & Exit. Your data will be saved in the table, you will exit data collection mode, and your pins will be removed.")
        .should("contain", "If you are not finished collecting data, click Continue.");
    },
    getContinueButton() {
        return this.getDialog().find('.draggable-dialog--dialogButton--tectonic-explorer').eq(0);
    }, 
    getSaveExitButton() {
        return this.getDialog().find('.draggable-dialog--dialogButton--tectonic-explorer').eq(1);
    },
    verifyDataCollectionDialogContent() {
        this.getDialog().find('.enter-data-collection-dialog--enterDataCollectionDialogContent--tectonic-explorer')
        .should("contain", "Entering data collection mode again will erase previously saved samples. If you are sure you want to do it, click Erase data & Start over.")
        .should("contain", "If you do not want to erase previous data, click Cancel.");
    },
    getCancelButton() {
        return this.getDialog().find('.draggable-dialog--dialogButton--tectonic-explorer').eq(0);
    }, 
    getErasePreviousDataButton() {
        return this.getDialog().find('.draggable-dialog--dialogButton--tectonic-explorer').eq(1);
    },


    verifyDrawCrossSectionDisabled() {
        getIframeBody(iFrameSelector1).find('[data-test=draw-cross-section]').invoke("attr", "disabled").should("exist");
    },
    verifyDrawCrossSectionEnabled() {
        getIframeBody(iFrameSelector1).find('[data-test=draw-cross-section]').invoke("attr", "disabled").should("not.exist");
    },
    verifyMeasureTempPressureDisabled() {
        getIframeBody(iFrameSelector1).find('[data-test=measure-temp-pressure]').invoke("attr", "disabled").should("exist");
    },
    verifyMeasureTempPressureEnabled() {
        getIframeBody(iFrameSelector1).find('[data-test=measure-temp-pressure]').invoke("attr", "disabled").should("not.exist");
    },
    verifyTakeSampleDisabled() {
        getIframeBody(iFrameSelector1).find('[data-test=take-sample]').invoke("attr", "disabled").should("exist");
    },
    verifyTakeSampleEnabled() {
        getIframeBody(iFrameSelector1).find('[data-test=take-sample]').invoke("attr", "disabled").should("not.exist");
    },

    verifyTecRocksTableHeader() {
        getIframeBody(iFrameSelector2).find('.runtime--table--question-int table thead tr')
        .should("contain", "Pin")
        .should("contain", "Category")
        .should("contain", "Type")
        .should("contain", "Temperature & Pressure")
        .should("contain", "Iron Content")
        .should("contain", "Cooling")
        .should("contain", "Metamorphic Grade")
        .should("contain", "Size of Particles")
        .should("contain", "Magma Temperature");
    },
    verifySnapshot() {
        getIframeBody(iFrameSelector2).find('.runtime--snapshots--question-int img').eq(0).should("exist");
        getIframeBody(iFrameSelector2).find('.runtime--snapshots--question-int img').eq(1).should("exist");

    },


    verifyPrompt() {
        getIframeBody(iFrameSelector2).find("[data-testid=legend]").should("have.text", "TecRocks Table Interactive Prompt");
    },
    verifyPlaceHolderImage() {
        getIframeBody(iFrameSelector2).find(".runtime--placeholder--question-int img").should("exist");
    },
    verifyPlaceHolderImageHidden() {
        getIframeBody(iFrameSelector2).find(".runtime--placeholder--question-int img").should("not.exist");
    },
    getTableAndSnapshots() {
        getIframeBody(iFrameSelector2).find(".runtime--tableAndSnapshots--question-int");
    },

}




