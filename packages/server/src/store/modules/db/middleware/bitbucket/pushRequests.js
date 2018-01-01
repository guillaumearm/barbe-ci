const lodash = require('lodash');
const _ = require('lodash/fp');
const { applyTo, pipe } = require('ramda');
const { pipeMiddlewares } = require('redux-fun');

const scheduler = () => (next) => {
  const queues = {};
  return async (action) => {
    if (action.type === 'GIT_PUSH') {
      const { repository, push } = action.payload;
      const branchPath = [repository.full_name, 'branches', push.change.name];
      const pushingPath = [...branchPath, 'pushing'];
      const actionsQueuePath = [...branchPath, 'actionsQueue']

      const getPushing = () => _.get(pushingPath, queues)
      const setPushing = (v) => lodash.set(queues, pushingPath, v);
      const pushActionsQueue = (x) => {
        lodash.update(queues, actionsQueuePath, _.pipe(
          _.defaultTo([]),
          _.concat(_, x))
        )
      }
      const popActionQueue = () => {
        const firstAction = _.get([...actionsQueuePath, 0], queues)
        lodash.update(queues, actionsQueuePath, _.drop(1))
        return firstAction;
      }

      if (getPushing()) {
        await new Promise(resolve => {
          pushActionsQueue({ resume: () => resolve() })
        })
        return await next(action);
      }
      setPushing(true)
      const nexted = await next(action);
      setPushing(false)
      const nextAction = popActionQueue();
      if (nextAction) {
        nextAction.resume();
      } else {
        lodash.unset(queues, branchPath);
      }
      return nexted
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
  scheduler,
  commitsLoader,
)
