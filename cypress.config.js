const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  viewportHeight: 1020,
  viewportWidth: 1280,
  videoCompression: false,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})



