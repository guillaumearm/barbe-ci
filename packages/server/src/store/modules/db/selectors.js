const { propOr } = require('ramda');

const getDb = propOr({}, 'db');

module.exports = {
  ...require('./ci/selectors'),
  ...require('./users/selectors'),
  ...require('./repositories/selectors'),
  getDb,
}
