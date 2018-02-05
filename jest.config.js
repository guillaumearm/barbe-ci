module.exports = {
  rootDir: '.',
  globals: {
    'process.env.NODE_ENV': 'test'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ]
}
