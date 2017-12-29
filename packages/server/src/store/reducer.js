const { defaultTo } = require('ramda');
const { combineReducers } = require('redux');

const db = require('./modules/db/reducer');
const logs = require('./modules/logs/reducer');

module.exports = combineReducers({
  logs,
  db,
  credentials: defaultTo({}),
  serverConfiguration: defaultTo({}),
});
