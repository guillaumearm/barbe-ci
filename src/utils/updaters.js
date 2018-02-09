const rfp = require('redux-fp');

const matchAction = (predicate, leftUpdater, rightUpdater) => (
  rfp.match((action) => () => predicate(action), leftUpdater, rightUpdater)
);

module.exports = {
  matchAction,
};
