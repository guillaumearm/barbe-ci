const { createSelector } = require('reselect');
const { propOr, difference } = require('ramda');

const ci = require('./ci/selectors');
const users = require('./users/selectors');
const repositories = require('./repositories/selectors');
const commits = require('./commits/selectors');

const db = {
  getDb: propOr({}, 'db'),
  getCommitsToClean: createSelector(
    commits.getCommitsHashes,
    repositories.getAllBranchesCommits,
    (commits, branchesCommits) => difference(commits, branchesCommits),
  ),
};

module.exports = {
  ...ci,
  ...users,
  ...repositories,
  ...commits,
  ...db,
};
