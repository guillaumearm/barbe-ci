const { pipe, assoc, applyTo } = require('ramda');

const updateTokens = (state, action) => applyTo(state)(pipe(
  assoc('accessToken', action.payload.accessToken),
  assoc('refreshToken', action.payload.refreshToken),
))

module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      const nextState = updateTokens(state, action);
      return nextState
    }
    case 'UPDATE_TOKENS': {
      return updateTokens(state, action);
    }
    default: {
      return state;
    }
  }
}
