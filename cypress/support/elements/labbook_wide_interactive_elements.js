import * as activityPlayerElements from "./ap_runtime_page_elements";

let iFrameSelector1 = activityPlayerElements.getQuestionSectionSelector(1) + ' iframe';

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
     
export const LabbookWideInteractiveElements = {
    verifyQuestionHeader(header) {
        return cy.get('[data-cy=managed-interactive] .header').should("contain", header);
    },
    verifyPrompt(prompt) {
        return getIframeBody(iFrameSelector1).find('.base-app--runtime--question-int p').should("contain", prompt);
    },
    getDrawToolContainer() {
        return getIframeBody(iFrameSelector1).find('[data-testid=draw-tool]');
    },
    getDrawingCanvas() {
        return this.getDrawToolContainer().find('.canvas-container');
    },
    getSelectTool() {
        return this.getDrawToolContainer().find('.dt-palette.dt-vertical .dt-first');
    },
    getFreeHandDrawingTool() {
        return this.getDrawToolContainer().find('.dt-palette.dt-vertical .dt-btn').eq(1);
    },
    getShapeTool() {
        return this.getDrawToolContainer().find('.dt-palette.dt-vertical .dt-btn.dt-expand');
    },
    getAnnotationTool() {
        return this.getDrawToolContainer().find('.dt-palette.dt-vertical .dt-btn.dt-keep-text-edit-mode');
    },
    getDeleteTool() {
        return this.getDrawToolContainer().find('.dt-palette.dt-vertical .dt-btn.dt-last.dt-locked');
    },
    getCommentField() {
        return getIframeBody(iFrameSelector1).find('[data-testid=comment-field]');
    },
    verifyCommentThumbnailTitle(thumbnail) {
        this.getCommentField().find('[data-testid=thumbnail-title]').should("have.text", thumbnail)
    },
    getCommentTextArea() {
        return this.getCommentField().find('[data-testid=comment-field-textarea]');
    },
    enterComment(text) {
        this.getCommentField().find('[data-testid=comment-field-textarea]').type(text);
    },
    getThumbnailContainer() {
        return getIframeBody(iFrameSelector1).find('[data-testid=thumbnail-chooser]');
    },
    getThumbnail(index) {
        return this.getThumbnailContainer().find('[data-testid=thumbnail-wrapper]').eq(index);
    },
    verifyThumbnailTitle(index, title) {
        this.getThumbnail(index).find('[data-testid=thumbnail-title]').should("have.text", title)
    },
    verifyThumbnailBlankText(index) {
        this.getThumbnail(index).find('[data-testid=thumbnail]').should("have.text", "[blank]");
    },
    verifyThumbnailNewText(index) {
        this.getThumbnail(index).find('.thumbnail-wrapper--empty-content--question-int').should("have.text", "New");
    },
    VerifyThumbnailUpdated(index) {
        this.getThumbnail(index).find('.canvas-container').should("exist");
    },
    VerifyBlankThumbnail(index) {
        this.getThumbnail(index).find('.canvas-container').should("not.exist");
    },
    clickThumbnailCloseButton() {
        getIframeBody(iFrameSelector1).find('[data-testid=thumbnail-close-button]').click();
    },
    getUploadImageButton() {
        return getIframeBody(iFrameSelector1).find('[data-testid=file-input]');
    },
    uploadImage(file) {
        this.getUploadImageButton().selectFile(file, { force: true });
    },
    getTakeSnapshotButton() {
        return getIframeBody(iFrameSelector1).find('.upload-button--button-text--question-int');
    },
}




