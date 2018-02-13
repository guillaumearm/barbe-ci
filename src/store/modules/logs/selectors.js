const { propOr } = require('ramda');

module.exports = {
  getLogs: propOr([], 'logs'),
}
