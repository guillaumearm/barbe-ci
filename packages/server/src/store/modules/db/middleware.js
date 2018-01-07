module.exports = require('redux-fun').pipeMiddlewares(
  require('./middlewares/bitbucket'),
  require('./middlewares/persist'),
)
