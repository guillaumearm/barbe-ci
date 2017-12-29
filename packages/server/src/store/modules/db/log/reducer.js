const { path } = require('ramda');

module.exports = (state = [], action) => {
  if (path(['meta', 'debug'], action)) {
    return [action, ...state]
  }
  return state
}
