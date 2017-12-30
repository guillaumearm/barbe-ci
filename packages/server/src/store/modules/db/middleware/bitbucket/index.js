module.exports = require('redux-fun').pipeMiddlewares(
  require('./get'),
  require('./reloadBranches'),
  require('./reloadRepositories'),
)
