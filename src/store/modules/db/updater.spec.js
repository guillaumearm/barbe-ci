const updater = require('./updater');

describe('store:db/updater', () => {
  const unknownAction = updater({ type: 'UNKNOWN' });
  const initialState = unknownAction(undefined);
  it('returns initial state', () => {
    expect(unknownAction(undefined)).toMatchSnapshot();
  });
  it('does not update state on unknown action', () => {
    expect(unknownAction(initialState)).toEqual(initialState);
  });
  describe('receive a [LOAD_DB] action', () => {
    const loadDb = (payload) => updater({ type: 'LOAD_DB', payload });
    it('does not update state when [LOAD_DB] action payload is empty', () => {
      expect(loadDb()(initialState)).toEqual(initialState);
      expect(loadDb({})(initialState)).toEqual(initialState);
    });
    it('loads db when receive a valid [LOAD_DB] action', () => {
      const newDb = { ...initialState, users: { user1: {} } }
      expect(loadDb({ db: newDb })(initialState)).toEqual(newDb);
    });
  });
});
