
export const ResearcherClassesElements = {
  getHeader() {
    return cy.get("#primary h1");
  },
  verifyDropDownHeader(header) {
    cy.get('#form-container form div span').contains(header);
  },
  getRemoveConcordConsortiumTeachersCheckbox() {
    return cy.get('#form-container form [type=checkbox]');
  },
  verifyCheckboxText() {
    cy.get('#form-container form [type=checkbox]').parent().should("contain", " Remove Concord Consortium Teachers? *");
  },
	verifyFooterNoteText() {
		cy.get('#form-container form').should("contain", '* Concord Consortium Teachers belong to schools named "Concord Consortium".');
	},
	clickDropDown(dropDown) {
		const option = ["Cohorts", "Teachers", "Resources"];
		cy.get('#form-container form #react-select-'+(option.indexOf(dropDown)+2)+'-input').click({ force: true });
	},
	getCohortsDropDown() {
		return cy.get('#form-container form #react-select-2-option-0').parent();
	},
	getTeachersDropDown() {
		return cy.get('#form-container form #react-select-3-option-0').parent();
	},
	getResourcesDropDown() {
		return cy.get('#form-container form #react-select-4-option-0').parent();
	},
	getResultsTable() {
		return cy.get('#form-container [class^=researcherClassesTable--]');
	},
	verifyResultsLabel() {
		this.getResultsTable().find('[class^=resultsLabel--]').should("contain", "Results");
	},
	verifyResultsTableHeader() {
		this.getResultsTable().find('thead tr')
		.should("contain", "Cohort")
		.should("contain", "Teacher")
		.should("contain", "Class");
	},
	getShowSchoolNameCheckbox() {
		return this.getResultsTable().find('input');
	},
	verifyResultsTableHeaderSortIcon(column) {
		const option = ["Cohort", "Teacher", "Class"];
		this.getResultsTable().find('thead tr th').eq(option.indexOf(column)).find('.icon-sort').should("exist");
	},
	verifyViewClassLink() {
		this.getResultsTable().find('tbody tr').eq(0).find('[class^=linkCell--]').should("contain", "View Class");
		this.getResultsTable().find('tbody tr').eq(0).find('[class^=linkCell--] a').should("exist");
	},
	getResultsTableSchoolColumn() {
		return this.getResultsTable().find('thead tr th').eq(3);
	},
	verifySchoolColumnSortIcon() {
		this.getResultsTableSchoolColumn().find('.icon-sort').should("exist");
	},
	clickSortIcon(column) {
		this.getResultsTable().find('thead tr th').eq(column).find('.icon-sort').click();
	},
	verifyFirstRowOfSort(column, data) {
		this.getResultsTable().find('tbody tr').eq(0).find('td').eq(column).should("contain", data);
	},
	getResetAllButton() {
    return cy.get('#form-container#form-container [class^=bottom--] [class^=summary--] button');
	},
  verifySummary() {
    cy.get('#form-container#form-container [class^=bottom--] [class^=summary--]').should("contain", "Your filter matches: ");
	},
  verifySummaryNotDisplayed() {
    cy.get('#form-container#form-container [class^=bottom--] [class^=summary--]').should("not.exist");
	},
	verifyConcordConsortiumSchoolNameDisplayed() {
		this.getResultsTable().find('tbody tr').eq(0).find('td').eq(3).should("contain", "Concord Consortium");
	},
	verifyConcordConsortiumSchoolNameNotDisplayed() {
		this.getResultsTable().find('tbody tr').eq(0).find('td').eq(3).should("not.contain", "Concord Consortium");
	},

  // Research classes landing page

  getAssignmentPage() {
    return cy.get('#assignments-page');
  },
  verifyHeader() {
    this.getAssignmentPage().find('[class^=classAssignments--] header').should("contain", "Automation Teacher 3 Class");
  },
  getOfferingsTable() {
    return this.getAssignmentPage().find('[class^=offeringsTable--]');
  },
  getFirstOffering() {
    return this.getOfferingsTable().find('[class^=offering--]').eq(0);
  },
  verifySortIconNotDisplayed() {
    this.getFirstOffering().find('.icon-sort').should("not.exist");
  },
  verifyActiveCheckboxDisabled() {
    this.getFirstOffering().find('[class^=checkboxCell--] input').eq(0).invoke("attr", "disabled").should("exist");
  },
  verifyLockedCheckboxDisabled() {
    this.getFirstOffering().find('[class^=checkboxCell--] input').eq(1).invoke("attr", "disabled").should("exist");
  },
  clickShowDetails() {
    this.getFirstOffering().find('[class^=detailsCell--] button').click();
  },
  verifyOfferingButtons() {
    this.getFirstOffering().find('[class^=offeringDetails-] a')
    .should("contain", "Preview")
    .should("contain", "Class Dashboard");
  },
  verifyAnonymousStudentName() {
    this.getFirstOffering().find('[class^=offeringProgress--] [class^=name--]')
    .should("contain", "Student 3")
    .should("contain", "Student 33")
    .should("contain", "Student 4");
  },

  // Expiration date

  getResearcherProject() {
    return cy.get('.options-list .inline-fields label').contains("Test Project For Researcher").parent();
  },
  getResearcherProjectCheckbox() {
    return this.getResearcherProject().find('.project-checkbox');
  },
  getResearcherProjectDateInput() {
    return this.getResearcherProject().find('.date-input');
  },
  verifyDateInputNotShown() {
    this.getResearcherProjectDateInput().invoke("attr", "style").should("contain", "none");
  },
  verifyDateInputShown() {
    this.getResearcherProjectDateInput().invoke("attr", "style").should("contain", "inline-block");
  },
  getSaveButton() {
		return cy.get('.action_menu_header_right input ').eq(0);
  }
}
