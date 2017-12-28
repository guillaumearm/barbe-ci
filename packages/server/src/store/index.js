const { createStore, applyMiddleware } = require('redux');
const middlewares = require('./middlewares');
const rootReducer = require('./reducer');

module.exports = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};
