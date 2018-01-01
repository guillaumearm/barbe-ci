const _ = require('lodash/fp');
const {
  __, always, when, prop, pipe, find, not, compose,
  map, merge, reduce, concat, defaultTo, equals, identity,
} = require('ramda');

const commitNotFound = commit => compose(
  not,
  find(equals(commit)),
  prop('commits'),
)

const updateCommits = commits => _.update('commits', (
  concat(
    map(prop('hash'))(commits)
  )
))

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
  return identity;
}

module.exports = (action) => (state = {}) => {
  if (action.type === 'BRANCH_NOT_FOUND') {
    return _.unset(action.payload.branchName, state);
  }
  if (action.type === 'GIT_PUSH') {
    const { change } = action.payload.push;
    if (change.type === 'branch') {
      if (change.closed) {
        return _.unset(change.name, state);
      }
      return _.update(change.name, branchUpdater(action), state);
    }
  }
  if (action.type === 'RELOAD_BRANCHES') {
    return reduce((state, branch) => (
      _.update(
        branch.name,
        merge(__, { commits: branch.commits.map(prop('hash')) }),
        state,
      )
    ), state, action.payload.resolvedBranches)
  }
  return state;
}
