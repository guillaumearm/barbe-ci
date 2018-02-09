const updater = require('./updater');

describe('store:db:users/updater', () => {
  const makeUser = (username) => ({ profile: { username } })
  const userLogin = (username) => updater({
    type: 'USER_LOGIN',
    payload: makeUser(username)
  });
  const unknownAction = updater({ type: 'UNKNOWN' });
  const user1 = { profile: { username: 'user1', additionalInfos: true } };
  const initialState = {
    user1,
  }
  it('returns an empty object as default state', () => {
    expect(unknownAction(undefined)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(unknownAction(initialState)).toEqual(initialState);
  })
  it('adds users on [USER_LOGIN]', () => {
    expect(userLogin('user2')(initialState)).toEqual({
      user1,
      user2: makeUser('user2'),
    })
  })
  it('replace an user on [USER_LOGIN]', () => {
    expect(userLogin('user1')(initialState)).toEqual({
      user1: makeUser('user1'),
    })
  })
})
