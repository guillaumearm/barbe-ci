const { reverse, compose } = require('ramda');
const { bindActionCreators } = require('redux');
const { bindSelectors } = require('redux-fun');

module.exports = (actions = {}, selectors = {}, middlewares = []) => {
  return createStore => (...args) => {
    const store = createStore(...args)
    const { getState, dispatch: originalDispatch } = store
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    const builtDispatch = (...args) => dispatch(...args)
    let chain = []

    const newStore = {
      ...store,
      ...bindActionCreators(actions, builtDispatch),
      ...bindSelectors(selectors, getState),
      dispatch: builtDispatch,

    }
    chain = reverse(middlewares).map(middleware => middleware(newStore))
    dispatch = compose(...chain)(originalDispatch)

    return {
      ...newStore,
      dispatch,
    }
  }
}
