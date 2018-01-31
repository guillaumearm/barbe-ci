const { assocPath } = require('ramda');
const requests = require('./utils/requests');

module.exports = (store) => (next) => async (action) => {
  if (action.type === 'BITBUCKET_GET') {
    const { endpoint, type = 'get' } = action.payload.request;
    const bbRequest = requests[type]
    const response = await bbRequest(store, endpoint);
    return await next(assocPath(['payload', 'response'], response, action))
  }
  return await next(action);
}
