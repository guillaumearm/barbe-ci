#!/usr/bin/env node
/* eslint-disable no-console */

const Koa = require('koa');
const session = require('koa-session')
const serverConfiguration = require('./configuration');
const getMiddlewares = require('./middlewares');
const createStore = require('./store');

const app = new Koa();
app.keys = ['sdp']
app.use(session({}, app))

const initialState = {
  serverConfiguration,
  credentials: {
    BITBUCKET_CLIENT_SECRET: 's9DWJqacAv5bRdkzqPEXLCRNvfrrYYtH',
    BITBUCKET_CLIENT_ID: 'fwrGpD44hvsE3LpSMx',
  }
}

app.context.store = createStore(initialState);

require('./auth')(app);
getMiddlewares(app).forEach(middleware => app.use(middleware));

app.listen(serverConfiguration.PORT)
console.log(`Listening on ${serverConfiguration.PORT}...`);
