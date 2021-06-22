// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import {materialsSetup} from './helpers/setup/materials_setup_helper.js'
import {accountsSetup} from './helpers/setup/accounts_setup_helper.js'
import {accountsTeardown} from './helpers/setup/accounts_setup_helper.js'
import {noticesSetup} from './helpers/setup/notices_setup_helper.js'

Cypress.Cookies.defaults({
  preserve: '_rails_portal_session',
})

before(function() {

  materialsSetup();

  noticesSetup();

  accountsSetup();
});

after(function() {

  accountsTeardown();
});
