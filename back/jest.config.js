// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  verbose: true,
  roots: ["<rootDir>"],
  testRegex: "^.+\\.test\\.ts?$",
  transform: {
    "^.+\\.test\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
