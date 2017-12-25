const { reject, isNil } = require('ramda');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const router = require('./router');

module.exports = (serverOpts) => reject(isNil)([
  serverOpts.VERBOSE ? require('koa-logger')() : undefined,
  bodyParser({
    limit: '10mb',
  }),
  passport.initialize(),
  passport.session(),
  router.routes(),
])
