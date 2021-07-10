import {accountsTeardown} from '../../support/helpers/setup/accounts_setup_helper.js'

context("Setup for Cypress Integration Tests", () => {

  it("Verify teardown runs after all integration tests finish", () => {

    accountsTeardown();
  });
});
