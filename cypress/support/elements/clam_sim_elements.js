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

let iFrameSelector = activityPlayerElements.getQuestionSectionSelector(1) + ' iframe';
  
export const ClamSimElements = {
  getSimulationFrame() {
    return getIframeBody(iFrameSelector).find("[data-testid=simulation-frame]");
  },
  getOptionView() {
    return getIframeBody(iFrameSelector).find(".app-optionsContainer .options-view-optionsView");
  },
  verifyControlsLabel() {
    this.getOptionView().find('.labeled-container-label').should("have.text", "Controls");
  },
  verifyInputSlider(slider, label1, label2, label3) {
    const option = ["Algae", "Clams"];
    this.getOptionView().find('.input-slider-input .input-slider-type').eq(option.indexOf(slider)).should("contain", slider);
    this.getOptionView().find('.input-slider-input .input-slider-right .input-slider-labels').eq(option.indexOf(slider))
    .should("contain", label1)
    .should("contain", label2)
    .should("contain", label3);
  },
  moveInputSlider(slider, value) {
    const option = ["Algae", "Clams"];

    const valueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
    ).set
    if(value === "High")   {     
      this.getOptionView().find('.input-slider-input .input-slider-left input').eq(option.indexOf(slider))
        .should('have.value', 1)
        .then(function ($slider) {
        valueSetter.call($slider[0], 2)
        })
        .trigger('change')
    } else if(value === "Low") {
      this.getOptionView().find('.input-slider-input .input-slider-left input').eq(option.indexOf(slider))
          .should('have.value', 1)
          .then(function ($slider) {
          valueSetter.call($slider[0], 0)
          })
          .trigger('change')
    } else if(value === "10") {
      this.getOptionView().find('.input-slider-input .input-slider-left input').eq(option.indexOf(slider))
          .should('have.value', 1)
          .then(function ($slider) {
          valueSetter.call($slider[0], 2)
          })
          .trigger('change')
    } else if(value === "1") {
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
  verifyWaterTemp(temp) {
    this.getSimulationView().find('.simulation-view-tempLabel')
    .should("contain", "Water Temp: ")
    .should("contain", temp);
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
    this.getTimeSliderContainer().find('.slider-label').should("contain", time.finalTime);
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
  verifySliderLabel(month) {
    this.getTimeSliderContainer().find('.slider-label')
    .should("contain", "Month: ")
    .should("contain", month);
  }, 
  moveSlider(slider) {
    this.getTimeSliderContainer().find(".MuiSlider-mark[data-index=\"" + slider + "\"]").click({ force: true });
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
    getIframeBody(iFrameSelector).find(".table-header .table-title").should("have.text", "Trial Results");
  },
  verifyTableColumnNames() {
    this.getTableHeader().eq(0).should("have.text", "Trial");
    this.getTableHeader().eq(1).should("have.text", "# of Clams");
    this.getTableHeader().eq(2).should("have.text", "Algae");
    this.getTableHeader().eq(3).should("have.text", "Nitrate");
    this.getTableHeader().eq(4).should("have.text", "Turbidity");
  },
  getTrialsTable() {
    return getIframeBody(iFrameSelector).find(".table-tableContainer");
  },
  selectTrial(trial) {
    this.getTrialsTable().find("tbody tr[role=row]").eq(trial).click();
  },
  checkAlgae(output, trialNumber) {
    this.getTrialsTable().find("tbody tr[role=row]").eq(trialNumber-1).find("td[role=cell]").eq(2).should("contain", output);
  },
  checkNitrate(output, trialNumber) {
    this.getTrialsTable().find("tbody tr[role=row]").eq(trialNumber-1).find("td[role=cell]").eq(3).should("contain", output);
  },
  checkTurbidity(output, trialNumber) {
    this.getTrialsTable().find("tbody tr[role=row]").eq(trialNumber-1).find("td[role=cell]").eq(4).should("contain", output);
  },
  getGraphContainer() {
    return getIframeBody(iFrameSelector).find('.app-lineGraphs');
  },
  verifyGraphHeaderTitle() {
    getIframeBody(iFrameSelector).find(".app-header").should("have.text", "Trial 1 Graphs");
  },
  verifyLineGraphTitle() {
    this.getGraphContainer().find(".graphs-container-graphTitle")
    .should("contain", "Algae")
    .should("contain", "Nitrate")
    .should("contain", "Turbidity");
  },
  verifyXAxisLabel() {
    this.getGraphContainer().find(".graphs-container-xAxisLabel").eq(0).should("have.text", "Month");
    this.getGraphContainer().find(".graphs-container-xAxisLabel").eq(1).should("have.text", "Month");
    this.getGraphContainer().find(".graphs-container-xAxisLabel").eq(2).should("have.text", "Month");
  },
  verifyXTicksLabel(graph) {
    const option = ["Algae", "Nitrate", "Turbidity"];
    this.getGraphContainer().find(".graphs-container-xAxisTicks").eq(option.indexOf(graph)).find(".graphs-container-xAxisTickLabel").eq(0).contains("May");
    this.getGraphContainer().find(".graphs-container-xAxisTicks").eq(option.indexOf(graph)).find(".graphs-container-xAxisTickLabel").eq(1).contains("Jun");
    this.getGraphContainer().find(".graphs-container-xAxisTicks").eq(option.indexOf(graph)).find(".graphs-container-xAxisTickLabel").eq(2).contains("Jul");
    this.getGraphContainer().find(".graphs-container-xAxisTicks").eq(option.indexOf(graph)).find(".graphs-container-xAxisTickLabel").eq(3).contains("Aug");
    this.getGraphContainer().find(".graphs-container-xAxisTicks").eq(option.indexOf(graph)).find(".graphs-container-xAxisTickLabel").eq(4).contains("Sep");
  },
  verifyYTicksLabel(graph) {
    const option = ["Algae", "Nitrate", "Turbidity"];
    this.getGraphContainer().find(".graphs-container-yAxisTicks").eq(option.indexOf(graph)).find(".graphs-container-yAxisTickLabel").eq(0).should("have.text", "High");
    this.getGraphContainer().find(".graphs-container-yAxisTicks").eq(option.indexOf(graph)).find(".graphs-container-yAxisTickLabel").eq(1).should("have.text", "Med");
    this.getGraphContainer().find(".graphs-container-yAxisTicks").eq(option.indexOf(graph)).find(".graphs-container-yAxisTickLabel").eq(2).should("have.text", "Low");
  },
  checkPlayback(output, trialNumber) {
    this.verifySliderLabel("Sep");
    this.checkAlgae(output.algae.sep, trialNumber);
    this.checkNitrate(output.nitrate.sep, trialNumber);
    this.checkTurbidity(output.turbidity.sep, trialNumber);

    this.moveSlider("3");
    this.verifySliderLabel("Aug");
    this.checkAlgae(output.algae.aug, trialNumber);
    this.checkNitrate(output.nitrate.aug, trialNumber);
    this.checkTurbidity(output.turbidity.aug, trialNumber);

    this.moveSlider("2");
    this.verifySliderLabel("Jul");
    this.checkAlgae(output.algae.jul, trialNumber);
    this.checkNitrate(output.nitrate.jul, trialNumber);
    this.checkTurbidity(output.turbidity.jul, trialNumber);

    this.moveSlider("1");
    this.verifySliderLabel("Jun");
    this.checkAlgae(output.algae.jun, trialNumber);
    this.checkNitrate(output.nitrate.jun, trialNumber);
    this.checkTurbidity(output.turbidity.jun, trialNumber);

    this.moveSlider("0");
    this.verifySliderLabel("May");
    this.checkAlgae(output.algae.may, trialNumber);
    this.checkNitrate(output.nitrate.may, trialNumber);
    this.checkTurbidity(output.turbidity.may, trialNumber);
  }

}


