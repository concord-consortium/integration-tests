import {LabbookWideInteractiveElements as e} from "../elements/labbook_wide_interactive_elements";

const file = {
    image: "cypress/fixtures/image/water-drop-300-250.png"
};

export function verifyInitialDisplay() {
    e.verifyQuestionHeader("Labbook Wide URL");
    e.verifyPrompt("Labbook Wide URL Prompt");
    e.getDrawToolContainer().should("exist");
    e.getCommentField().should("exist");
    e.verifyThumbnailBlankText(0);
    e.verifyThumbnailNewText(1);
}
export function verifyLabbokWideUrl() {
    e.getShapeTool().click();
    e.getDrawingCanvas().click();
    e.enterComment("Labbook Wide URL Comment A");
    cy.wait(2000);
    e.getCommentTextArea().should("contain", "Labbook Wide URL Comment A");
    e.VerifyThumbnailUpdated(0);
    e.getThumbnail(1).click();
    cy.wait(2000);
    e.getShapeTool().click();
    e.getDrawingCanvas().click();
    e.enterComment("Labbook Wide URL Comment B");
    cy.wait(2000);
    e.getCommentTextArea().should("contain", "Labbook Wide URL Comment B");
    e.VerifyThumbnailUpdated(1);
    e.clickThumbnailCloseButton();
    e.VerifyBlankThumbnail(1);
    e.verifyThumbnailNewText(1);
    e.getCommentTextArea().should("contain", "Labbook Wide URL Comment A");
    e.VerifyThumbnailUpdated(0);
}
export function verifyLabbokWideUpload() {
    e.verifyQuestionHeader("Labbook Wide Upload");
    e.verifyPrompt("Labbook Wide Upload Prompt");
    e.enterComment("Labbook Wide Upload Comment A");
    cy.wait(2000);
    e.getCommentTextArea().should("contain", "Labbook Wide Upload Comment A");
    e.uploadImage(file.image);
    cy.wait(10000);
    e.VerifyThumbnailUpdated(0);
    e.getThumbnail(1).click();
    cy.wait(2000);
    e.getShapeTool().click();
    e.getDrawingCanvas().click();
    e.enterComment("Labbook Wide Upload Comment B");
    cy.wait(2000);
    e.getCommentTextArea().should("contain", "Labbook Wide Upload Comment B");
    e.VerifyThumbnailUpdated(1);
    e.clickThumbnailCloseButton();
    e.VerifyBlankThumbnail(1);
    e.verifyThumbnailNewText(1);
    e.getCommentTextArea().should("contain", "Labbook Wide Upload Comment A");
    e.VerifyThumbnailUpdated(0);
}
export function verifyLabbokWideSnapshot() {
    e.verifyQuestionHeader("Labbook Wide Snapshot");
    e.verifyPrompt("Labbook Wide Snapshot Prompt");
    e.enterComment("Labbook Wide Snapshot Comment A");
    cy.wait(2000);
    e.getCommentTextArea().should("contain", "Labbook Wide Snapshot Comment A");
    e.getTakeSnapshotButton().click();
    cy.wait(10000);
    e.VerifyThumbnailUpdated(0);
    e.getThumbnail(1).click();
    cy.wait(2000);
    e.getShapeTool().click();
    e.getDrawingCanvas().click();
    e.enterComment("Labbook Wide Snapshot Comment B");
    cy.wait(2000);
    e.getCommentTextArea().should("contain", "Labbook Wide Snapshot Comment B");
    e.VerifyThumbnailUpdated(1);
    e.clickThumbnailCloseButton();
    e.VerifyBlankThumbnail(1);
    e.verifyThumbnailNewText(1);
    e.getCommentTextArea().should("contain", "Labbook Wide Snapshot Comment A");
    e.VerifyThumbnailUpdated(0);
}
