const gitPush = (payload) => ({ type: 'GIT_PUSH', payload });

const branchNotFound = (repositoryFullName, branchName) => ({
  type: 'BRANCH_NOT_FOUND',
  payload: { repositoryFullName, branchName },
})

const repositoryNotFound = (repositoryFullName) => ({
  type: 'REPOSITORY_NOT_FOUND',
  payload: { repositoryFullName },
})

const reloadBranches = (repositoryFullName, branches) => ({
  type: 'RELOAD_BRANCHES',
  payload: { repositoryFullName, branches },
})

const reloadRepositories = (repositories) => ({
  type: 'RELOAD_REPOSITORIES',
  payload: { repositories },
})


module.exports = {
  gitPush,
  branchNotFound,
  repositoryNotFound,
  reloadBranches,
  reloadRepositories,
}
