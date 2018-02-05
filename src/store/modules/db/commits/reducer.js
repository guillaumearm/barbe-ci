const { merge, __, reduce } = require('ramda');
const _ = require('lodash/fp');
const { withDefaultState, toReducer } = require('redux-fun');

const getIndexedCommits = path => _.compose(_.indexBy('hash'), _.getOr([], path));

const updateNonNull = _.curry((path, f, state) => {
  if (_.has(path, state)) {
    return _.update(path,f, state)
  }
  return state;
})

module.exports = toReducer(withDefaultState({}, (action) => {
  if (action.type === 'GIT_PUSH') {
    const commits = getIndexedCommits('payload.push.change.commits')(action);
    return merge(__, commits);
  }
  if (action.type === 'RELOAD_BRANCH') {
    const commits = getIndexedCommits('payload.resolvedBranch.commits')(action);
    return merge(__, commits);
  }
  if (action.type === 'HAVE_DETACHED_COMMITS') {
    const { commits } = action.payload;
    return state => reduce((state, commitHash) => (
      updateNonNull(commitHash, _.set('detached', true), state)
    ), state, commits);
  }
  return _.identity;
}));
