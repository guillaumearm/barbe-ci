const { pipeMiddlewares } = require('redux-fun');
const _ = require('lodash/fp');

const setCommitsToClean = (store) => (next) => async (action) => {
  if (action.type === 'CLEAN_COMMITS') {
    const commitsToClean = store.getCommitsToClean();
    const nexted = await next(
      _.set('payload.commits', commitsToClean, action)
    )
    // eslint-disable-next-line no-console
    console.log(`Commits - ${commitsToClean.length} commits removed`);
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
