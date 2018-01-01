const _ = require('lodash/fp');
const { applyTo, pipe } = require('ramda');
const { pipeMiddlewares, preserveAsyncFlow } = require('redux-fun');

const commitsLoader = (store) => (next) => async (action) => {
  if (action.type === 'GIT_PUSH') {
    const change = action.payload.push.change;
    if (change.truncated) {
      const result = await store.bbGetAll(change.links.commits.href);
      const commits = result.payload.response;
      const newChange = applyTo(change)(pipe(
        _.set('commits', commits),
        _.set('truncated', false),
      ))
      return await next(_.set('payload.push.change', newChange, action));
    }
    return await next(action);
  }
  return await next(action);
}

module.exports = pipeMiddlewares(
  preserveAsyncFlow('GIT_PUSH'),
  preserveAsyncFlow('RELOAD_BRANCH'),
  commitsLoader,
)
