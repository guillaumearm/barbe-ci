const updater = require('./updater');

describe('store:db:builds/updater', () => {
  const makeCommit = (buildId, commit, status = 'pending') => ({
    buildId, commit, status, exitCode: null, output: null,
  });
  const unknownAction = updater({ type: 'UNKNOWN' });
  const createBuild = ({ buildId = 'z', commit = 'zzz' } = {}) => updater({
    type: 'CREATE_BUILD',
    payload: { buildId, commit },
  })
  const initialState = {
    entities: {
      a: makeCommit('a', 'aaa'),
      b: makeCommit('b', 'bbb'),
      c: makeCommit('c', 'ccc', 'stopped'),
    },
    queue: ['a', 'b'],
  }
  it('returns an empty object as default state', () => {
    expect(unknownAction(undefined)).toEqual({ entities: {}, queue: [] });
  })
  it('does not update state on unknown action', () => {
    expect(unknownAction(initialState)).toEqual(initialState);
  })
  describe('when receive [CREATE_BUILD] action', () => {
    it('creates and enqueues a new build', () => {
      expect(createBuild()(initialState)).toEqual({
        queue: [
          ...initialState.queue,
          'z',
        ],
        entities: {
          ...initialState.entities,
          z: makeCommit('z', 'zzz'),
        }
      })
    });
    it('replaces an existing build', () => {
      expect(createBuild({ buildId: 'c', commit: 'xxx' })(initialState)).toEqual({
        queue: [
          ...initialState.queue,
          'c',
        ],
        entities: {
          ...initialState.entities,
          c: makeCommit('c', 'xxx'),
        }
      })
    });
  });
})
