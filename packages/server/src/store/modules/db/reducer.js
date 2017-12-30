const { always, identity } = require('ramda');
const { combineReducers } = require('redux')
const { toReducer, composeReducers } = require('redux-fun');

const loadDbReducer = toReducer((action) => {
  if (action.type === 'LOAD_DB' && action.payload.db) {
    return always(action.payload.db);
  }
  return identity;
});

module.exports = composeReducers(
  combineReducers({
    users: require('./users/reducer'),
    ci: require('./ci/reducer'),
    repositories: require('./repositories/reducer'),
  }),
  loadDbReducer,
)
