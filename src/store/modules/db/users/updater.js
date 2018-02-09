const { assoc } = require('ramda');
const { decorate, handleAction, withDefaultState } = require('redux-fp');

module.exports = decorate(
  withDefaultState({}),
  handleAction('USER_LOGIN'),
  action => assoc(action.payload.profile.username, action.payload)
)
