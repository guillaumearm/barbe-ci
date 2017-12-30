const { identity, always, path, concat } = require('ramda');
const { toReducer } = require('../../utils')

const initialState = [];

module.exports = toReducer((action) => {
  if (action.type === 'CLEAN_LOGS') {
    return always(initialState);
  }
  if (path(['meta', 'debug'], action)) {
    return concat([action])
  }
  return identity;
}, initialState)
