/* eslint-disable no-console */

const path = require('path');
const Koa = require('koa');

const getMiddlewares = require('./middlewares');

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = path.resolve(__dirname, '../../dist')

const app = new Koa();

getMiddlewares({
  DIST_FOLDER,
  jsonLimit: '10mb',
}).forEach(middleware => app.use(middleware))

app.listen(PORT)

console.log(`Listening on ${PORT}...`);
console.log(`Serving files over ${DIST_FOLDER}`);
