import {StarNavigationElements as e} from "../elements/star_navigation_elements";

export function verifyInitialDisplay() {
    e.verifyReadAloudLabel();
    e.getSimulationViewHeadingMarker().should("exist");
    e.verifyHeadingViewButtonValue("Heading");
    e.verifyTimeCirularInputLabel();

    e.getDataAndTimeSection().should("exist");
    e.verifyDataAndTimeSectionLabel();
    e.verifyTimeOfDay("12:00 AM");
    e.verifyMonthValue("February");
    e.verifyDayValue("15");

    e.getNavigationMarksSection().should("exist");
    e.verifyNavigationMarkSectionLabel();
    e.getNavigationTool().should("exist");
    e.verifyNavigationToolUnchecked();
    e.getAngelTool().should("exist");
    e.verifyAngelToolUnchecked();

    e.getConstellationsSection().should("exist");
    e.verifyConstellationSectionLabel();
    e.verifyConstellationsCheckboxLabel();
    e.verifyYupikCheckboxChecked();
    e.verifyWesternCheckboxChecked();   
}

export function makeChangesWithoutRouteMap() {
    e.clickTimeCircularInput(6);
    e.verifyTimeOfDay("06:00 AM");
    e.getMonthScrollRightButton().click().click();
    e.verifyMonthValue("April");
    e.getDayScrollRightButton().click().click();
    e.verifyDayValue("17");
    e.getYupikCheckbox().click();
    e.verifyYupikCheckboxUnchecked();
}

export function makeChangesWithRouteMap() {
    e.getNavigationTool().click();
    cy.wait(5000);
    e.placeNavigationMark();
    cy.wait(5000);
    e.getHeadingScrollRightButton().click().click().click();
    e.verifyHeadingViewButtonValue("Heading 15°");
    e.verifyDepartureSnapshotEnabled();
    e.verifyArrivalSnapshotEnabled();
    e.getDepatureSnapshot().click();
    e.getArrivalSnapshot().click();
    e.verifyDepatureSnapshotUpdated();
    e.verifyArrivalSnapshotUpdated();
    e.getBToCButton().click();
    e.getDepatureSnapshot().click();
    e.getArrivalSnapshot().click();
    e.verifyDepatureSnapshotUpdated();
    e.verifyArrivalSnapshotUpdated();
    e.verifyTakeYourTripButtonEnabled();
    e.clickTimeCircularInput(6);
    e.verifyTimeOfDay("06:00 AM");
}

export function verifyInitialDisplayWithRouteMap() {
    e.getAppRightColumn().should("exist");
    e.verifyRightContainerLabel();
    e.verifyDepatureLabel("A");
    e.verifyArrivalLabel("B");
    e.verifyDepartureSnapshotDisabled();
    e.verifyArrivalSnapshotDisabled();
    e.verifyDepartureSnapshotInfo("A");
    e.verifyArrivalSnapshotInfo("B");
    e.verifyAToBButtonText();
    e.verifyBToCButtonText();
    e.verifyTakeYourTripButtonText("Take Your Trip");
    e.verifyButtonSelected(0);
    e.verifyTakeYourTripButtonDisabled();
}

export function verifyStateSavingWithoutRouteMap() {
    e.verifyTimeOfDay("06:00 AM");
    e.verifyMonthValue("April");
    e.verifyDayValue("17");
    e.verifyYupikCheckboxUnchecked();
}

export function verifyStateSavingWithRouteMap() {
    e.verifyHeadingViewButtonValue("Heading 240°");
    e.verifyDepatureSnapshotUpdated();
    e.verifyArrivalSnapshotUpdated();
    e.verifyTakeYourTripButtonEnabled();
    e.verifyButtonSelected(1);
    e.verifyTimeOfDay("06:00 AM");
}

export function verifyResetRoute() {
    e.getTakeYourTripResetRouteButton().click();
    e.verifyTakeYourTripResetRouteButtonText("Reset Route");
    e.getTakeYourTripResetRouteButton().click();
    e.verifyTimeOfDay("12:00 AM");
    e.verifyHeadingViewButtonValue("Heading 15°");
    e.verifyButtonSelected(0);
    e.verifyDepartureSnapshotInfo("A");
    e.verifyArrivalSnapshotInfo("B");
}

export function verifyDeleteSnapshot() {
    e.getDepatureSnapshot().click();
    e.getArrivalSnapshot().click();
    e.verifyDepatureSnapshotUpdated();
    e.verifyArrivalSnapshotUpdated();
    e.getSnapshotCloseButton(0).click();
    e.verifyDepartureSnapshotInfo("A");
    e.verifyArrivalSnapshotUpdated();
}