const { always, identity } = require('ramda');
const { combine, withDefaultState } = require('redux-fp');

module.exports = combine({
  logs: require('./logs/updater'),
  db: require('./db/updater'),
  credentials: withDefaultState({}, always(identity)),
  serverConfiguration: withDefaultState({}, always(identity)),
});
