const { path, prop, compose } = require('ramda')

const getCi = path(['db', 'ci']);
const getCiAccessToken = compose(prop('accessToken'), getCi)
const getCiRefreshToken = compose(prop('refreshToken'), getCi)

module.exports = {
  getCi,
  getCiAccessToken,
  getCiRefreshToken,
}
