const { path, concat } = require('ramda');
const rfp = require('redux-fp');
const { matchAction } = require('../../../utils/updaters');

const initialState = [];

module.exports = rfp.decorate(
  rfp.withDefaultState(initialState),
  rfp.concat(
    rfp.handleAction('CLEAN_LOGS', rfp.constantState(initialState)),
    matchAction(path(['meta', 'debug']), action => concat([action])),
  )
)
