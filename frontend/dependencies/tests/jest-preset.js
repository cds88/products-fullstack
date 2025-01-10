module.exports = {
    preset: 'ts-jest',  
    testEnvironment: 'jsdom',  
    transform: {
      "^.+\\.tsx?$": "ts-jest",  
      "^.+\\.jsx?$": "babel-jest",  
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", 
      "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js", 
      '^src/(.*)$': '<rootDir>/src/$1',  
    },
  };
  