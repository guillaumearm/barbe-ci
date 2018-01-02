module.exports = require('redux-fun').pipeMiddlewares(
  require('./get'),
  require('./scheduler'),
  require('./commitsLoader'),
  require('./branchResolver'),
  require('./reloadBranches'),
  require('./reloadRepositories'),
)
