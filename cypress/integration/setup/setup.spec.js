
import {materialsSetup} from '../../support/helpers/setup/materials_setup_helper.js'
import {accountsSetup} from '../../support/helpers/setup/accounts_setup_helper.js'
import {noticesSetup} from '../../support/helpers/setup/notices_setup_helper.js'
import {tagsSetup} from '../../support/helpers/setup/tags_setup_helper.js'

context("Setup for Cypress Integration Tests", () => {

  it("Verify setup runs before all integration tests begin", () => {

    materialsSetup();

    tagsSetup();

    noticesSetup();

    accountsSetup();
  });
});
