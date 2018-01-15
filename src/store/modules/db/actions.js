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

const bbGet = (endpoint) => ({
  type: 'BITBUCKET_GET',
  payload: { request: { type: 'get', endpoint } },
})

const bbGetAll = (endpoint) => ({
  type: 'BITBUCKET_GET',
  payload: { request: { type: 'getAll', endpoint } },
})

module.exports = {
  updateTokens,
  userLogin,
  userLogout,
  loadDb,
  bbGet,
  bbGetAll,
  ...require('./repositories/actions'),
  ...require('./commits/actions'),
  ...require('./builds/actions')
}
