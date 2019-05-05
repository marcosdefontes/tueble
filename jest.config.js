// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
   testRegex: 'spec.js$',
   moduleFileExtensions: ['js', 'vue'],
   transform: {
      '^.+\\.js$': 'babel-jest',
      '.*\\.(vue)$': 'vue-jest'
   },
   coverageDirectory: './coverage/',
   testEnvironment: 'jest-environment-jsdom-fourteen',
   testEnvironmentOptions: {
      pretendToBeVisual: true
   }
};
