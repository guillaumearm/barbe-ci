const _ = require('lodash/fp');
const { createSelector } = require('reselect');
const { reject, propEq, pipe, path, keys } = require('ramda');

const getAllCommits = path(['db', 'commits']);

const getCommits = pipe(
  getAllCommits,
  reject(propEq('detached', true)),
);

const getAllCommitsHashes = createSelector(
  getAllCommits,
  keys
)

const getCommitsHashes = createSelector(
  getCommits,
  keys
)

const getCommit = createSelector(
  (state, { hash }) => hash,
  getAllCommits,
  _.get,
)

module.exports = {
  getAllCommits,
  getAllCommitsHashes,
  getCommit,
  getCommits,
  getCommitsHashes,
}
