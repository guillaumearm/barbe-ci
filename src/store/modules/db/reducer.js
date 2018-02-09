const { both, always, propEq, identity } = require('ramda');
const { hasPath } = require('ramda-adjunct');
const { combineReducers } = require('redux')
const { toReducer, composeReducers } = require('redux-fun');

const isLoadDb = both(
  propEq('type', 'LOAD_DB'),
  hasPath(['payload', 'db']),
);

const loadDbReducer = toReducer((action) => {
  if (isLoadDb(action)) {
    return always(action.payload.db);
  }
  return identity;
});

module.exports = composeReducers(
  combineReducers({
    users: toReducer(require('./users/updater')),
    tokens: toReducer(require('./tokens/updater')),
    repositories: require('./repositories/updater'),
    commits: toReducer(require('./commits/updater')),
  }),
  loadDbReducer,
)
