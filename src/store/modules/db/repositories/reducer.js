const _ = require('lodash/fp');
const { merge, __, pipe, identity } = require('ramda');
const { withDefaultState, toReducer } = require('redux-fun')
const branchesUpdater = require('./updaters/branches');

const repoUpdater = (action) => {
  if (action.type === 'GIT_PUSH') {
    return pipe(
      merge(__, action.payload.repository),
      _.update('branches', branchesUpdater(action))
    )
  }
  return _.update('branches', branchesUpdater(action));
};

module.exports = toReducer(withDefaultState({}, (action) => {
  if (action.type === 'REPOSITORY_NOT_FOUND') {
    return _.unset(action.payload.repositoryFullName);
  }
  if (action.type === 'GIT_PUSH') {
    return _.update(action.payload.repository.full_name, repoUpdater(action));
  }
  if (action.type === 'RELOAD_BRANCH') {
    return _.update(action.payload.repositoryFullName, repoUpdater(action))
  }
  return identity;
}));
