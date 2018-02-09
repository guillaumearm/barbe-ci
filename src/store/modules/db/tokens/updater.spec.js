const updater = require('./updater');

describe('store:db:tokens/updater', () => {
  const makeTokens = (accessToken, refreshToken) => ({ accessToken, refreshToken })
  const userLogin = (a, b) => updater({
    type: 'USER_LOGIN',
    payload: makeTokens(a, b)
  });
  const updateTokens = (a, b) => updater({
    type: 'UPDATE_TOKENS',
    payload: makeTokens(a, b),
  })
  const unknownAction = updater({ type: 'UNKNOWN' });
  const initialState = makeTokens('a0', 'b0');
  it('returns an empty object as default state', () => {
    expect(unknownAction(undefined)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(unknownAction(initialState)).toEqual(initialState);
  })
  it('update tokens when receive a [USER_LOGIN] action', () => {
    expect(userLogin('a1', 'b1')(initialState)).toEqual(makeTokens('a1', 'b1'))
  })
  it('update tokens when receive a [UPDATE_TOKENS] action', () => {
    expect(updateTokens('a1', 'b1')(initialState)).toEqual(makeTokens('a1', 'b1'))
  })
})
