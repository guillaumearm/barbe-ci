const { describe, test } = require('async-describe');
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const { pipe, equals } = require('ramda');
const path = require('path')
const serve = require('serve');
const { readdirSync } = require('fs');

const rimraf = promisify(require('rimraf'));

const testOptions = {
  WEBPACK_BIN: path.resolve(__dirname, '../packages/client/node_modules/.bin/webpack'),
  DIST_FOLDER: 'dist',
  TEST_FOLDER: 'tests',
  API_PORT: 8081,
  SERVER_PORT: 8082,
  WEBPACK_CONFIG: 'packages/client/webpack.config.js',
};

const functionalTests = readdirSync(path.join(__dirname, testOptions.TEST_FOLDER))
  .filter(pipe(path.extname, equals('.js')))
  .map(testFile => `./${testOptions.TEST_FOLDER}/${testFile}`)
  .map(require)
;

const env = { ...process.env, NODE_ENV: 'production' }

const webpackArguments = [
  '--output-path', path.join(__dirname, testOptions.DIST_FOLDER),
  '--config', path.resolve(__dirname, '..', testOptions.WEBPACK_CONFIG)
];

const serverProcessArguments = [
  path.join(__dirname, '../packages/server/src/index.js'),
  '-p', testOptions.API_PORT,
  '-d', path.join(__dirname, testOptions.DIST_FOLDER),
]

describe('e2e testing', async () => {
  let browser;
  let staticServer;
  let apiServer;
  await describe('build client (production mode)', async () => {
    await rimraf(path.join(__dirname, 'dist'))
    await execFile(testOptions.WEBPACK_BIN, webpackArguments, { env, cwd: path.join(__dirname, '../packages/client') });
  });

  await describe('spawn static assets server', async () => {
    staticServer = serve(path.join(__dirname, 'dist'), {
      port: testOptions.SERVER_PORT,
    })
  })

  await describe('spawn server api (production mode)', async () => {
    apiServer = spawn('node', serverProcessArguments, { env })
    await new Promise(resolve => {
      apiServer.stdout.on('data', (data) => {
        if (new RegExp(`^Listening on ${testOptions.API_PORT}`).test(data.toString())) {
          resolve(data.toString())
        }
      })
    });
  });

  await describe('launch chrome headless client', async () => {
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--enable-logging',
      ],
    });
  })

  await describe('functional tests', async () => {
    await Promise.all(functionalTests.map(async (getTest) => {
      const page = await browser.newPage();
      await test(...getTest({ ...testOptions, page }))
      await page.close();
    }))
  });

  await describe('close api', async () => {
    apiServer.stdin.pause();
    apiServer.kill();
  })

  await describe('close static server', async () => {
    staticServer.stop();
  })

  await describe('close browser', async () => {
    await browser.close();
  })
})
