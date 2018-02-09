const { dissoc, map, objOf } = require('ramda');
const updater = require('./branches');

describe('store:db:repositories:branches/updater', () => {
  const unknownAction = { type: 'UNKNOWN' };
  const makeCommits = map(objOf('hash'))
  const makeBranch = (name, commits = []) => ({
    [name]: {
      name,
      commits,
    },
  })
  const initialState = {
    ...makeBranch('master', ['a1', 'a2', 'a3']),
    ...makeBranch('develop', ['b1', 'b2', 'b3']),
  }
  it('returns an empty object as default state', () => {
    expect(updater(unknownAction)(undefined)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(updater(unknownAction)(initialState)).toEqual(initialState);
  })
  describe('[RELOAD_BRANCH] action', () => {
    const reloadBranch = ({
      forced = false,
      notFound = false,
      branchName = 'master',
      commits = ['z1', 'z2', 'z3']
    } = {}) => updater({
      type: 'RELOAD_BRANCH',
      payload: {
        forced,
        notFound,
        branchName,
        resolvedBranch: {
          commits: makeCommits(commits),
        },
      },
    });
    test('remove branch if not found', () => {
      expect(reloadBranch({ branchName: 'develop', notFound: true })(initialState)).toEqual(dissoc('develop', initialState))
    });
    test('append new commits', () => {
      expect(reloadBranch({})(initialState)).toEqual({
        ...initialState,
        ...makeBranch('master', ['z1', 'z2', 'z3', 'a1', 'a2', 'a3']),
      });
    });
    test('reload all commits (forced)', () => {
      expect(reloadBranch({ forced: true })(initialState)).toEqual({
        ...initialState,
        ...makeBranch('master', ['z1', 'z2', 'z3']),
      });
    });
  });
  describe('[GIT_PUSH] action', () => {
    const gitPush = ({
      branchName = 'master',
      branchType = 'branch',
      closed = false,
      forced = false,
      targetHash = '',
      commits = ['z1', 'z2', 'z3'],
    } = {}) => updater({
      type: 'GIT_PUSH',
      payload: {
        push: {
          change: {
            commits: makeCommits(commits),
            new: { target: { hash: targetHash } },
            branchName,
            branchType,
            closed,
            forced,
          },
        }
      },
    });
    test('do not update the state when change is not a branch', () => {
      const config = { branchType: 'unknown' };
      expect(gitPush(config)(initialState)).toBe(initialState);
    });
    test('remove branch if closed', () => {
      const config = { closed: true };
      expect(gitPush(config)(initialState)).toEqual(dissoc('master', initialState));
    });
    test('create branch with commits', () => {
      const config = { branchName: 'example' };
      expect(gitPush(config)(initialState)).toEqual({
        ...initialState,
        ...makeBranch(config.branchName, ['z1', 'z2', 'z3']),
      })
    });
    test('append commits to an existing branch', () => {
      const config = {};
      expect(gitPush(config)(initialState)).toEqual({
        ...initialState,
        ...makeBranch('master', ['z1', 'z2', 'z3', 'a1', 'a2', 'a3']),
      })
    });
    test('replace commits to an existing branch when push force', () => {
      const config = { forced: true }
      expect(gitPush(config)(initialState)).toEqual({
        ...initialState,
        ...makeBranch('master', ['z1', 'z2', 'z3']),
      })
    });
    test('do not append commits when they are already loaded in state', () => {
      const config = { targetHash: 'a1' };
      expect(gitPush(config)(initialState)).toEqual(initialState)
    });
  });
})
