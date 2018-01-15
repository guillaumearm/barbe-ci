const { __, assoc, concat, identity } = require('ramda');
const { withDefaultState, combine } = require('redux-fp');

const createNewBuild = (commit, buildId) => ({
  commit,
  buildId,
  status: 'pending',
  exitCode: null,
  output: null,
});

const entities = withDefaultState({}, action => {
  if (action.type === 'CREATE_BUILD') {
    const { commit, buildId } = action.payload;
    return assoc(buildId, createNewBuild(commit, buildId));
  }
  return identity;
})

const queue = withDefaultState([], action => {
  if (action.type === 'CREATE_BUILD') {
    return concat(__, [action.payload.buildId]);
  }
  return identity;
})

module.exports = combine({
  entities,
  queue,
})
