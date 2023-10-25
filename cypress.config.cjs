const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Cypress configuration options here

  e2e: {
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173"
  },
});
