const _ = require('lodash/fp');
const { pipeMiddlewares } = require('redux-fun');

const orderer = (store) => (next) => {
  let pushing = false;
  const actionsQueue = [];
  return async (action) => {
    if (action.type === 'GIT_PUSH') {
      if (pushing) {
        actionsQueue.push(action);
      } else {
        pushing = true;
        const nexted = await next(action);
        pushing = false;
        const nextAction = actionsQueue.shift()
        if (nextAction) {
          store.dispatch(nextAction);
        }
        return nexted
      }
    }
    return await next(action);
  }
}

const commitsLoader = (store) => (next) => async (action) => {
  if (action.type === 'GIT_PUSH') {
    const newChanges = [];
    for (let change of action.payload.push.changes) {
      if (change.truncated) {
        const result = await store.bbGetAll(change.links.commits.href);
        const commits = result.payload.response;
        newChanges.push(_.set('commits', commits, change))
      } else {
        newChanges.push(change)
      }
    }
    return await next(_.set('payload.push.changes', newChanges, action));
  }
  return await next(action);
}

module.exports = pipeMiddlewares(
  orderer,
  commitsLoader,
)
