const { getUser, getUsers } = require('./selectors');

describe('db:users/selectors', () => {
  const userSample = { username: 'user1', sessionUuid: 'abcdef' };
  describe('getUsers', () => {
    it('returns an empty object when state is empty', () => {
      expect(getUsers({})).toEqual({});
    });
    const state = {
      db: {
        users: {
          user1: userSample,
        }
      }
    }
    it('returns users', () => {
      expect(getUsers(state)).toEqual({ user1: userSample});
    })
  });
  describe('getUser', () => {
    it('throws an error when no "name" or "sessionUuid" property', () => {
      expect(() => getUser({})).toThrow()
    })
    const state = {
      db: {
        users: {
          user1: userSample,
        }
      }
    }
    describe('by name', () => {
      test('user not found', () => {
        expect(getUser({}, { name: 'user1' })).toBe(undefined);
      })
      test('user found', () => {
        expect(getUser(state, { name: 'user1' })).toBe(userSample);
      })
    });
    describe('by sessionUuid', () => {
      test('user not found', () => {
        expect(getUser(state, { sessionUuid: 'unknown' })).toBe(undefined);
      })
      test('user found', () => {
        expect(getUser(state, { sessionUuid: 'abcdef' })).toBe(userSample);
      })
    });
  });
})
