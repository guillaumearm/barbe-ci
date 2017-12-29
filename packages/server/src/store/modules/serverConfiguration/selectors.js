const { equals, prop, compose } = require('ramda')

const getServerConfiguration = prop('serverConfiguration')
const getDbPath = compose(prop('DBPATH'), getServerConfiguration)
const getNodeEnv = compose(prop('NODE_ENV'), getServerConfiguration)
const getIsDebug = compose(equals('development'), getNodeEnv)

module.exports = {
  getServerConfiguration,
  getDbPath,
  getNodeEnv,
  getIsDebug,
}
