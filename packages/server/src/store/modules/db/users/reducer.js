const { identity, assoc } = require('ramda');
const { withDefaultState, toReducer } = require('redux-fun')

const initialState = {}

module.exports = toReducer(withDefaultState(initialState, (action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      const user = action.payload;
      return assoc(user.profile.username, user);
    }
    default: {
      return identity;
    }
  }
}))
