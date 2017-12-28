const createRouter = require('koa-router');

const routes = [
  require('./auth'),
  require('./hooks'),
];

const router = createRouter();
routes.forEach(route => route(router))

module.exports = router;
