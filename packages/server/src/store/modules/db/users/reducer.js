const { assoc } = require('ramda');

module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      const user = action.payload;
      return assoc(user.profile.username, user, state);
    }
    default: {
      return state;
    }
  }
}
