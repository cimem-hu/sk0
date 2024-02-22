module.exports = {
  preset: "jest-preset-angular",
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/.angular/",
  ],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
};
