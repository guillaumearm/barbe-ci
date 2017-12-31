const _ = require('lodash/fp');
const {
  __, identity, always, when, prop, pipe,
  map, merge, reduce, concat, defaultTo,
} = require('ramda');

const branchUpdater = (action) => {
  if (action.type === 'GIT_PUSH') {
    const { change } = action.payload.push;
    return _.pipe(
      _.set('name', change.name),
      when(always(change.forced))(
        _.set('commits', [])
      ),
      _.update('commits', pipe(
        defaultTo([]),
        concat(
          map(prop('hash'))(change.commits)
        )
      ))
    );
  }
  return identity;
}

module.exports = (action) => (state = {}) => {
  if (action.type === 'GIT_PUSH') {
    const { change } = action.payload.push;
    if (change.type === 'branch') {
      if (change.closed) {
        return _.unset(change.name, state);
      }
      return _.update(change.name, branchUpdater(action), state);
    }
  }
  if (action.type === 'BITBUCKET_RELOAD_BRANCHES') {
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
