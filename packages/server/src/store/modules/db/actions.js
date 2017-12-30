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

module.exports = {
  updateTokens,
  userLogin,
  userLogout,
  loadDb,
  bbGet,
  bbGetAll,
  bbReloadBranches,
  bbReloadRepositories,
  ...require('./repositories/actions'),
}
