const _ = require('lodash/fp');
const { toReducer } = require('redux-fun');

const getIndexedCommits = path => _.compose(_.indexBy('hash'), _.getOr([], path))

module.exports = toReducer((action) => {
  if (action.type === 'GIT_PUSH') {
    const commits = getIndexedCommits('payload.push.change.commits')(action);
    return _.merge(_, commits);
  }
  if (action.type === 'RELOAD_BRANCH') {
    const commits = getIndexedCommits('payload.resolvedBranch.commits')(action);
    return _.merge(_, commits);
  }
  return _.identity;
}, {})
