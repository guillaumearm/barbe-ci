const { compose } = require('ramda');
const { createStore } = require('redux');
const rootReducer = require('./reducer');

module.exports = (initialState) => (
  createStore(
    rootReducer,
    initialState,
    compose(
      require('./enhancer')(
        require('./actions'),
        require('./selectors'),
        require('./middlewares'),
      ),
    )
  )
);
