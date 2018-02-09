const updater = require('./updater');

describe('store:logs/updater', () => {
  const unknownAction = updater({ type: 'UNKNOWN' });
  const cleanLogs = updater({ type: 'CLEAN_LOGS' })
  const createDebugAction = (type) => ({
    type,
    payload: {},
    meta: { debug: true, }
  })
  const action1 = createDebugAction('ACTION_1')
  const initialState = [action1];
  it('returns an empty array as default state', () => {
    expect(unknownAction(undefined)).toEqual([]);
  });
  it('does not update state on unknown action', () => {
    expect(unknownAction(initialState)).toBe(initialState);
  });
  it('logs action when meta.debug is true', () => {
    const action2 = createDebugAction('ACTION_2');
    expect(updater(action2)(initialState)).toEqual([
      action2,
      action1,
    ])
  })
  it('clean logs when receive a [CLEAN_LOGS] action', () => {
    expect(cleanLogs(initialState)).toEqual([]);
  });
});
