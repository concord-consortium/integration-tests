const { defineConfig } = require('cypress')

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
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
