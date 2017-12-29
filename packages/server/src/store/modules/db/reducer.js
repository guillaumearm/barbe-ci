const { combineReducers } = require('redux')
const { composeReducers } = require('../../utils');

const log = require('./log/reducer');
const users = require('./users/reducer');
const ci = require('./ci/reducer');

module.exports = composeReducers(
  combineReducers({
    log,
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
