module.exports = {
    preset:'./jest-preset.js',
    setupFilesAfterEnv: ["./jest.setup.ts" ], // Configure Jest DOM for assertions
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Resolve module extensions
    testPathIgnorePatterns: ["/node_modules/",  "/dist/" , "\\.spec\\."]
  };
  