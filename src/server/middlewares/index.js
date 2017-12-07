const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const router = require('./router');
const assets = require('./assets');

module.exports = (serverOpts) => [
  logger(),
  bodyParser({
    limit: '10mb',
  }),
  router.routes(),
  ...assets(serverOpts),
]
