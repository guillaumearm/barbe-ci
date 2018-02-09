const { pipe, assoc } = require('ramda');
const { withDefaultState, decorate, handleActions } = require('redux-fp');

const updateTokens = (action) => pipe(
  assoc('accessToken', action.payload.accessToken),
  assoc('refreshToken', action.payload.refreshToken),
)

module.exports = decorate(
  withDefaultState({}),
  handleActions({
    USER_LOGIN: updateTokens,
    UPDATE_TOKENS: updateTokens,
  })
)
