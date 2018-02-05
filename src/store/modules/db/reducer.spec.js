const reducer = require('./reducer');

describe('store:db/reducer', () => {
  const unknownAction = { type: 'UNKNOWN' };
  const initialState = reducer(undefined, unknownAction);
  it('returns initial state', () => {
    expect(reducer(undefined, unknownAction)).toMatchSnapshot();
  });
  it('does not update state on unknown action', () => {
    expect(reducer(initialState, unknownAction)).toBe(initialState);
  });
  it('does not update state when [LOAD_DB] action payload is empty', () => {
    expect(reducer(initialState, { type: 'LOAD_DB' })).toBe(initialState);
    expect(reducer(initialState, { type: 'LOAD_DB', payload: {} })).toBe(initialState);
  });
  test('load db when receive a valid [LOAD_DB] action', () => {
    const newDb = { ...initialState, users: { user1: {} } }
    const loadDb = (db) => ({ type: 'LOAD_DB', payload: { db } });
    expect(reducer(initialState, loadDb(newDb))).toEqual(newDb);
  });
});
