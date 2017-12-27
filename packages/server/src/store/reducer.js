const { defaultTo } = require('ramda');
const { combineReducers } = require('redux');

const db = require('./db/reducer');

module.exports = combineReducers({
  db,
  credentials: defaultTo({}),
  serverConfiguration: defaultTo({}),
});
