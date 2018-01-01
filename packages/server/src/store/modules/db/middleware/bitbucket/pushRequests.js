const _ = require('lodash/fp');
const { applyTo, pipe } = require('ramda');
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
  orderer,
  commitsLoader,
)
