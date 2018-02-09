const { curry, assoc, defaultTo, view, over, indexBy, prop, lensProp, compose, reduce } = require('ramda');
const { dotPath } = require('ramda-extension');
const { mergeRight } = require('ramda-adjunct');
const { decorate, withDefaultState, handleActions } = require('redux-fp');

const overNonNil = curry((lens, f, state) => {
  if (view(lens, state)) {
    return over(lens, f, state);
  }
  return state;
})

module.exports = decorate(
  withDefaultState({}),
  handleActions({
    GIT_PUSH: compose(
      mergeRight,
      indexBy(prop('hash')),
      defaultTo([]),
      dotPath('payload.push.change.commits'),
    ),
    RELOAD_BRANCH: compose(
      mergeRight,
      indexBy(prop('hash')),
      defaultTo([]),
      dotPath('payload.resolvedBranch.commits'),
    ),
    HAVE_DETACHED_COMMITS: (action) => state => {
      return reduce((state, commitHash) => (
        overNonNil(lensProp(commitHash), assoc('detached', true), state)
      ), state, action.payload.commits);
    },
  })
)
