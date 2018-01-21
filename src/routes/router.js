const createRouter = require('koa-router');

const routes = [
  require('./auth'),
  require('./hooks'),
  require('./debug'),
];

module.exports = (store) => {
  const router = createRouter();
  routes.forEach(route => route(router, store))
  return router;
};
