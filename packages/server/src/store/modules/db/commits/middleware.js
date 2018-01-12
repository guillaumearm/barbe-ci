const { both } = require('ramda');
const { pipeMiddlewares } = require('redux-fun');
const _ = require('lodash/fp');

const findDetachedCommits = _.anyPass([
  _.propEq('type', 'SEARCH_FOR_DETACHED_COMMITS'),
  _.propEq('type', 'REPOSITORY_NOT_FOUND'),
  both(
    _.propEq('type', 'RELOAD_BRANCH'),
    _.propEq('payload.notFound', true),
  ),
  both(
    _.propEq('type', 'RELOAD_BRANCH'),
    _.propEq('payload.forced', true),
  ),
  both(
    _.propEq('type', 'GIT_PUSH'),
    _.propEq('payload.push.change.forced', true)
  ),
  both(
    _.propEq('type', 'GIT_PUSH'),
    _.propEq('payload.push.change.closed', true)
  ),
]);

const setDetachedCommits = (store) => (next) => async (action) => {
  if (findDetachedCommits(action)) {
    const nexted = await next(action);
    const detachedCommits = store.getDetachedCommits();
    if (detachedCommits.length) {
      // eslint-disable-next-line no-console
      console.log(`Found ${detachedCommits.length} detached commits`);
      await store.haveDetachedCommits(detachedCommits);
    }
    return nexted;
  }
  return await next(action);
}

module.exports = pipeMiddlewares(
  setDetachedCommits,
)
