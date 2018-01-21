const { path, prop, compose } = require('ramda')

const getTokens = path(['db', 'tokens']);
const getAccessToken = compose(prop('accessToken'), getTokens)
const getRefreshToken = compose(prop('refreshToken'), getTokens)

module.exports = {
  getTokens,
  getAccessToken,
  getRefreshToken,
}
