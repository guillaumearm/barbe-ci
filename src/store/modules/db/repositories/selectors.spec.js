const { pipe, map, indexBy, prop, defaultTo } = require('ramda');
const {
  getRepositories,
  getRepository,
  getRepositoriesNames,
  getBranches,
  getBranchesNames,
  getBranch,
  getBranchCommits,
  getBranchLastCommit,
  getAllBranchesCommits,
} = require('./selectors');

describe('store:db:repositories/selectors', () => {
  describe('when state is empty', () => {
    const state = {};
    test('getRepositories', () => {
      expect(getRepositories(state)).toEqual({});
    });
    test('getRepository', () => {
      expect(getRepository(state)).toEqual(undefined);
      expect(getRepository(state, { repositoryFullName: '' })).toEqual(undefined);
    });
    test('getRepositoriesNames', () => {
      expect(getRepositoriesNames(state)).toEqual([]);
    });
    test('getBranches', () => {
      expect(getBranches(state)).toEqual([]);
      expect(getBranches(state, { repositoryFullName: '' })).toEqual([]);
    });
    test('getBranchesNames', () => {
      expect(getBranchesNames(state)).toEqual([]);
      expect(getBranchesNames(state, { repositoryFullName: '' })).toEqual([]);
    });
    test('getBranch', () => {
      expect(getBranch(state)).toBe(undefined);
      expect(getBranch(state, { repositoryFullName: '', branchName: '' })).toBe(undefined);
    });
    test('getBranchCommits', () => {
      expect(getBranchCommits(state)).toEqual([]);
      expect(getBranchCommits(state, { repositoryFullName: '', branchName: '' })).toEqual([]);
    });
    test('getBranchLastCommit', () => {
      expect(getBranchLastCommit(state)).toEqual(undefined);
      expect(getBranchLastCommit(state, { repositoryFullName: '', branchName: '' })).toEqual(undefined);
    });
    test('getAllbranchesCommits', () => {
      expect(getAllBranchesCommits(state)).toEqual([]);
    });
  });

  describe('when state have repositories, branches and commits', () => {
    const makeRepositories = pipe(
      defaultTo(['barbeci']),
      map((full_name) => ({
        full_name,
        branches: {
          master: {
            name: 'master',
            commits: [`${full_name}#aaa`, `${full_name}#bbb`, `${full_name}#ccc`],
          },
          develop: {
            name: 'develop',
            commits: [`${full_name}#ddd`, `${full_name}#eee`, `${full_name}#fff`],
          },
          [`branch-${full_name}`]: {
            name: `branch-${full_name}`,
            commits: [`${full_name}#ggg`, `${full_name}#hhh`, `${full_name}#iii`],
          },
        },
      })),
      indexBy(prop('full_name')),
    );
    const repositories = makeRepositories(['repo1', 'repo2', 'repo3']);
    const state = { db: { repositories } };

    test('getRepositories', () => {
      expect(getRepositories(state)).toBe(repositories);
    });
    test('getRepository', () => {
      expect(getRepository(state, { repositoryFullName: 'repo1' })).toBe(repositories.repo1);
      expect(getRepository(state, { repositoryFullName: 'repo2' })).toBe(repositories.repo2);
      expect(getRepository(state, { repositoryFullName: 'repo3' })).toBe(repositories.repo3);
    });
    test('getRepositoriesNames', () => {
      expect(getRepositoriesNames(state)).toEqual(['repo1', 'repo2', 'repo3']);
    });
    test('getBranches', () => {
      expect(getBranches(state, { repositoryFullName: 'repo1' })).toBe(repositories.repo1.branches);
      expect(getBranches(state, { repositoryFullName: 'repo2' })).toBe(repositories.repo2.branches);
      expect(getBranches(state, { repositoryFullName: 'repo3' })).toBe(repositories.repo3.branches);
      expect(getBranches(state, { repositoryFullName: '???' })).toEqual([]);
    });
    test('getBranchesNames', () => {
      expect(getBranchesNames(state, { repositoryFullName: 'repo1' })).toEqual(['master', 'develop', 'branch-repo1']);
      expect(getBranchesNames(state, { repositoryFullName: 'repo2' })).toEqual(['master', 'develop', 'branch-repo2']);
      expect(getBranchesNames(state, { repositoryFullName: 'repo3' })).toEqual(['master', 'develop', 'branch-repo3']);
      expect(getBranchesNames(state, { repositoryFullName: '???' })).toEqual([]);
    });
    test('getBranch', () => {
      expect(getBranch(state, { repositoryFullName: 'repo1', branchName: 'master' })).toBe(repositories.repo1.branches.master);
      expect(getBranch(state, { repositoryFullName: 'repo2', branchName: 'develop' })).toBe(repositories.repo2.branches.develop);
      expect(getBranch(state, { repositoryFullName: 'repo3', branchName: 'branch-repo3' })).toBe(repositories.repo3.branches['branch-repo3']);
      expect(getBranch(state, { repositoryFullName: 'repo1', branchName: '???' })).toBe(undefined);
      expect(getBranch(state, { repositoryFullName: '???', branchName: 'master' })).toBe(undefined);
    });
    test('getBranchCommits', () => {
      expect(getBranchCommits(state, { repositoryFullName: 'repo1', branchName: 'master' })).toBe(repositories.repo1.branches.master.commits)
      expect(getBranchCommits(state, { repositoryFullName: 'repo2', branchName: 'develop' })).toBe(repositories.repo2.branches.develop.commits)
      expect(getBranchCommits(state, { repositoryFullName: 'repo3', branchName: 'branch-repo3' })).toBe(repositories.repo3.branches['branch-repo3'].commits)
      expect(getBranchCommits(state, { repositoryFullName: 'repo1', branchName: '???' })).toEqual([]);
      expect(getBranchCommits(state, { repositoryFullName: '???', branchName: 'master' })).toEqual([]);
    });
    test('getBranchLastCommit', () => {
      expect(getBranchLastCommit(state, { repositoryFullName: 'repo1', branchName: 'master' })).toBe(repositories.repo1.branches.master.commits[0])
      expect(getBranchLastCommit(state, { repositoryFullName: 'repo2', branchName: 'develop' })).toBe(repositories.repo2.branches.develop.commits[0])
      expect(getBranchLastCommit(state, { repositoryFullName: 'repo3', branchName: 'branch-repo3' })).toBe(repositories.repo3.branches['branch-repo3'].commits[0])
      expect(getBranchLastCommit(state, { repositoryFullName: 'repo1', branchName: '???' })).toBe(undefined);
      expect(getBranchLastCommit(state, { repositoryFullName: '???', branchName: 'master' })).toBe(undefined);
    });
    test('getAllBranchesCommits', () => {
      expect(getAllBranchesCommits).toMatchSnapshot();
    });
  });
});
