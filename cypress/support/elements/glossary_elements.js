
export const GlossaryElements = {
	getTextBlock() {
		return cy.get("[data-cy='text-box']");
	},
	getGlossaryWord() {
		return cy.get("[class^='plugin-app--ccGlossaryWord']");
	},
	getGlossaryDialog() {
		return cy.get("[class^='ui-dialog ui-corner-all']");
	},
	getLanguageSelector() {
		return this.getGlossaryDialog().find("[class^='language-selector--languageSelector']");
	},
	verifyLanguageButton(index, language) {
		this.getLanguageSelector().find("[class^='button--button']").eq(index).should("have.text", language)
	},
	verifyTestTerm(testTerm) {
		this.getGlossaryDialog().find("[class^='glossary-popup--glossaryPopup']").should("contain", testTerm)
	}
}
