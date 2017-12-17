const { describe, test } = require('async-describe');
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const { pipe, equals } = require('ramda');
const path = require('path')
const { readdirSync } = require('fs');

const testOptions = {
  DIST_FOLDER: 'dist',
  TEST_FOLDER: 'tests',
  SERVER_PORT: 8081,
};

const functionalTests = readdirSync(path.join(__dirname, testOptions.TEST_FOLDER))
  .filter(pipe(path.extname, equals('.js')))
  .map(testFile => `./${testOptions.TEST_FOLDER}/${testFile}`)
  .map(require)
;

const env = { ...process.env, NODE_ENV: 'production' }

const webpackArguments = [
  '--output-path', path.join(__dirname, testOptions.DIST_FOLDER),
];

const serverProcessArguments = [
  path.join(__dirname, '../src/server/index.js'),
  '-p', testOptions.SERVER_PORT,
  '-d', path.join(__dirname, testOptions.DIST_FOLDER),
]

describe('e2e testing', async () => {
  let browser;
  let serverProcess;
  await describe('build client (production mode)', async () => {
    await execFile('npm', ['run', 'clean:e2e']);
    await execFile('webpack', webpackArguments, { env });
  });

  await describe('spawn server process (production mode)', async () => {
    serverProcess = spawn('node', serverProcessArguments, { env })
    await new Promise(resolve => {
      serverProcess.stdout.on('data', (data) => {
        if (new RegExp(`^Listening on ${testOptions.SERVER_PORT}`).test(data.toString())) {
          resolve(data.toString())
        }
      })
    });
  });

  await describe('launch chrome headless client', async () => {
    browser = await puppeteer.launch();
  })

  await describe('functional tests', async () => {
    await Promise.all(functionalTests.map(async (getTest) => {
      const page = await browser.newPage();
      await test(...getTest({ ...testOptions, page }))
      await page.close();
    }))
  });

  await describe('close server', async () => {
    serverProcess.stdin.pause()
    serverProcess.kill();
  })

  await describe('close browser', async () => {
    await browser.close();
  })
})
