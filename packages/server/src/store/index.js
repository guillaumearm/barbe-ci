const { compose } = require('ramda');
const { createStore } = require('redux');
const rootReducer = require('./modules/reducer');

module.exports = (initialState) => (
  createStore(
    rootReducer,
    initialState,
    compose(
      require('./enhancer')(
        require('./modules/actions'),
        require('./modules/selectors'),
        require('./modules/middlewares'),
      ),
    )
  )
);
