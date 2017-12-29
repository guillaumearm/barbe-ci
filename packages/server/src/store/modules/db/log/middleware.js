const { assocPath } = require('ramda')
const { getIsDebug } = require('../selectors');

module.exports = ({ getState }) => next => action => {
  const isDebug = getIsDebug(getState());
  if (action.type === 'LOAD_DB') {
    return next(action);
  }
  return next(assocPath(['meta', 'debug'], isDebug, action));
}
