const rewrite = require('koa-rewrite');
const staticCache = require('koa-static-cache');

const getAssetsMiddlewares = ({ DIST_FOLDER }) => {
  return [
    rewrite('/', '/index.html'),
    staticCache(DIST_FOLDER, {
      buffer: true,
      maxAge: 60 * 60 * 24 * 7,
    }),
  ];
};

module.exports = getAssetsMiddlewares;
