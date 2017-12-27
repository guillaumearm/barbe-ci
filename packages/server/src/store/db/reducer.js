const { combineReducers } = require('redux')

const users = require('./users/reducer');
const ci = require('./ci/reducer');

module.exports = combineReducers({
  users,
  ci,
})
