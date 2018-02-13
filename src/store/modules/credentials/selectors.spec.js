const { getCredentials, getClientId, getClientSecret } = require('./selectors');

describe('store:credentials/selectors', () => {
  const state = { credentials: { clientID: '[ID]', clientSecret: '[SECRET]' } }
  describe('getCredentials', () => {
    test('return credentials', () => {
      expect(getCredentials(state)).toBe(state.credentials);
    });
  });
  describe('getClientId', () => {
    test('return clientId', () => {
      expect(getClientId(state)).toBe(state.credentials.clienId);
    });
  });
  describe('getClientSecret', () => {
    test('return clientSecret', () => {
      expect(getClientSecret(state)).toBe(state.credentials.clientSecret);
    });
  });
});
