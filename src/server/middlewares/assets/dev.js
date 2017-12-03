const config = require('../../../../webpack.config.js')
const e2k = require('express-to-koa');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const withStatusCode = (statusCode, middleware) => async function (ctx, next) {
  let prevStatus = ctx.res.statusCode;
  ctx.res.statusCode = statusCode;
  await middleware(ctx, function() {
    ctx.res.statusCode = prevStatus;
    return next();
  });
};

const getAssetsMiddlewares = () => {
  return [
    withStatusCode(200, e2k(
        webpackDevMiddleware(webpack(config), {
          stats: {
            colors: true,
          }
        })
      )
    ),
  ];
}

module.exports = getAssetsMiddlewares;
