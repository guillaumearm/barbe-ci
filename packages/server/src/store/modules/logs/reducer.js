const { path } = require('ramda');

const initialState = [];

module.exports = (state = initialState, action) => {
  if (action.type === 'CLEAN_LOGS') {
    return initialState;
  }
  if (path(['meta', 'debug'], action)) {
    return [action, ...state]
  }
  return state
}
