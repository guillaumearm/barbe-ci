const { reject, isNil } = require('ramda');
const bodyParser = require('koa-bodyparser');

const router = require('./router');

module.exports = (serverOpts) => reject(isNil)([
  serverOpts.VERBOSE ? require('koa-logger')() : undefined,
  bodyParser({
    limit: '10mb',
  }),
  router.routes(),
])
