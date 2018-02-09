const { curry, assoc, has, over, indexBy, prop, pathOr, lensProp, compose, reduce } = require('ramda');
const { mergeRight } = require('ramda-adjunct');
const { decorate, withDefaultState, handleActions } = require('redux-fp');

const updateNonNull = curry((path, f, state) => {
  if (has(path, state)) {
    return over(lensProp(path), f, state);
  }
  return state;
})

module.exports = decorate(
  withDefaultState({}),
  handleActions({
    GIT_PUSH: compose(
      mergeRight,
      indexBy(prop('hash')),
      pathOr([], ['payload', 'push', 'change', 'commits']),
    ),
    RELOAD_BRANCH: compose(
      mergeRight,
      indexBy(prop('hash')),
      pathOr([], ['payload', 'resolvedBranch', 'commits']),
    ),
    HAVE_DETACHED_COMMITS: (action) => state => {
      return reduce((state, commitHash) => (
        updateNonNull(commitHash, assoc('detached', true), state)
      ), state, action.payload.commits);
    },
  })
)
