const { path, concat } = require('ramda');
const rfp = require('redux-fp');

const matchAction = (predicate, leftUpdater, rightUpdater) => (
  rfp.match((action) => () => predicate(action), leftUpdater, rightUpdater)
);

const initialState = [];

module.exports = rfp.decorate(
  rfp.withDefaultState(initialState),
  rfp.concat(
    rfp.handleAction('CLEAN_LOGS', rfp.constantState(initialState)),
    matchAction(path(['meta', 'debug']), action => concat([action])),
  )
)
