module.exports = {
  preset: "jest-preset-angular",
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
};
