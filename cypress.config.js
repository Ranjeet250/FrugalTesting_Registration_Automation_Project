const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "123456",
  e2e: {
    // Base URL for all tests
    baseUrl: "http://localhost:3000",

    // Viewport dimensions
    viewportWidth: 1280,
    viewportHeight: 720,

    // Test timeout (milliseconds)
    defaultCommandTimeout: 5000,
    requestTimeout: 5000,
    responseTimeout: 10000,

    // Video settings
    video: true,
    videoCompression: 32,
    videoOnFailOnly: false,

    // Screenshot settings
    screenshotOnRunFailure: true,

    // Test files pattern
    specPattern: "automation/**/*.{js,jsx,ts,tsx}",

    // Support file
    supportFile: false,

    // Setup hooks
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },

  // Global configuration
  reporter: "spec",
  reporterOptions: {
    mochaFile: "cypress/reports/results.xml",
    toConsole: true,
  },

  // Behavior
  chromeWebSecurity: false,
  experimentalStudio: false,

  // Number of tests to retry on failure
  retries: {
    runMode: 1,
    openMode: 0,
  },
});
