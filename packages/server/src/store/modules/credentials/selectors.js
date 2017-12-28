const { prop, compose } = require('ramda')

const getCredentials = prop('credentials');
const getClientId = compose(prop('clientId'), getCredentials)
const getClientSecret = compose(prop('clientSecret'), getCredentials)

module.exports = {
  getCredentials,
  getClientId,
  getClientSecret,
}
