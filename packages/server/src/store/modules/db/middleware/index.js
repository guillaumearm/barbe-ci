const { pipeMiddlewares } = require('redux-fun');

module.exports = pipeMiddlewares(
  require('./bitbucket'),
  require('./persist'),
)
