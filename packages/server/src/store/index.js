const { map, compose } = require('ramda');
const { createStore, bindActionCreators, applyMiddleware } = require('redux');
const rootReducer = require('./reducer');
const actions = require('./actions');
const selectors = require('./selectors');

const bindSelectors = (selectors, getState) => (
  map(selector => (...args) => selector(getState(), ...args), selectors)
)

const middlewares = [
  require('./modules/db/middleware'),
  require('./modules/logs/middleware'),
]

const enhanceStore = createStore => (...args) => {
  const store = createStore(...args);
  return {
    ...store,
    ...bindActionCreators(actions, store.dispatch),
    ...bindSelectors(selectors, store.getState),
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
