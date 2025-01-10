module.exports = {
    preset:'./jest-preset.js',
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts" ], // Configure Jest DOM for assertions
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Resolve module extensions
    testPathIgnorePatterns: ["/node_modules/", "const.test.ts", "/dist/" , "\\.spec\\."]
  };
  