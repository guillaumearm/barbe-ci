const { equals, prop, compose } = require('ramda')

const getServerConfiguration = prop('serverConfiguration')
const getDbPath = compose(prop('DBPATH'), getServerConfiguration)
const getNodeEnv = compose(prop('NODE_ENV'), getServerConfiguration)
const getIsDevelopment = compose(equals('development'), getNodeEnv)
const getIsProduction = compose(equals('production'), getNodeEnv)
const getIsDebug = getIsDevelopment;

module.exports = {
  getServerConfiguration,
  getDbPath,
  getNodeEnv,
  getIsDebug,
  getIsDevelopment,
  getIsProduction,
}
