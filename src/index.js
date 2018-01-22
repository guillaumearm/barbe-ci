#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const { promisify } = require('util');
const Koa = require('koa');
const session = require('koa-session');

const serverConfiguration = require('./configuration');
const getMiddlewares = require('./middlewares');
const createStore = require('./store');
const createRouter = require('./routes');

const readFile = promisify(fs.readFile);

const readJsonFile = async (path) => {
  const fileContent = await readFile(path);
  return JSON.parse(fileContent);
}

const app = new Koa();
app.keys = ['simpleci']
app.use(session({}, app))

const getInitialState = (credentials) => ({
  serverConfiguration,
  credentials,
});

const launchServer = async () => {
  const credentials = await readJsonFile('./credentials.json');
  const store = createStore(getInitialState(credentials))
  const router = createRouter(store);
  app.context.store = store;
  app.router = router;

  await store.loadDb();

  require('./auth')(app);
  getMiddlewares(app).forEach(middleware => app.use(middleware));

  app.listen(serverConfiguration.PORT, async () => {
    console.log(`Listening on ${serverConfiguration.PORT}.`);
    await store.reloadRepositories(store.getRepositoriesNames());
    console.log('Repositories - Reloaded.');
    await store.searchForDetachedCommits();
  })
}

launchServer();
