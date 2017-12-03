/* eslint-disable no-console */

const path = require('path');
const Koa = require('koa');

const getMiddlewares = require('./middlewares');

const serverOpts = {
  PORT: process.env.PORT || 8080,
  DIST_FOLDER: path.resolve(__dirname, '../../dist'),
}

const app = new Koa();
getMiddlewares(serverOpts).forEach(middleware => app.use(middleware));

app.listen(serverOpts.PORT)
console.log(`Listening on ${serverOpts.PORT}...`);
