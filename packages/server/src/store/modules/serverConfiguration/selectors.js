const { prop, compose } = require('ramda')

const getServerConfiguration = prop('serverConfiguration')
const getDbPath = compose(prop('DBPATH'), getServerConfiguration)

module.exports = {
  getServerConfiguration,
  getDbPath,
}
