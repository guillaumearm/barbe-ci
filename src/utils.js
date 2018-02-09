const { curry, view, over } = require('ramda');
const rfp = require('redux-fp');

const matchAction = (predicate, leftUpdater, rightUpdater) => (
  rfp.match((action) => () => predicate(action), leftUpdater, rightUpdater)
);

const overNonNil = curry((lens, f, state) => {
  if (view(lens, state)) {
    return over(lens, f, state);
  }
  return state;
})

module.exports = {
  overNonNil,
  matchAction,
}
