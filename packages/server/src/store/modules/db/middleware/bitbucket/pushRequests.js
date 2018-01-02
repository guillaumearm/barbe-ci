const _ = require('lodash/fp');
const { applyTo, pipe } = require('ramda');
const { pipeMiddlewares, preserveAsyncFlow } = require('redux-fun');

const gitPushRetainer = () => (next) => {
  let reloadingBranches = 0;
  let reloadingRepositories = 0;
  const queue = [];
  const flushQueue = () => {
    while (!reloadingBranches && !reloadingRepositories && queue.length > 0) {
      queue.shift().resume();
    }
  };
  return async (action) => {
    if (action.type === 'RELOAD_REPOSITORIES') {
      reloadingRepositories++;
      const nexted = await next(action);
      reloadingRepositories--;
      flushQueue();
      return nexted
    }
    if (action.type === 'RELOAD_BRANCH') {
      reloadingBranches++;
      const nexted = await next(action);
      reloadingBranches--;
      flushQueue();
      return nexted
    }
    if (action.type === 'GIT_PUSH') {
      if (reloadingBranches > 0 || reloadingRepositories > 0) {
        await new Promise(resolve => {
          queue.push({ resume: resolve })
        });
        return await next(action);
      }
    }
    return await next(action)
  }
}

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
  gitPushRetainer,
  preserveAsyncFlow('GIT_PUSH'),
  preserveAsyncFlow('RELOAD_BRANCH'),
  preserveAsyncFlow('RELOAD_REPOSITORIES'),
  commitsLoader,
)
