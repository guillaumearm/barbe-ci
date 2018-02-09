const { always, identity } = require('ramda');
const { combineReducers } = require('redux');
const { withDefaultState } = require('redux-fp');
const { toReducer } = require('redux-fun')

const db = require('./db/updater');
const logs = require('./logs/updater');

const credentials = withDefaultState({}, always(identity))
const serverConfiguration = withDefaultState({}, always(identity))

module.exports = combineReducers({
  logs: toReducer(logs),
  db: toReducer(db),
  credentials: toReducer(credentials),
  serverConfiguration: toReducer(serverConfiguration),
});
