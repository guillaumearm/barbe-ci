const { identity, always, path, concat } = require('ramda');
const { withDefaultState, toReducer } = require('redux-fun')

const initialState = [];

module.exports = toReducer(withDefaultState(initialState, (action) => {
  if (action.type === 'CLEAN_LOGS') {
    return always(initialState);
  }
  if (path(['meta', 'debug'], action)) {
    return concat([action])
  }
  return identity;
}))
