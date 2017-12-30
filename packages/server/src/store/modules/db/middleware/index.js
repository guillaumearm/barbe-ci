const { pipeMiddlewares } = require('../../../utils');

module.exports = pipeMiddlewares(
  require('./bitbucket'),
  require('./persist'),
)
