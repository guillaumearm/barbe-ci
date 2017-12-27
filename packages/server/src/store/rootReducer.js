const { defaultTo } = require('ramda');
const { combineReducers } = require('redux');

const credentials = require('./credentials/reducer')

module.exports = combineReducers({
  serverConfiguration: defaultTo({}),
  credentials,
});
