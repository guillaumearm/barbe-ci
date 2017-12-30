const { compose } = require('ramda');
const { createStore, bindActionCreators, applyMiddleware } = require('redux');
const rootReducer = require('./reducer');
const actions = require('./actions');

const middlewares = [
  require('./modules/db/middleware'),
  require('./modules/logs/middleware'),
]

const enhanceStore = createStore => (...args) => {
  const store = createStore(...args);
  return {
    ...store,
    ...bindActionCreators(actions, store.dispatch),
  }
}

module.exports = (initialState) => (
  createStore(
    rootReducer,
    initialState,
    compose(
      enhanceStore,
      applyMiddleware(...middlewares),
    )
  )
);
