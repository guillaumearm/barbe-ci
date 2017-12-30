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
  payload: { request: { endpoint, options } },
})

module.exports = {
  updateTokens,
  userLogin,
  userLogout,
  loadDb,
  bbGet,
  ...require('./repositories/actions'),
}
