module.exports = require('redux-fun').pipeMiddlewares(
  require('./get'),
  require('./scheduler'),
  require('./commitsLoader'),
  require('./reloadBranches'),
  require('./reloadRepositories'),
)
