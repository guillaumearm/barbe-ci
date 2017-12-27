const { reject, isNil } = require('ramda');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const routes = require('./routes');
const { getServerConfiguration } = require('./store/selectors');

module.exports = (app) => {
  const { getState } = app.context.store
  const { VERBOSE } = getServerConfiguration(getState());
  return reject(isNil)([
    VERBOSE ? require('koa-logger')() : undefined,
    bodyParser({
      limit: '10mb',
    }),
    passport.initialize(),
    passport.session(),
    routes,
  ])
}
