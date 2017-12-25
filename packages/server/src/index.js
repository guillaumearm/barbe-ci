#!/usr/bin/env node
/* eslint-disable no-console */

const Koa = require('koa');
const session = require('koa-session')
const serverConfiguration = require('./configuration');
const getMiddlewares = require('./middlewares');

const app = new Koa();
app.keys = ['sdp']
app.use(session({}, app))

app.context.credentials = {
  BITBUCKET_CLIENT_SECRET: 's9DWJqacAv5bRdkzqPEXLCRNvfrrYYtH',
  BITBUCKET_CLIENT_ID: 'fwrGpD44hvsE3LpSMx',
}

require('./auth')(app);
getMiddlewares(serverConfiguration).forEach(middleware => app.use(middleware));

app.listen(serverConfiguration.PORT)
console.log(`Listening on ${serverConfiguration.PORT}...`);
