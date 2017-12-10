#!/usr/bin/env node
/* eslint-disable no-console */

const Koa = require('koa');
const serverConfiguration = require('./configuration');

const getMiddlewares = require('./middlewares');

const app = new Koa();
getMiddlewares(serverConfiguration).forEach(middleware => app.use(middleware));

app.listen(serverConfiguration.PORT)
console.log(`Listening on ${serverConfiguration.PORT}...`);
