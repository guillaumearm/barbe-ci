const reducer = require('./reducer');

describe('logs/reducer', () => {
  const unknownAction = { type: 'UNKNOWN' };
  const createDebugAction = (type) => ({
    type,
    payload: {},
    meta: { debug: true, }
  })
  const cleanLogs = () => ({ type: 'CLEAN_LOGS' })
  const action1 = createDebugAction('ACTION_1')
  const initialState = [action1];
  it('returns an empty array as default state', () => {
    expect(reducer(undefined, unknownAction)).toEqual([]);
  });
  it('does not update state on unknown action', () => {
    expect(reducer(initialState, unknownAction)).toBe(initialState);
  });
  it('logs action when meta.debug is true', () => {
    const action2 = createDebugAction('ACTION_2');
    expect(reducer(initialState, action2)).toEqual([
      action2,
      action1,
    ])
  })
  it('clean logs when receive a [CLEAN_LOGS] action', () => {
    expect(reducer(initialState, cleanLogs())).toEqual([]);
  });
});
