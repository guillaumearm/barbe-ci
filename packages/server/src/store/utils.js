const { reverse } = require('ramda');

const pipeReducers = (reducer, ...restReducers) => (state, action) => {
  if (typeof reducer !== 'function') {
    throw new Error('pipeReducers - a reducer must be a function')
  }
  if (restReducers.length === 0) {
    return reducer(state, action);
  }
  return pipeReducers(...restReducers)(reducer(state, action), action)
}

const composeReducers = (...reducers) => pipeReducers(...reverse(reducers))

const simpleComposeMiddlewares = (m1, m2) => store => next => (
  m2(store)(m1(store)(next))
);

const pipeMiddlewares = (...middlewares) => {
  const [m1, m2, ...rest] = middlewares;
  if (!m1) {
    throw new Error('pipeMiddlewares should have at least one middleware in argument');
  }
  if (!m2) {
    return m1;
  }
  return pipeMiddlewares(simpleComposeMiddlewares(m2, m1), ...rest);
};

module.exports = {
  pipeMiddlewares,
  pipeReducers,
  composeReducers,
}
