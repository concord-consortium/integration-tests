import {TecRocksTableInteractiveElements as e} from "../elements/tecrocks_table_interactive_elements";

export function verifyInitialDisplay() {
    e.verifyPrompt();
    e.verifyPlaceHolderImage();
    e.verifyCollectDataDisabled();
}
export function verifySelectDataDialog() {
    e.clickDrawCrossSection();
    e.drawMainCanvasDrag();
    e.verifyCollectDataEnabled();
    e.getCollectData().click();
    e.verifyDrawCrossSectionDisabled();
    e.verifyMeasureTempPressureDisabled();
    e.verifyTakeSampleDisabled();
    e.getCrossSection().click(400, 200);
    e.getDialog().should("exist");
    e.verifyDialogTitle("Selected Data");
    e.verifyDataCollectionDialogHeader();
    e.getDiscardButton().should("contain", "Discard");
    e.getSubmitButton().should("contain", "Submit");
    e.getDiscardButton().click();
    cy.wait(2000);
    e.verifyPlaceHolderImage();
    e.getCrossSection().click(400, 200);
    e.getSubmitButton().click();
    cy.wait(2000);
    // e.verifyPlaceHolderImageHidden();
}
export function verifyExitDataCollectionModeDialog() {
    e.getCollectData().click();
    e.verifyDialogTitle("Exit Data Collection Mode");
    e.verifyExitDataCollectionDialogContent();
    e.getContinueButton().should("contain", "Continue");
    e.getSaveExitButton().should("contain", " Save & Exit");
    e.getContinueButton().click({ force: true });
    cy.wait(2000);
    e.verifyDrawCrossSectionDisabled();
    e.verifyMeasureTempPressureDisabled();
    e.verifyTakeSampleDisabled();
    e.getCollectData().click({ force: true });
    e.getSaveExitButton().click();
    e.verifyDrawCrossSectionEnabled();
    e.verifyMeasureTempPressureEnabled();
    e.verifyTakeSampleEnabled();
}
// export function verifyTecRocksTable() {
//     e.verifyTecRocksTableHeader();
//     e.verifySnapshot();
// }
export function verifyDataCollectionModeDialog() {
    e.getCollectData().click();
    e.verifyDialogTitle("Data Collection Mode");
    e.verifyDataCollectionDialogContent();
    e.getCancelButton().should("contain", "Cancel");
    e.getErasePreviousDataButton().should("contain", "Erase previous data & Start over");
    e.getCancelButton().click({ force: true });
    cy.wait(2000);
    e.verifyDrawCrossSectionEnabled();
    e.verifyMeasureTempPressureEnabled();
    e.verifyTakeSampleEnabled();
    // e.verifyPlaceHolderImageHidden();
    e.getCollectData().click();
    e.getErasePreviousDataButton().click({ force: true });
    cy.wait(2000);
    e.verifyDrawCrossSectionDisabled();
    e.verifyMeasureTempPressureDisabled();
    e.verifyTakeSampleDisabled();
    e.verifyPlaceHolderImage();
}