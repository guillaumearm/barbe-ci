const { propOr } = require('ramda');

const tokens = require('./tokens/selectors');
const users = require('./users/selectors');
const repositories = require('./repositories/selectors');
const commits = require('./commits/selectors');

const db = {
  getDb: propOr({}, 'db'),
};

module.exports = {
  ...tokens,
  ...users,
  ...repositories,
  ...commits,
  ...db,
};
