const { prop } = require('ramda')

const getServerConfiguration = prop('serverConfiguration')

module.exports = {
  getServerConfiguration,
}
