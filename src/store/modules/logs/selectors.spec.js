const { getLogs } = require('./selectors');

describe('db:logs/selectors', () => {
  describe('getLogs', () => {
    test('return an empty array when there are no logs', () => {
      const state = {};
      expect(getLogs(state)).toEqual([]);
    })
    test('return logs', () => {
      const state = { logs: [] };
      expect(getLogs(state)).toBe(state.logs)
    });
  });
});
