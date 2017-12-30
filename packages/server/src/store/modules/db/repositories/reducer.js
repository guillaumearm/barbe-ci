const _ = require('lodash/fp');
const { merge, __, pipe, defaultTo, identity } = require('ramda');
const { toReducer } = require('redux-fun')
const branchesUpdater = require('./updaters/branches');

const repoUpdater = (action) => pipe(
  defaultTo({ branches: {} }),
  merge(__, action.payload.repository),
  _.update('branches', branchesUpdater(action))
);

module.exports = toReducer((action) => {
  if (action.type === 'GIT_PUSH') {
    const { repository } = action.payload;
    return _.update(repository.full_name, repoUpdater(action));
  }
  return identity;
}, {});
