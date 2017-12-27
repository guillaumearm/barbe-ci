const { defaultTo } = require('ramda');
const { combineReducers } = require('redux');

const db = require('./modules/db/reducer');

module.exports = combineReducers({
  db,
  credentials: defaultTo({}),
  serverConfiguration: defaultTo({}),
});
