const { compose, prop } = require('ramda')

const getCredentials = prop('credentials');
const getAccessToken = compose(prop('accessToken'), getCredentials);
const getRefreshToken = compose(prop('refreshToken'), getCredentials);
const getClientId = compose(prop('BITBUCKET_CLIENT_ID'), getCredentials);
const getClientSecret = compose(prop('BITBUCKET_CLIENT_SECRET'), getCredentials);

module.exports = {
  getCredentials,
  getAccessToken,
  getRefreshToken,
  getClientId,
  getClientSecret,
}
