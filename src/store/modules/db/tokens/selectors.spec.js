const {
  getTokens,
  getAccessToken,
  getRefreshToken,
} = require('./selectors');

describe('db:tokens/selectors', () => {
  describe('when state is empty', () => {
    const state = {};
    test('getTokens', () => {
      expect(getTokens(state)).toBe(undefined);
    });
    test('getAccessToken', () => {
      expect(getAccessToken(state)).toBe(undefined);
    });
    test('getRefreshToken', () => {
      expect(getRefreshToken(state)).toBe(undefined);
    })
  });
  describe('when state have tokens', () => {
    const tokens = { accessToken: 'access', refreshToken: 'refresh' };
    const state = { db: { tokens } };
    test('getTokens', () => {
      expect(getTokens(state)).toBe(tokens);
    });
    test('getAccessToken', () => {
      expect(getAccessToken(state)).toBe(tokens.accessToken)
    });
    test('getRefreshToken', () => {
      expect(getRefreshToken(state)).toBe(tokens.refreshToken)
    });
  });
});
