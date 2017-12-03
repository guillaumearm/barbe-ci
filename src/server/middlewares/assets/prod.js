const middlewares = require('koa-middlewares');
const getAssetsMiddlewares = ({ DIST_FOLDER }) => {
  return [
    middlewares.rewrite('/', '/index.html'),
    middlewares.staticCache(DIST_FOLDER, {
      buffer: true,
      maxAge: 60 * 60 * 24 * 7,
    }),
  ];
}

module.exports = getAssetsMiddlewares;
