const { merge, __, pipe, compose, dissoc } = require('ramda');
const { dotPath } = require('ramda-extension');
const { withDefaultState, decorate, handleActions } = require('redux-fp')
const branchesUpdater = require('./branches');

const { overProp, overPath } = require('../../../../../utils/fp');

module.exports = decorate(
  withDefaultState({}),
  handleActions({
    REPOSITORY_NOT_FOUND: compose(
      dissoc,
      dotPath('payload.repositoryFullName'),
    ),
    GIT_PUSH: action => (
      overProp(action.payload.repository.full_name, pipe(
        merge(__, action.payload.repository),
        overProp('branches', branchesUpdater(action))
      ))
    ),
    RELOAD_BRANCH: (action) => (
      overPath([action.payload.repositoryFullName, 'branches'], (
        branchesUpdater(action)
      ))
    )
  }),
)
