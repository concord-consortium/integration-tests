const { defineConfig } = require('cypress');
const { installLogsPrinter } = require("cypress-terminal-report/src/installLogsPrinter");
const { addMatchImageSnapshotPlugin } = require("cypress-image-snapshot/plugin");

module.exports = defineConfig({
  chromeWebSecurity: false,
  video: true,
  screenshotOnRunFailure: true,
  requestTimeout: 60000,
  defaultCommandTimeout: 60000,
  responseTimeout: 60000,
  retries: 0,
  projectId: 'pyw6ti',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on);
      addMatchImageSnapshotPlugin(on, config);
      return require('./cypress/plugins/index.js')(on, config);
    },
    testIsolation: false,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  },

})
