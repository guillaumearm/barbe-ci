const { both, always, propEq } = require('ramda');
const { hasPath } = require('ramda-adjunct');
const { decorate, concat, combine } = require('redux-fp');

const { matchAction } = require('../../../utils/updaters')

const loadDbUpdater = decorate(
  matchAction(
    both(
      propEq('type', 'LOAD_DB'),
      hasPath(['payload', 'db']),
    )
  ),
  action => always(action.payload.db)
)

module.exports = concat(
  loadDbUpdater,
  combine({
    users: require('./users/updater'),
    tokens: require('./tokens/updater'),
    repositories: require('./repositories/updater'),
    commits: require('./commits/updater'),
  }),
)
