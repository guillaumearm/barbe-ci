const createRouter = require('koa-router');

const routes = [
  require('./auth'),
];

const router = createRouter();
routes.forEach(route => route(router))

module.exports = router;
