const reducer = require('./reducer');

describe('db:users/reducer', () => {
  const userLogin = (username) => ({
    type: 'USER_LOGIN',
    payload: {
      profile: { username }
    },
  });
  const unknownAction = { type: 'UNKNOWN' };
  const initialState = {
    user1: { profile: { username: 'user1', additionalInfos: true } },
  }
  it('returns an empty object as default state', () => {
    expect(reducer(undefined, unknownAction)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(reducer(initialState, unknownAction)).toEqual(initialState);
  })
  it('adds users on [USER_LOGIN]', () => {
    expect(reducer(initialState, userLogin('user2'))).toEqual({
      user1: { profile: { username: 'user1', additionalInfos: true } },
      user2: { profile: { username: 'user2' } },
    })
  })
  it('replace an user on [USER_LOGIN]', () => {
    expect(reducer(initialState, userLogin('user1'))).toEqual({
      user1: { profile: { username: 'user1' } },
    })
  })
})
