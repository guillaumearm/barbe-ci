const { defaultTo } = require('ramda');
const { combineReducers } = require('redux');

const db = require('./db/reducer');
const logs = require('./logs/reducer');

module.exports = combineReducers({
  logs,
  db,
  credentials: defaultTo({}),
  serverConfiguration: defaultTo({}),
});
