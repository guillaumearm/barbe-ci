const { assocPath } = require('ramda')
const { getIsDebug } = require('../../selectors');

module.exports = ({ getState }) => next => async action => {
  const isDebug = getIsDebug(getState());
  if (action.type === 'LOAD_DB') {
    return await next(action);
  }
  return await next(assocPath(['meta', 'debug'], isDebug, action));
}
