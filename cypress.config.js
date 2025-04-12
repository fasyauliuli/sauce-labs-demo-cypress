const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); // Tambahkan ini untuk mengaktifkan Allure
      return config;
    },
    specPattern: [
      'cypress/e2e/login.cy.js',
      'cypress/e2e/product.cy.js',
      'cypress/e2e/detail.cy.js',
      'cypress/e2e/cart.cy.js',
      'cypress/e2e/checkout.cy.js'
    ],
    viewportWidth: 1920, // Atur sesuai resolusi yang diinginkan
    viewportHeight: 1080,
    testIsolation: false,
    env: {
      baseUrl: 'https://www.saucedemo.com/',
      allure: true // Aktifkan Allure
    }
  },
});
