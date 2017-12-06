const e2k = require('express-to-koa');
const webpack = require('webpack');
const config = require('../../../../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const withStatusCode = (statusCode, middleware) => async function (ctx, next) {
  let prevStatus = ctx.res.statusCode;
  ctx.res.statusCode = statusCode;
  await middleware(ctx, function() {
    ctx.res.statusCode = prevStatus;
    return next();
  });
};

const getAssetsMiddlewares = () => {
  const compiler = webpack(config);
  return [
    e2k(webpackHotMiddleware(compiler)),
    withStatusCode(200, e2k(
        webpackDevMiddleware(compiler, {
          stats: {
            colors: true,
          }
        })
      )
    ),
  ];
}

module.exports = getAssetsMiddlewares;
