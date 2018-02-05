const reducer = require('./reducer');

describe('store:db:users/reducer', () => {
  const makeUser = (username) => ({ profile: { username } })
  const userLogin = (username) => ({
    type: 'USER_LOGIN',
    payload: makeUser(username)
  });
  const unknownAction = { type: 'UNKNOWN' };
  const user1 = { profile: { username: 'user1', additionalInfos: true } };
  const initialState = {
    user1,
  }
  it('returns an empty object as default state', () => {
    expect(reducer(undefined, unknownAction)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(reducer(initialState, unknownAction)).toEqual(initialState);
  })
  it('adds users on [USER_LOGIN]', () => {
    expect(reducer(initialState, userLogin('user2'))).toEqual({
      user1,
      user2: makeUser('user2'),
    })
  })
  it('replace an user on [USER_LOGIN]', () => {
    expect(reducer(initialState, userLogin('user1'))).toEqual({
      user1: makeUser('user1'),
    })
  })
})
