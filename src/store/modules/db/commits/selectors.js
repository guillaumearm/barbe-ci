const _ = require('lodash/fp');
const { createSelector } = require('reselect');
const { reject, propEq, pipe, pathOr, keys } = require('ramda');

const getAllCommits = pathOr({}, ['db', 'commits']);

const getAllCommitsHashes = createSelector(
  getAllCommits,
  keys
)

const getCommits = pipe(
  getAllCommits,
  reject(propEq('detached', true)),
);

const getCommitsHashes = createSelector(
  getCommits,
  keys
)

const getCommit = createSelector(
  (state, { hash } = {}) => hash,
  getAllCommits,
  _.get,
)

module.exports = {
  getAllCommits,
  getAllCommitsHashes,
  getCommits,
  getCommitsHashes,
  getCommit,
}
