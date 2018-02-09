const updater = require('./updater');

describe('store/updater', () => {
  const unknownAction = updater({ type: 'UNKNOWN' });
  const initialState = {
    ...unknownAction(undefined),
    credentials: { token: 'abcdef' },
    serverConfiguration: { VERBOSE: true },
  };
  it('returns initial state', () => {
    expect(unknownAction(undefined)).toMatchSnapshot();
  });
  it('does not update state on unknown action', () => {
    expect(unknownAction(initialState)).toEqual(initialState);
  });
});
