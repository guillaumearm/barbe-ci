const updateTokens = (accessToken, refreshToken) => ({
  type: 'UPDATE_TOKENS',
  payload: { accessToken, refreshToken },
})

const userLogin = (user) => ({
  type: 'USER_LOGIN',
  payload: user,
})

const userLogout = (uuid) => ({
  type: 'USER_LOGOUT',
  payload: { uuid },
})

const loadDb = () => ({
  type: 'LOAD_DB',
  payload: {},
})

const bbGet = (endpoint, options = {}) => ({
  type: 'BITBUCKET_GET',
  payload: { request: { type: 'get', endpoint, options } },
})

const bbGetAll = (endpoint, options = {}) => ({
  type: 'BITBUCKET_GET',
  payload: { request: { type: 'getAll', endpoint, options } },
})

const bbReloadBranches = (repositoryFullName, branches) => ({
  type: 'BITBUCKET_RELOAD_BRANCHES',
  payload: { repositoryFullName, branches },
})

const bbReloadRepositories = (repositories) => ({
  type: 'BITBUCKET_RELOAD_REPOSITORIES',
  payload: { repositories },
})

const branchNotFound = (repositoryFullName, branchName) => ({
  type: 'BRANCH_NOT_FOUND',
  payload: { repositoryFullName, branchName },
})

const repositoryNotFound = (repositoryFullName) => ({
  type: 'REPOSITORY_NOT_FOUND',
  payload: { repositoryFullName },
})

module.exports = {
  updateTokens,
  userLogin,
  userLogout,
  loadDb,
  bbGet,
  bbGetAll,
  bbReloadBranches,
  bbReloadRepositories,
  branchNotFound,
  repositoryNotFound,
  ...require('./repositories/actions'),
}
