const _ = require('lodash/fp');
const {
  map, prop, when, always, either, filter, merge,
  reduce, concat, pipe, defaultTo, identity, __,
} = require('ramda');

const branchUpdater = (action) => {
  if (action.type === 'GIT_PUSH/createChange') {
    return _.pipe(
      _.set('name', action.payload.new.name),
      when(always(action.payload.forced))(
        _.set('commits', [])
      ),
      _.update('commits', pipe(
        defaultTo([]),
        concat(
          map(prop('hash'))(action.payload.commits)
        )
      ))
    );
  }
  return identity;
}

const createChange = (change) => ({
  type: 'GIT_PUSH/createChange',
  payload: change,
})

const getBranchesChanges = _.pipe(
  _.get('push.changes'),
  filter(either(
    _.propEq('new.type', 'branch'),
    _.propEq('old.type', 'branch'),
  ))
)

module.exports = (action) => (state = {}) => {
  if (action.type === 'GIT_PUSH') {
    return reduce((state, change) => {
      if (change.closed) {
        return _.unset(change.old.name, state)
      }

      return _.update(change.new.name, branchUpdater(createChange(change)), state);
    }, state, getBranchesChanges(action.payload));
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
