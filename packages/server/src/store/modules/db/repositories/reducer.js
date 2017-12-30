const _ = require('lodash/fp');
const { merge, __, pipe, defaultTo, identity } = require('ramda');
const { toReducer } = require('redux-fun')
const branchesUpdater = require('./updaters/branches');

const repoUpdater = (action) => {
  if (action.type === 'GIT_PUSH') {
    return pipe(
      defaultTo({ branches: {} }),
      merge(__, action.payload.repository),
      _.update('branches', branchesUpdater(action))
    )
  }
  if (action.type === 'BITBUCKET_RELOAD_BRANCHES') {
    return pipe(
      defaultTo({ branches: {} }),
      _.update('branches', branchesUpdater(action))
    )
  }
  return identity;
};

module.exports = toReducer((action) => {
  if (action.type === 'GIT_PUSH') {
    return _.update(action.payload.repository.full_name, repoUpdater(action));
  }
  if (action.type === 'BITBUCKET_RELOAD_BRANCHES') {
    return _.update(action.payload.repositoryFullName, repoUpdater(action))
  }
  return identity;
}, {});
