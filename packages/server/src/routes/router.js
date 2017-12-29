const createRouter = require('koa-router');

const routes = [
  require('./auth'),
  require('./hooks'),
  require('./debug'),
];

const router = createRouter();
routes.forEach(route => route(router))

module.exports = router;
