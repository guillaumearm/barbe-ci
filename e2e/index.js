/* eslint-disable no-console */
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const { pipe, equals } = require('ramda');
const path = require('path')
const { readdirSync } = require('fs');

const TEST_FOLDER = 'tests';

const integrationTests = readdirSync(path.join(__dirname, TEST_FOLDER))
  .filter(pipe(path.extname, equals('.js')))
  .map(testFile => `./${TEST_FOLDER}/${testFile}`)
  .map(require)
;

const webpackArguments = [
  '--output-path', path.join(__dirname, './dist'),
];

const webpackOptions = {
  env: { ...process.env, NODE_ENV: 'production' },
};

describe('e2e testing', () => {
  test('build client (production mode)', async () => {
    try {
      await execFile('webpack', webpackArguments, webpackOptions);
    } catch (e) {
      console.warn(e.stdout);
      throw new Error('Error: webpack build failed')
    }
  });

  test('fork server process (production mode)');

  integrationTests.forEach(([...args]) => {
    test(...args)
  })
})
