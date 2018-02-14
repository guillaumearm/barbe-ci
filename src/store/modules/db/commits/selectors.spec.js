const {
  getAllCommits,
  getAllCommitsHashes,
  getCommits,
  getCommitsHashes,
  getCommit,
} = require('./selectors')

describe('store:db:commits/selectors', () => {
  describe('when state is empty', () => {
    const state = {}
    test('getAllCommits', () => {
      expect(getAllCommits(state)).toEqual({})
    });
    test('getAllCommitsHashes', () => {
      expect(getAllCommitsHashes(state)).toEqual([])
    });
    test('getCommits', () => {
      expect(getCommits(state)).toEqual({})
    });
    test('getCommitsHashes', () => {
      expect(getCommitsHashes(state)).toEqual([])
    });
    test('getCommit', () => {
      expect(getCommit(state)).toBe(undefined);
      expect(getCommit(state, { hash: 'abcdef' })).toBe(undefined);
    })
  });

  describe('when state is filled', () => {
    const detachedCommits = {
      abcdef: { detached: true },
      a: { detached: true },
      b: { detached: true },
      c: { detached: true },
    }
    const commits = {
      d: {},
      e: {},
      f: {},
    }
    const state = {
      db: {
        commits: {
          ...detachedCommits,
          ...commits,
        },
      },
    }
    test('getAllCommits', () => {
      expect(getAllCommits(state)).toBe(state.db.commits)
    });
    test('getAllCommitsHashes', () => {
      expect(getAllCommitsHashes(state)).toEqual(['abcdef', 'a', 'b', 'c', 'd', 'e', 'f'])
    });
    test('getCommits', () => {
      expect(getCommits(state)).toEqual(commits)
    })
    test('getCommitsHashes', () => {
      expect(getCommitsHashes(state)).toEqual(['d', 'e', 'f'])
    });
    describe('getCommit', () => {
      test('return undefined when hash is unknown', () => {
        expect(getCommit(state)).toBe(undefined);
        expect(getCommit(state, { hash: 'unknown' })).toBe(undefined);
      });
      test('return commit', () => {
        expect(getCommit(state, { hash: 'd' })).toBe(commits.d);
      });
      test('return detached commit', () => {
        expect(getCommit(state, { hash: 'abcdef' })).toBe(detachedCommits.abcdef);
      });
    });
  });
});
