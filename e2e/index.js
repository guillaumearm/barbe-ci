const { pipe, equals } = require('ramda');
const path = require('path')
const { readdirSync } = require('fs');

const TEST_FOLDER = 'tests';

const integrationTests = readdirSync(path.join(__dirname, TEST_FOLDER))
  .filter(pipe(path.extname, equals('.js')))
  .map(testFile => `./${TEST_FOLDER}/${testFile}`)
  .map(require)

describe('e2e testing', () => {
  test('build client (production mode)');
  test('fork server process (production mode)');

  integrationTests.forEach(([...args]) => {
    test(...args)
  })
})
