const { dissoc } = require('ramda');
const reducer = require('./reducer');

describe('store:db:repositories/reducer', () => {
  const unknownAction = { type: 'UNKNOWN' };
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
    expect(reducer(undefined, unknownAction)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(reducer(initialState, unknownAction)).toEqual(initialState);
  })
  describe('[REPOSITORY_NOT_FOUND] action', () => {
    test('remove repository if not found', () => {
      const notFound = (repositoryFullName) => ({ type: 'REPOSITORY_NOT_FOUND', payload: { repositoryFullName } })
      expect(reducer(initialState, notFound('barbe-ci'))).toEqual(
        dissoc('barbe-ci', initialState)
      )
    })
  });
  describe('[GIT_PUSH] action', () => {
    const gitPush = (repoFullName, change = {}) => ({
      type: 'GIT_PUSH',
      payload: {
        push: { change },
        repository: { full_name: repoFullName },
      }
    })
    test('push on existing repo with no change does not update state', () => {
      expect(reducer(initialState, gitPush('barbe-ci'))).toEqual(initialState)
    });
    test('push a new repo', () => {
      expect(reducer(initialState, gitPush('new-repo'))).toEqual({
        ...initialState,
        'new-repo': {
          full_name: 'new-repo',
          branches: {},
        },
      })
    });
  });
  describe('[RELOAD_BRANCH] action', () => {
    const reloadBranch = (repositoryFullName, commits = []) => ({
      type: 'RELOAD_BRANCH',
      payload: {
        repositoryFullName,
        branchName: 'master',
        resolvedBranch: { commits },
      },
    });
    test('reload branch on existing repository with no commits', () => {
      expect(reducer(initialState, reloadBranch('barbe-ci'))).toEqual(initialState)
    });
    test('reload branch on new repository with no commits', () => {
      expect(reducer(initialState, reloadBranch('new-repo'))).toEqual({
        ...initialState,
        'new-repo': {
          branches: { master: { commits: [] } },
        },
      })
    });
  });
})
