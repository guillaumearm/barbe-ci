const _ = require('lodash/fp');
const { map, pipe, prop, pathOr, values } = require('ramda');
const { createSelector } = require('reselect');

const getRepositories = pathOr({}, ['db', 'repositories']);

const getRepository = createSelector(
  (state, { repository }) => repository,
  getRepositories,
  _.get
)

const getRepositoriesNames = createSelector(
  getRepositories,
  pipe(
    values,
    map(prop('full_name'))
  )
)

const getBranches = createSelector(
  getRepository,
  prop('branches')
)

const getBranchesNames = createSelector(
  getBranches,
  pipe(
    values,
    map(prop('name')),
  ),
)

module.exports = {
  getRepositories,
  getRepository,
  getBranches,
  getBranchesNames,
  getRepositoriesNames,
}
