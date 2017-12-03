const middlewares = require('koa-middlewares');
const router = require('./router');
const assets = require('./assets');

module.exports = (serverOpts) => [
  middlewares.logger(),
  middlewares.bodyParser({
    limit: '10mb',
  }),
  router.routes(),
  ...assets(serverOpts),
]
