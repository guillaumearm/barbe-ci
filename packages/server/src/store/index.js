const { identity } = require('ramda');
const { createStore } = require('redux');
const rootReducer = require('./rootReducer');

module.exports = (initialState) => {
  return createStore(rootReducer, initialState, identity);
};
