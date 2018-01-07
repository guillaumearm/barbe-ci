const _ = require('lodash/fp');
const { createSelector } = require('reselect');
const { path, keys } = require('ramda');

const getCommits = path(['db', 'commits']);

const getCommitsHashes = createSelector(
  getCommits,
  keys
)

const getCommit = createSelector(
  (state, { hash }) => hash,
  getCommits,
  _.get,
)

module.exports = {
  getCommit,
  getCommits,
  getCommitsHashes,
}
