const { getDb } = require('./selectors');

describe('store:db/selectors', () => {
  describe('getDb', () => {
    test('when state is empty', () => {
      const state = {};
      expect(getDb(state)).toEqual({});
    });
    test('when state have db', () => {
      const state = { db: {} };
      expect(getDb(state)).toBe(state.db);
    });
  });
});
