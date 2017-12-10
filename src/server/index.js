#!/usr/bin/env node
/* eslint-disable no-console */

const path = require('path');
const Koa = require('koa');

const getMiddlewares = require('./middlewares');

const isDevelopment = process.env.NODE_ENV === 'development'

const serverOpts = {
  PORT: process.env.PORT || 8080,
  DIST_FOLDER: path.resolve(__dirname, '../../dist'),
  USE_LOGGER: Boolean(process.env.USE_LOGGER) || isDevelopment
}

const app = new Koa();
getMiddlewares(serverOpts).forEach(middleware => app.use(middleware));

app.listen(serverOpts.PORT)
console.log(`Listening on ${serverOpts.PORT}...`);
