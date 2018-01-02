const { reject, isNil } = require('ramda');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

module.exports = (app) => {
  const store = app.context.store
  const { VERBOSE } = store.getServerConfiguration();
  return reject(isNil)([
    VERBOSE ? require('koa-logger')() : undefined,
    bodyParser({
      limit: '10mb',
    }),
    passport.initialize(),
    passport.session(),
    app.router.routes(),
  ])
}
