const middlewares = require('koa-middlewares');
const router = require('./router');

module.exports = ({
  DIST_FOLDER,
  jsonLimit = '1mb',
}) => [
  middlewares.bodyParser({
    limit: jsonLimit,
  }),
  router.routes(),
  middlewares.logger(),
  middlewares.staticCache(DIST_FOLDER, {
    buffer: true,
    maxAge: 60 * 60 * 24 * 7,
  })
]
