const { combineReducers } = require('redux')
const { composeReducers } = require('../../utils');

const logs = require('./logs/reducer');
const users = require('./users/reducer');
const ci = require('./ci/reducer');

module.exports = composeReducers(
  combineReducers({
    logs,
    users,
    ci,
  }),
  (state, action) => {
    if (action.type === 'LOAD_DB') {
      return action.payload.db || state;
    }
    return state
  },
)
