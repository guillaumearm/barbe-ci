const { both } = require('ramda');
const { pipeMiddlewares } = require('redux-fun');
const _ = require('lodash/fp');


const shouldCleanCommits = _.anyPass([
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

const setCommitsToClean = (store) => (next) => async (action) => {
  if (shouldCleanCommits(action)) {
    const nexted = await next(action);
    await store.cleanCommits();
    return nexted;
  }
  if (action.type === 'CLEAN_COMMITS') {
    const commitsToClean = store.getCommitsToClean();
    const nexted = await next(
      _.set('payload.commits', commitsToClean, action)
    )
    if (commitsToClean.length) {
      // eslint-disable-next-line no-console
      console.log(`Commits - ${commitsToClean.length} commits removed`);
    }
    return nexted;
  }
  return await next(action);
}

const commitsCleaner = () => (next) => async (action) => {
  return await next(action);
}

module.exports = pipeMiddlewares(
  setCommitsToClean,
  commitsCleaner,
)
