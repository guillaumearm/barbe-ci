module.exports = {
  rootDir: '..',
  globals: {
    'process.env.NODE_ENV': 'test'
  },
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/e2e/index.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  moduleDirectories: [
    'node_modules'
  ]
}
