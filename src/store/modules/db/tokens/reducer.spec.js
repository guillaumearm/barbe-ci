const reducer = require('./reducer');

describe('store:db:tokens/reducer', () => {
  const makeTokens = (accessToken, refreshToken) => ({ accessToken, refreshToken })
  const userLogin = (a, b) => ({
    type: 'USER_LOGIN',
    payload: makeTokens(a, b)
  });
  const updateTokens = (a, b) => ({
    type: 'UPDATE_TOKENS',
    payload: makeTokens(a, b),
  })
  const unknownAction = { type: 'UNKNOWN' };
  const initialState = makeTokens('a0', 'b0');
  it('returns an empty object as default state', () => {
    expect(reducer(undefined, unknownAction)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(reducer(initialState, unknownAction)).toEqual(initialState);
  })
  it('update tokens when receive a [USER_LOGIN] action', () => {
    expect(reducer(initialState, userLogin('a1', 'b1'))).toEqual(makeTokens('a1', 'b1'))
  })
  it('update tokens when receive a [UPDATE_TOKENS] action', () => {
    expect(reducer(initialState, updateTokens('a1', 'b1'))).toEqual(makeTokens('a1', 'b1'))
  })
})
