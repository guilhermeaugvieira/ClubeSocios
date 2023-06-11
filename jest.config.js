/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: './coverage/',
  verbose: true,
  passWithNoTests: true,
  restoreMocks: true,
  testRegex: '.*\\.Test\\.ts$'
};