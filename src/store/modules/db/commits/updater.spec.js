const updater = require('./updater');

describe('store:db:commits/updater', () => {
  const makeCommit = hash => ({ hash, lol: true })
  const makeCommits = (hashes = []) => hashes.map(makeCommit)
  const gitPush = (commits) => updater({
    type: 'GIT_PUSH',
    payload: { push: { change: { commits: makeCommits(commits) } } },
  });
  const reloadBranch = (commits) => updater({
    type: 'RELOAD_BRANCH',
    payload: { resolvedBranch: { commits: makeCommits(commits) } },
  });
  const haveDetachedCommits = (commits) => updater({
    type: 'HAVE_DETACHED_COMMITS',
    payload: { commits },
  });
  const unknownAction = updater({ type: 'UNKNOWN' });
  const initialState = {
    a1: { hash: 'a1', meta: true },
    a2: { hash: 'a2', meta: true },
    a3: { hash: 'a3', meta: true },
  }
  it('returns an empty object as default state', () => {
    expect(unknownAction(undefined)).toEqual({});
  })
  it('does not update state on unknown action', () => {
    expect(unknownAction(initialState)).toEqual(initialState);
  })
  it('merges pushed commits when received a [GIT_PUSH] action', () => {
    expect(gitPush(['a1', 'b1', 'c1'])(initialState)).toEqual({
      ...initialState,
      a1: makeCommit('a1'),
      b1: makeCommit('b1'),
      c1: makeCommit('c1'),
    })
  });
  it('merges resolved commits when received a [RELOAD_BRANCH] action', () => {
    expect(reloadBranch(['a1', 'b1', 'c1'])(initialState)).toEqual({
      ...initialState,
      a1: makeCommit('a1'),
      b1: makeCommit('b1'),
      c1: makeCommit('c1'),
    })
  });
  it('set detached to true when receive a [HAVE_DETACHED_COMMITS] action', () => {
    expect(haveDetachedCommits(['a1', 'a2'])(initialState)).toEqual({
      ...initialState,
      a1: { ...initialState.a1, detached: true },
      a2: { ...initialState.a2, detached: true },
    })
  });
  it('does not set detached to true on unknown commits ([HAVE_DETACHED_COMMITS])', () => {
    expect(haveDetachedCommits(['unknown'])(initialState)).toEqual(initialState)
  });
})
