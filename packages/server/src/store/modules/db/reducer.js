const { combineReducers } = require('redux')
const { composeReducers } = require('../../utils');

const loadDbReducer = (state, action) => {
  if (action.type === 'LOAD_DB') {
    return action.payload.db || state;
  }
  return state
};

module.exports = composeReducers(
  combineReducers({
    users: require('./users/reducer'),
    ci: require('./ci/reducer'),
    repositories: require('./repositories/reducer'),
  }),
  loadDbReducer,
)
