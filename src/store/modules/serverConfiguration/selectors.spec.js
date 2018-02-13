const {
  getServerConfiguration,
  getDbPath,
  getNodeEnv,
  getIsProduction,
  getIsDevelopment,
  getIsDebug,
} = require('./selectors');

describe('store:credentials/selectors', () => {
  const makeState = ({ NODE_ENV = 'production' } = {}) => ({
    serverConfiguration: {
      DBPATH: 'DBPATH',
      NODE_ENV,
    }
  });
  describe('getServerConfiguration', () => {
    test('return serverConfiguration', () => {
      const state = makeState();
      expect(getServerConfiguration(state)).toBe(state.serverConfiguration);
    });
  });
  describe('getDbPath', () => {
    test('return DBPATH', () => {
      const state = makeState();
      expect(getDbPath(state)).toBe(state.serverConfiguration.DBPATH);
    });
  });
  describe('getNodeEnv', () => {
    test('return NODE_ENV', () => {
      const state = makeState();
      expect(getNodeEnv(state)).toBe(state.serverConfiguration.NODE_ENV);
    });
  });
  describe('getIsProduction', () => {
    test('return true in production', () => {
      const state = makeState({ NODE_ENV: 'production' });
      expect(getIsProduction(state)).toBe(true);
    });
    test('return false in development', () => {
      const state = makeState({ NODE_ENV: 'development' });
      expect(getIsProduction(state)).toBe(false);
    });
  });
  describe('getIsDevelopment', () => {
    test('return true in development', () => {
      const state = makeState({ NODE_ENV: 'development' });
      expect(getIsDevelopment(state)).toBe(true);
    });
    test('return false in production', () => {
      const state = makeState({ NODE_ENV: 'production' });
      expect(getIsDevelopment(state)).toBe(false);
    });
  });
  describe('getIsDebug', () => {
    test('return true in development', () => {
      const state = makeState({ NODE_ENV: 'development' });
      expect(getIsDebug(state)).toBe(true);
    });
    test('return false in production', () => {
      const state = makeState({ NODE_ENV: 'production' });
      expect(getIsDebug(state)).toBe(false);
    });
  });
});
