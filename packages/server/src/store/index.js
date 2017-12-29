const { createStore, applyMiddleware } = require('redux');
const rootReducer = require('./reducer');

const middlewares = [
  require('./modules/db/middleware'),
  require('./modules/logs/middleware'),
]

module.exports = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};
