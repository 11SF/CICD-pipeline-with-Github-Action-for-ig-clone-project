// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Use this configuration option to add custom reporters to Jest
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        pageTitle: "Test Report",
        filename: "backend_test_report.html",
      },
    ],
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",
};
