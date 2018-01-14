const { pipeMiddlewares, preserveAsyncSeries } = require('redux-fun');

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

module.exports = pipeMiddlewares(
  gitPushRetainer,
  preserveAsyncSeries('GIT_PUSH'),
  preserveAsyncSeries('RELOAD_BRANCH'),
  preserveAsyncSeries('RELOAD_REPOSITORIES'),
)
