/* eslint-disable no-console */
const { spawn } = require('child_process');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const { pipe, equals } = require('ramda');
const path = require('path')
const { readdirSync } = require('fs');

const TEST_FOLDER = 'tests';
const SERVER_PORT = 8081;

const integrationTests = readdirSync(path.join(__dirname, TEST_FOLDER))
  .filter(pipe(path.extname, equals('.js')))
  .map(testFile => `./${TEST_FOLDER}/${testFile}`)
  .map(require)
;

const env = { ...process.env, NODE_ENV: 'production' }

const webpackArguments = [
  '--output-path', path.join(__dirname, './dist'),
];

const serverProcessArguments = [
  path.join(__dirname, '../src/server/index.js'),
  '-p', SERVER_PORT,
]

describe('e2e testing', () => {
  let serverProcess;
  test('build client (production mode)', async () => {
    try {
      await execFile('webpack', webpackArguments, { env });
    } catch (e) {
      console.warn(e.stdout);
      throw new Error('Error: webpack build failed')
    }
  });

  test('spawn server process (production mode)', (done) => {
    serverProcess = spawn('node', serverProcessArguments, { env })
    serverProcess.stdout.on('data', (data) => {
      expect(data.toString()).toMatch(new RegExp(`^Listening on ${SERVER_PORT}`))
      done();
    })
  });

  integrationTests.forEach(([...args]) => {
    test(...args)
  })

  test('exit server process', () => {
    serverProcess.stdin.pause()
    serverProcess.kill();
  })
})
