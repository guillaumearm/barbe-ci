const { curry, view, over, lensPath, lensProp, lensIndex } = require('ramda');

const overNonNil = curry((lens, f, state) => {
  if (view(lens, state)) {
    return over(lens, f, state);
  }
  return state;
})

const overProp = curry((key, f, state) => (
  over(lensProp(key), f, state)
))

const overPath = curry((key, f, state) => (
  over(lensPath(key), f, state)
))

const overIndex = curry((key, f, state) => (
  over(lensIndex(key), f, state)
))

module.exports = {
  overNonNil,
  overProp,
  overPath,
  overIndex,
}
