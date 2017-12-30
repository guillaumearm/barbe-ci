const { identity, assoc } = require('ramda');
const { toReducer } = require('../../../utils')

const initialState = {}

module.exports = toReducer((action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      const user = action.payload;
      return assoc(user.profile.username, user);
    }
    default: {
      return identity;
    }
  }
}, initialState)
