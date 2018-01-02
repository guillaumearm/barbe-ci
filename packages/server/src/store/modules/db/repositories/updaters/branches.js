const { withDefaultState } = require('redux-fun');
const _ = require('lodash/fp');
const {
  always, when, prop, pipe, find, not, compose,
  map, concat, defaultTo, equals, identity,
} = require('ramda');

const commitNotFound = commit => compose(
  not,
  find(equals(commit)),
  prop('commits'),
)

const getHashes = map(prop('hash'))

const updateCommits = commits => _.update('commits', (
  concat(getHashes(commits))
))

const replaceCommits = commits => _.set('commits', getHashes(commits))

const branchUpdater = (action) => {
  if (action.type === 'GIT_PUSH') {
    const { change } = action.payload.push;
    return pipe(
      _.set('name', change.name),
      _.update('commits', defaultTo([])),
      when(always(change.forced))(
        _.set('commits', [])
      ),
      when(commitNotFound(change.new.target.hash))(
        updateCommits(change.commits)
      ),
    );
  }
  if (action.type === 'RELOAD_BRANCH' && action.payload.resolvedBranch) {
    const { commits } = action.payload.resolvedBranch
    if (action.payload.forced) {
      return replaceCommits(commits);
    }
    return updateCommits(commits);
  }
  return identity;
}

module.exports = withDefaultState({}, (action) => {
  if (action.type === 'GIT_PUSH') {
    const { change } = action.payload.push;
    if (change.type === 'branch') {
      if (change.closed) {
        return _.unset(change.name);
      }
      return _.update(change.name, branchUpdater(action));
    }
  }
  if (action.type === 'RELOAD_BRANCH') {
    if (action.payload.notFound) {
      return _.unset(action.payload.branchName);
    }
    return _.update(action.payload.branchName, branchUpdater(action))
  }
  return identity;
})
