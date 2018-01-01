#!/usr/bin/env node
/* eslint-disable no-console */

const Koa = require('koa');
const session = require('koa-session');

const serverConfiguration = require('./configuration');
const getMiddlewares = require('./middlewares');
const createStore = require('./store');

const app = new Koa();
app.keys = ['simpleci']
app.use(session({}, app))

const initialState = {
  serverConfiguration,
  credentials: {
    clientId: 'fwrGpD44hvsE3LpSMx',
    clientSecret: 's9DWJqacAv5bRdkzqPEXLCRNvfrrYYtH',
  }
}

const store = createStore(initialState)

const launchServer = async () => {
  app.context.store = store;
  await store.loadDb();

  require('./auth')(app);
  getMiddlewares(app).forEach(middleware => app.use(middleware));

  app.listen(serverConfiguration.PORT, async () => {
    console.log(`Listening on ${serverConfiguration.PORT}.`);
    await store.reloadRepositories(store.getRepositoriesNames());
    console.log('Repositories - Reloaded.');
  })
}

launchServer();
