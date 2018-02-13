const { forEachObjIndexed: forEachObj } = require('ramda');
const selectors = require('./selectors');

describe('store/selectors', () => {
  forEachObj((selector, name) => {
    test(`store.${name}() should be a function`, () => {
      expect(typeof selector).toBe('function');
    });
  }, selectors)
});
