const { dissoc } = require('ramda');
const updater = require('./');

describe('store:db:repositories/updater', () => {
  const unknownAction = updater({ type: 'UNKNOWN' });
  const makeRepositories = (full_name, commits = []) => ({
    [full_name]: {
      full_name,
      branches: {
        master: {
          name: 'master',
          commits,
        },
        develop: {
          name: 'develop',
          commits
        }
      },
    },
  })
  const initialState = {
    ...makeRepositories('barbe-ci', ['a1', 'a2', 'a3']),
    ...makeRepositories('redux-polyglot', ['b1', 'b2', 'b3']),
  }
  it('returns an empty object as default state', () => {
    expect(unknownAction(undefined)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(unknownAction(initialState)).toEqual(initialState);
  })
  describe('[REPOSITORY_NOT_FOUND] action', () => {
    test('remove repository if not found', () => {
      const notFound = (repositoryFullName) => updater({
        type: 'REPOSITORY_NOT_FOUND',
        payload: { repositoryFullName },
      })
      expect(notFound('barbe-ci')(initialState)).toEqual(
        dissoc('barbe-ci', initialState)
      )
    })
  });
  describe('[GIT_PUSH] action', () => {
    const gitPush = (repoFullName, change = {}) => updater({
      type: 'GIT_PUSH',
      payload: {
        push: { change },
        repository: { full_name: repoFullName },
      }
    })
    test('push on existing repo with no change does not update state', () => {
      expect(gitPush('barbe-ci')(initialState)).toEqual(initialState)
    });
    test('push a new repo', () => {
      expect(gitPush('new-repo')(initialState)).toEqual({
        ...initialState,
        'new-repo': {
          full_name: 'new-repo',
          branches: {},
        },
      })
    });
  });
  describe('[RELOAD_BRANCH] action', () => {
    const reloadBranch = (repositoryFullName, commits = []) => updater({
      type: 'RELOAD_BRANCH',
      payload: {
        repositoryFullName,
        branchName: 'master',
        resolvedBranch: { commits },
      },
    });
    test('reload branch on existing repository with no commits', () => {
      expect(reloadBranch('barbe-ci')(initialState)).toEqual(initialState)
    });
    test('reload branch on new repository with no commits', () => {
      expect(reloadBranch('new-repo')(initialState)).toEqual({
        ...initialState,
        'new-repo': {
          branches: { master: { commits: [] } },
        },
      })
    });
  });
})
