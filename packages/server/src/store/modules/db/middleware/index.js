module.exports = require('redux-fun').pipeMiddlewares(
  require('./bitbucket'),
  require('./persist'),
)
