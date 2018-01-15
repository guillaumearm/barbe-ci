const _ = require('lodash/fp')
const { pipeMiddlewares } = require('redux-fun');
const { v4 } = require('uuid');

const generateBuildId = action => _.set('payload.buildId', v4(), action)

const buildIdGenerator = () => (next) => async (action) => {
  if (action.type === 'CREATE_BUILD') {
    return await next(generateBuildId(action))
  }
  return await next(action);
}

const buildCreator = () => (next) => async (action) => {
  return await next(action);
}

const buildRunner = () => (next) => async (action) => {
  return await next(action);
}

module.exports = pipeMiddlewares(
  buildIdGenerator,
  buildCreator,
  buildRunner,
)
