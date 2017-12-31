module.exports = require('redux-fun').pipeMiddlewares(
  require('./pushRequests'),
  require('./get'),
  require('./reloadBranches'),
  require('./reloadRepositories'),
)
