const gitPush = (payload) => ({ type: 'GIT_PUSH', payload });

const branchNotFound = (repositoryFullName, branchName) => ({
  type: 'BRANCH_NOT_FOUND',
  payload: { repositoryFullName, branchName },
})

const repositoryNotFound = (repositoryFullName) => ({
  type: 'REPOSITORY_NOT_FOUND',
  payload: { repositoryFullName },
})

const reloadBranch = (repositoryFullName, branchName) => ({
  type: 'RELOAD_BRANCH',
  payload: { repositoryFullName, branchName },
})

const reloadBranches = (repositoryFullName, branchesNames) => ({
  type: 'RELOAD_BRANCHES',
  payload: { repositoryFullName, branchesNames },
})

const reloadRepositories = (repositories) => ({
  type: 'RELOAD_REPOSITORIES',
  payload: { repositories },
})


module.exports = {
  gitPush,
  branchNotFound,
  repositoryNotFound,
  reloadBranch,
  reloadBranches,
  reloadRepositories,
}
