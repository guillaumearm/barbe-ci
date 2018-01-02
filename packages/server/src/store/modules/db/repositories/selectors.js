const _ = require('lodash/fp');
const { map, pipe, prop, path, pathOr, values } = require('ramda');
const { createSelector } = require('reselect');

const getRepositories = pathOr({}, ['db', 'repositories']);

const getRepository = createSelector(
  (state, { repositoryFullName }) => repositoryFullName,
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

const getBranch = createSelector(
  getRepository,
  (state, { branchName }) => branchName,
  (repository, branchName) => path(['branches', branchName], repository)
)

const getCommits = createSelector(
  getBranch,
  prop('commits'),
)

const getLastCommit = createSelector(
  getCommits,
  prop(0),
)

module.exports = {
  getRepositories,
  getRepository,
  getCommits,
  getLastCommit,
  getBranch,
  getBranches,
  getBranchesNames,
  getRepositoriesNames,
}
