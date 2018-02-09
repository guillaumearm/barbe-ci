const { compose } = require('ramda');
const { createStore } = require('redux');
const { toReducer } = require('redux-fun');

const rootReducer = toReducer(require('./modules/updater'));

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
