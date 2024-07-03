const option = ["Schools", "Teachers", "Resources", "Permission forms"];

export const ResearcherReportsPageElements = {

	getHeader() {
		return cy.get('#form-container').prev();
	},
	verifyUserName(userName) {
		this.getHeader().should("contain", userName);
	},
	verifyLogout() {
		this.getHeader().find("a").contains("Logout");
	},
	getFormContainer() {
		return cy.get("#form-container");
	},
	verifyFormHeader() {
		this.getFormContainer().contains("Your filter matches:");
	},
	verifyFilterResults() {
		this.getFormContainer()
		.should("contain", "learners")
		.should("contain", "students")
		.should("contain", "classes")
		.should("contain", "teachers")
		.should("contain", "resources");
	},
	getLearnersFilterResult() {
		return this.getFormContainer().find('span').eq(0);
	},
	verifySearchFieldHeaders(field) {
		cy.get('#react-select-'+(option.indexOf(field) + 2)+'-live-region').parent().parent().should("contain", field);
	},
	clickInSearchField(field) {
		cy.get('#react-select-'+(option.indexOf(field) + 2)+'-input').click();
	},
	typeInSearchField(field, text) {
		cy.get('#react-select-'+(option.indexOf(field) + 2)+'-input').click().type(text);
	},
	getTeachersField() {
		return cy.get('#react-select-3-listbox');
	},
	getResourcesField() {
		return cy.get('#react-select-4-listbox');
	},
	getStartDate() {
		return cy.get('[name=start_date]');
	},
	verifyStartDateLabel() {
		this.getStartDate().parent().should("contain", "Earliest date of last run");
	},
	getEndDate() {
		return cy.get('[name=end_date]');
	},
	verifyEndDateLabel() {
		this.getEndDate().parent().should("contain", "Latest date of last run");
	},
	getHideNameCheckbox() {
		return cy.get('[name=hide_names]');
	},
	verifyHideNameCheckboxLabel() {
		this.getHideNameCheckbox().parent().should("contain", "Hide names");
	},
	verifyDetailsReportButtonDisplayed() {
		cy.get('[value="Details Report"]').should("exist");
	},
	verifyLearnerLogButtonDisplayed() {
		cy.get('[value="Learner Log"]').should("exist");
	},
	verifyLearnerLogExpandedButtonDisplayed() {
		cy.get('[value="Learner Log (Expanded)"]').should("exist");
	},
	verifyUsageReportButtonDisplayed() {
		cy.get('[value="Usage Report"]').should("exist");
	}

}