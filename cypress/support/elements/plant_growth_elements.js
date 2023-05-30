import * as activityPlayerElements from "../elements/ap_runtime_page_elements";

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

let iFrameSelector = activityPlayerElements.getQuestionSectionSelector(1) + ' iframe';
    
export const PlantGrowthElements = {
    getSimulationFrame() {
        return getIframeBody(iFrameSelector).find("[data-testid=simulation-frame]");
    },
    verifyCreditsLabel() {
        this.getSimulationFrame().find('.simulation-frame-left button').should("have.text", "Credits");
    },
    verifyReadAloudLabel() {
        this.getSimulationFrame().find('.simulation-frame-right .switch-label').should("have.text", "Read Aloud in Yugtun");
    },
    getOptionView() {
        return getIframeBody(iFrameSelector).find(".app-optionsContainer .options-view-optionsView");
    },
    verifyControlsLabel() {
        this.getOptionView().find('.labeled-container-label').should("have.text", "Controls");
    },
    verifyInputSlider(slider) {
        const option = ["Light", "Water", "CO2"];
        this.getOptionView().find('.input-slider-input .input-slider-type').eq(option.indexOf(slider)).should("have.text", slider);
        this.getOptionView().find('.input-slider-input .input-slider-right .input-slider-labels').eq(option.indexOf(slider))
        .should("contain", "Full")
        .should("contain", "Some")
        .should("contain", "None");
    },
    moveInputSlider(slider, level) {
        const option = ["Light", "Water", "CO2"];

        const valueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value',
        ).set
      if(level === "Full")   {     
        this.getOptionView().find('.input-slider-input .input-slider-left input').eq(option.indexOf(slider))
            .should('have.value', 1)
            .then(function ($slider) {
            valueSetter.call($slider[0], 2)
            })
            .trigger('change')
      } else if(level === "None") {
        this.getOptionView().find('.input-slider-input .input-slider-left input').eq(option.indexOf(slider))
            .should('have.value', 1)
            .then(function ($slider) {
            valueSetter.call($slider[0], 0)
            })
            .trigger('change')
      }
    },
    getSimulationView() {
        return getIframeBody(iFrameSelector).find(".app-simulationContainer .simulation-view-simulationView");
    },
    verifyCO2Label(label) {
        this.getSimulationView().find('.simulation-view-co2LabelText').should("contain", "CO2: " + label);
    },
    verifyCmInToggle() {
        this.getSimulationView().find('.simulation-view-toggle .simulation-view-cm').should("have.text", "cm");
        this.getSimulationView().find('.simulation-view-toggle .simulation-view-in').should("have.text", "in");
    },
    getControlView() {
        return getIframeBody(iFrameSelector).find(".app-simulationContainer .app-controls");
    },
    startNewTrial() {
        this.getNewTrialButton().click();
      },
    getNewTrialButton() {
        return this.getControlView().find('button').eq(0);
    },
    verifyNewTrialButtonEnabled() {
        this.getNewTrialButton().invoke("attr", "disabled").should("not.exist");
    },
    verifyNewTrialButtonDisabled() {
        this.getNewTrialButton().invoke("attr", "disabled").should("exist");
    },
    getPlayButton() {
        return this.getControlView().find('button').eq(1);
    },
    playSimulation(time) {
        this.getPlayButton().click();
        this.getTimeSliderContainer().find('.slider-label').should("have.text", time.finalTime);
      },
    verifyPlayButtonEnabled() {
        this.getPlayButton().invoke("attr", "disabled").should("not.exist");
    },
    verifyPlayButtonDisabled() {
        this.getPlayButton().invoke("attr", "disabled").should("exist");
    },
    getTimeSliderContainer() {
        return getIframeBody(iFrameSelector).find(".app-simulationContainer .app-timeSliderContainer .slider-slider");
    },
    verifySliderLabel(days) {
        this.getTimeSliderContainer().find('.slider-label').should("contain", "Time: " + days +" days");
    }, 
    moveSlider(slider) {
        this.getTimeSliderContainer().find(".MuiSlider-mark[data-index=\"" + slider/4 + "\"]").click({ force: true });
    },
    verifySliderEnabled() {
        this.getTimeSliderContainer().invoke("attr", "class").should("not.contain", "disabled");
    },
    verifySliderDisabled() {
        this.getTimeSliderContainer().invoke("attr", "class").should("contain", "disabled");
    },
    getTableHeader() {
        return getIframeBody(iFrameSelector).find(".app-tableContainer .table-table thead th")
    },
    verifyDeleteButtonLabel() {
        getIframeBody(iFrameSelector).find(".table-deleteButtonContainer .table-label").should("contain", "Delete trial")
    },
    verifyTableTitle(index) {
        getIframeBody(iFrameSelector).find(".table-header .table-title").should("have.text", "Trials: Data");
    },
    verifyTableColumnNames() {
        this.getTableHeader().eq(0).should("have.text", "Trial");
        this.getTableHeader().eq(1).should("have.text", "Light");
        this.getTableHeader().eq(2).should("have.text", "Water");
        this.getTableHeader().eq(3).should("have.text", "CO2");
        this.getTableHeader().eq(4).should("have.text", "Sugar Used");
        this.getTableHeader().eq(5).should("have.text", "Sugar Created");
    },
    getTrialsTable() {
        return getIframeBody(iFrameSelector).find(".table-tableContainer");
    },
    selectTrial(trial) {
        this.getTrialsTable().find("tbody tr[role=row]").eq(trial).click();
    },
    checkSugarUsed(output, trialNumber) {
        this.getTrialsTable().find("tbody tr[role=row]").eq(trialNumber-1).find("td[role=cell]").eq(4).should("contain", output);
    },
    checkSugarCreated(output, trialNumber) {
        this.getTrialsTable().find("tbody tr[role=row]").eq(trialNumber-1).find("td[role=cell]").eq(5).should("contain", output);
    },
    getBarGraphContainer() {
        return getIframeBody(iFrameSelector).find('.app-barGraphs .app-graphsContainer');
    },
    verifyBarGraphHeaderTitle() {
        getIframeBody(iFrameSelector).find(".app-barGraphs .app-header").should("have.text", "Trial 1 Graphs");
    },
    verifyBarGraphTitle() {
        this.getBarGraphContainer().find(".bar-graph-title").eq(0).should("have.text", "Sugar Used");
        this.getBarGraphContainer().find(".bar-graph-title").eq(1).should("have.text", "Sugar Created");
    },
    verifyYAxisLabel() {
        this.getBarGraphContainer().find(".bar-graph-yAxisLabel").eq(0).should("have.text", "Amount");
        this.getBarGraphContainer().find(".bar-graph-yAxisLabel").eq(1).should("have.text", "Amount");
    },
    verifyXTicksLabel(graph) {
        const option = ["Graph1", "Graph2"];
        this.getBarGraphContainer().find(".bar-graph-xTicks").eq(option.indexOf(graph)).find(".bar-graph-xTick").eq(0).contains("0");
        this.getBarGraphContainer().find(".bar-graph-xTicks").eq(option.indexOf(graph)).find(".bar-graph-xTick").eq(1).contains("4");
        this.getBarGraphContainer().find(".bar-graph-xTicks").eq(option.indexOf(graph)).find(".bar-graph-xTick").eq(2).contains("8");
        this.getBarGraphContainer().find(".bar-graph-xTicks").eq(option.indexOf(graph)).find(".bar-graph-xTick").eq(3).contains("12");
        this.getBarGraphContainer().find(".bar-graph-xTicks").eq(option.indexOf(graph)).find(".bar-graph-xTick").eq(4).contains("16");
        this.getBarGraphContainer().find(".bar-graph-xTicks").eq(option.indexOf(graph)).find(".bar-graph-xTick").eq(5).contains("20");
        this.getBarGraphContainer().find(".bar-graph-xTicks").eq(option.indexOf(graph)).find(".bar-graph-xTick").eq(6).contains("24");
        this.getBarGraphContainer().find(".bar-graph-xTicks").eq(option.indexOf(graph)).find(".bar-graph-xTick").eq(7).contains("28");
    },
    verifyXAxisLabel() {
        this.getBarGraphContainer().find(".bar-graph-xAxisLabel").eq(0).should("have.text", "Time (Days)");
        this.getBarGraphContainer().find(".bar-graph-xAxisLabel").eq(1).should("have.text", "Time (Days)");
    },
    verifySugarUserBarGraph(used) {
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarUsed").eq(0).invoke("attr", "style").should("contain", "height: " +used.sugarUsed.zero);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarUsed").eq(1).invoke("attr", "style").should("contain", "height: " +used.sugarUsed.four);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarUsed").eq(2).invoke("attr", "style").should("contain", "height: " +used.sugarUsed.eight);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarUsed").eq(3).invoke("attr", "style").should("contain", "height: " +used.sugarUsed.twelve);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarUsed").eq(4).invoke("attr", "style").should("contain", "height: " +used.sugarUsed.sixteen);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarUsed").eq(5).invoke("attr", "style").should("contain", "height: " +used.sugarUsed.twenty);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarUsed").eq(6).invoke("attr", "style").should("contain", "height: " +used.sugarUsed.twentyFour);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarUsed").eq(7).invoke("attr", "style").should("contain", "height: " +used.sugarUsed.twentyEight);
    },
    verifySugarCreatedBarGraph(created) {
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarCreated").eq(0).invoke("attr", "style").should("contain", "height: " +created.sugarCreated.zero);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarCreated").eq(1).invoke("attr", "style").should("contain", "height: " +created.sugarCreated.four);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarCreated").eq(2).invoke("attr", "style").should("contain", "height: " +created.sugarCreated.eight);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarCreated").eq(3).invoke("attr", "style").should("contain", "height: " +created.sugarCreated.twelve);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarCreated").eq(4).invoke("attr", "style").should("contain", "height: " +created.sugarCreated.sixteen);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarCreated").eq(5).invoke("attr", "style").should("contain", "height: " +created.sugarCreated.twenty);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarCreated").eq(6).invoke("attr", "style").should("contain", "height: " +created.sugarCreated.twentyFour);
        this.getBarGraphContainer().find(".bar-graph-graphArea .bar-graph-sugarCreated").eq(7).invoke("attr", "style").should("contain", "height: " +created.sugarCreated.twentyEight);
    },
    checkPlayback(output, trialNumber) {
        this.verifySliderLabel(28);
        this.checkSugarUsed(output.sugarUsed.twentyEight, trialNumber);
        this.checkSugarCreated(output.sugarCreated.twentyEight, trialNumber);
    
        this.moveSlider(24);
        this.verifySliderLabel(24);
        this.checkSugarUsed(output.sugarUsed.twentyFour, trialNumber);
        this.checkSugarCreated(output.sugarCreated.twentyFour, trialNumber);
    
        this.moveSlider(20);
        this.verifySliderLabel(20);
        this.checkSugarUsed(output.sugarUsed.twenty, trialNumber);
        this.checkSugarCreated(output.sugarCreated.twenty, trialNumber);
    
        this.moveSlider(16);
        this.verifySliderLabel(16);
        this.checkSugarUsed(output.sugarUsed.sixteen, trialNumber);
        this.checkSugarCreated(output.sugarCreated.sixteen, trialNumber);
    
        this.moveSlider(12);
        this.verifySliderLabel(12);
        this.checkSugarUsed(output.sugarUsed.twelve, trialNumber);
        this.checkSugarCreated(output.sugarCreated.twelve, trialNumber);
    
        this.moveSlider(8);
        this.verifySliderLabel(8);
        this.checkSugarUsed(output.sugarUsed.eight, trialNumber);
        this.checkSugarCreated(output.sugarCreated.eight, trialNumber);
    
        this.moveSlider(4);
        this.verifySliderLabel(4);
        this.checkSugarUsed(output.sugarUsed.four, trialNumber);
        this.checkSugarCreated(output.sugarCreated.four, trialNumber);
    
        this.moveSlider(0);
        this.verifySliderLabel(0);
        this.checkSugarUsed(output.sugarUsed.zero, trialNumber);
        this.checkSugarCreated(output.sugarCreated.zero, trialNumber);
    
        this.moveSlider(28);
        this.verifySliderLabel(28);
        this.checkSugarUsed(output.sugarUsed.twentyEight, trialNumber);
        this.checkSugarCreated(output.sugarCreated.twentyEight, trialNumber);
    },

}


