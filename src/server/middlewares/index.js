const { reject, isNil } = require('ramda');
const bodyParser = require('koa-bodyparser');

const router = require('./router');
const assets = require('./assets');

module.exports = (serverOpts) => reject(isNil)([
  serverOpts.USE_LOGGER ? require('koa-logger')() : undefined,
  bodyParser({
    limit: '10mb',
  }),
  router.routes(),
  ...assets(serverOpts),
])
