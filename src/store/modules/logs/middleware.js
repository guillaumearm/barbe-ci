const { assocPath } = require('ramda')

module.exports = (store) => next => async action => {
  const isDebug = store.getIsDebug();
  if (action.type === 'LOAD_DB') {
    return await next(action);
  }
  return await next(assocPath(['meta', 'debug'], isDebug, action));
}
