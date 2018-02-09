const reducer = require('./reducer');

describe('store/reducer', () => {
  const unknownAction = { type: 'UNKNOWN' };
  const initialState = {
    ...reducer(undefined, unknownAction),
    credentials: { token: 'abcdef' },
    serverConfiguration: { VERBOSE: true },
  };
  it('returns initial state', () => {
    expect(reducer(undefined, unknownAction)).toMatchSnapshot();
  });
  it('does not update state on unknown action', () => {
    expect(reducer(initialState, unknownAction)).toBe(initialState);
  });
});
