const _ = require('lodash/fp');
const { createSelector } = require('reselect');
const { reject, propEq, pipe, path, keys } = require('ramda');

const getCommits = pipe(
  path(['db', 'commits']),
  reject(propEq('detached', true)),
);

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
