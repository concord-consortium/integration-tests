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
    
export const StarNavigationElements = {
    getSimulationFrame() {
        return getIframeBody(iFrameSelector).find("[data-testid=simulation-frame]");
    },
    verifyReadAloudLabel() {
        this.getSimulationFrame().find('.simulation-frame-right .switch-label').should("have.text", "Read Aloud in Yugtun");
    },
    getSimulationViewHeadingMarker() {
        return this.getSimulationFrame().find('.simulation-view-headingMarker');
    },
    getHeadingViewButton() {
        return this.getSimulationFrame().find('.simulation-view-buttons');
    },
    getHeadingScrollLeftButton() {
        return this.getHeadingViewButton().find('.scrolling-select-left');
    },
    getHeadingScrollRightButton() {
        return this.getHeadingViewButton().find('.scrolling-select-right');
    },
    verifyHeadingViewButtonValue(value) {
        return this.getHeadingViewButton().find('.scrolling-select-value').should("contain", value);
    },
    getBottomContainer() {
        return this.getSimulationFrame().find('.bottom-container-bottomContainer');
    },
    verifyTimeCirularInputLabel() {
        this.getBottomContainer().find('.bottom-container-timeCircularInput')
        .should("contain", "Midnight")
        .should("contain", "Noon");
    },
    clickTimeCircularInput(time) {
        this.getBottomContainer().find('.time-circular-input-hour').eq(time).click();
    },
    getDataAndTimeSection() {
        return this.getBottomContainer().find('.bottom-container-dateAndTime');
    },
    verifyDataAndTimeSectionLabel() {
        this.getDataAndTimeSection().find('.bottom-container-label').should("have.text", "Date and Time");
    },
    verifyTimeOfDay(time) {
        this.getDataAndTimeSection().find('.bottom-container-timeOfDay').should("contain", time);
    },
    getMonthSection() {
        return this.getDataAndTimeSection().find('.bottom-container-scrollingSelect').eq(0);
    },
    verifyMonthValue(month) {
        return this.getMonthSection().find('.scrolling-select-value').should("contain", month);
    },
    getMonthScrollLeftButton() {
        return this.getMonthSection().find('.scrolling-select-left');
    },
    getMonthScrollRightButton() {
        return this.getMonthSection().find('.scrolling-select-right');
    },
    getDaySection() {
        return this.getDataAndTimeSection().find('.bottom-container-scrollingSelect').eq(1);
    },
    verifyDayValue(day) {
        return this.getDaySection().find('.scrolling-select-value').should("contain", day);
    },
    getDayScrollLeftButton() {
        return this.getDaySection().find('.scrolling-select-left');
    },
    getDayScrollRightButton() {
        return this.getDaySection().find('.scrolling-select-right');
    },
    getNavigationMarksSection() {
        return this.getBottomContainer().find('.bottom-container-navigationMarks');
    },
    verifyNavigationMarkSectionLabel() {
        this.getNavigationMarksSection().find('.bottom-container-label').should("have.text", "Navigation Marks");
    },
    getNavigationTool() {
        return this.getNavigationMarksSection().find('input').eq(0);
    },
    verifyNavigationToolChecked() {
        this.getNavigationTool().parent().invoke("attr", "class").should("contain", "Mui-checked");
    },
    verifyNavigationToolUnchecked() {
        this.getNavigationTool().parent().invoke("attr", "class").should("not.contain", "Mui-checked");
    },
    getAngelTool() {
        return this.getNavigationMarksSection().find('input').eq(1);
    },
    verifyAngelToolChecked() {
        this.getAngelTool().parent().invoke("attr", "class").should("contain", "Mui-checked");
    },
    verifyAngelToolUnchecked() {
        this.getAngelTool().parent().invoke("attr", "class").should("not.contain", "Mui-checked");
    },
    getConstellationsSection() {
        return this.getBottomContainer().find('.bottom-container-constellations');
    },
    verifyConstellationSectionLabel() {
        this.getConstellationsSection().find('.bottom-container-label').should("have.text", "Constellations");
    },
    verifyConstellationsCheckboxLabel() {
        this.getConstellationsSection().find('label').eq(0).should("have.text", "Yup'ik");
        this.getConstellationsSection().find('label').eq(1).should("have.text", "Western");
    },
    getYupikCheckbox() {
        return this.getConstellationsSection().find('input').eq(0);
    },
    verifyYupikCheckboxChecked() {
        this.getYupikCheckbox().parent().invoke("attr", "class").should("contain", "Mui-checked");
    },
    verifyYupikCheckboxUnchecked() {
        this.getYupikCheckbox().parent().invoke("attr", "class").should("not.contain", "Mui-checked");
    },
    getWesternCheckbox() {
        return this.getConstellationsSection().find('input').eq(1);
    },
    verifyWesternCheckboxChecked() {
        this.getYupikCheckbox().parent().invoke("attr", "class").should("contain", "Mui-checked");
    },
    verifyWesternCheckboxUnchecked() {
        this.getYupikCheckbox().parent().invoke("attr", "class").should("not.contain", "Mui-checked");
    },

    getAppRightColumn() {
        return this.getSimulationFrame().find('.app-rightColumn');
    },
    verifyRightContainerLabel() {
        this.getAppRightColumn().find('.right-container-label').eq(0).should("have.text", "Plan Your Route");
        this.getAppRightColumn().find('.right-container-label').eq(1).should("have.text", "Chart Headings/Times");
    },
    verifyDepatureLabel(label) {
        this.getAppRightColumn().find('.right-container-light').eq(0).should("have.text", "Departure from Point " + label);
    },
    verifyArrivalLabel(label) {
        this.getAppRightColumn().find('.right-container-light').eq(1).should("have.text", "Arrival at Point " + label);
    },
    getDepatureSnapshot() {
        return this.getAppRightColumn().find('.snapshot-snapshot button').eq(0);
    },
    getArrivalSnapshot() {
        return this.getAppRightColumn().find('.snapshot-snapshot button').eq(1);
    },
    verifyDepartureSnapshotDisabled() {
        this.getDepatureSnapshot().invoke("attr", "disabled").should("exist");
    },
    verifyArrivalSnapshotDisabled() {
        this.getArrivalSnapshot().invoke("attr", "disabled").should("exist");
    },
    verifyDepartureSnapshotEnabled() {
        this.getDepatureSnapshot().invoke("attr", "disabled").should("not.exist");
    },
    verifyArrivalSnapshotEnabled() {
        this.getArrivalSnapshot().invoke("attr", "disabled").should("not.exist");
    },
    verifyDepartureSnapshotInfo(label) {
        this.getDepatureSnapshot().should("have.text", "Record Star Chart for Point " + label + " Departure");
    },
    verifyArrivalSnapshotInfo(label) {
        this.getArrivalSnapshot().should("have.text", "Record Star Chart for Point " + label + " Arrival");
    },
    verifyDepatureSnapshotUpdated() {
        this.getAppRightColumn().find('.snapshot-snapshot').eq(0).find('.snapshot-snapshotData').should("exist");
    },
    verifyArrivalSnapshotUpdated() {
        this.getAppRightColumn().find('.snapshot-snapshot').eq(1).find('.snapshot-snapshotData').should("exist");
    },
    getSnapshotCloseButton(index) {
        return this.getAppRightColumn().find('.snapshot-snapshot .snapshot-snapshotData button').eq(index);
    },
    getAToBButton() {
        return this.getAppRightColumn().find('.right-container-buttonsRow .button-button').eq(0);
    },
    verifyAToBButtonText() {
        this.getAToBButton().should("have.text", "A→B");
    },
    getBToCButton() {
        return this.getAppRightColumn().find('.right-container-buttonsRow .button-button').eq(1);
    },
    verifyBToCButtonText() {
        this.getBToCButton().should("have.text", "B→C");
    },
    getTakeYourTripResetRouteButton() {
        return this.getAppRightColumn().find('.right-container-takeYourTripBtn');
    },
    verifyTakeYourTripResetRouteButtonText(label) {
        this.getTakeYourTripResetRouteButton().should("have.text", label);
    },
    verifyTakeYourTripButtonDisabled() {
        this.getTakeYourTripResetRouteButton().invoke("attr", "disabled").should("exist");
    },
    verifyTakeYourTripButtonEnabled() {
        this.getTakeYourTripResetRouteButton().invoke("attr", "disabled").should("not.exist");
    },
    verifyButtonSelected(index) {
        this.getAppRightColumn().find('.right-container-buttonsRow .button-button').eq(index).invoke("attr", "class").should("contain", "button-selected");
    },
    placeNavigationMark() {
        this.getSimulationFrame().find('canvas').click(300, 200, { force: true });
    }
}
