const passport = require('koa-passport')
const { v4 } = require('uuid');

const { getClientId, getClientSecret, getUser } = require('./store/selectors');

const registerAuth = (app) => {
  const store = app.context.store;
  const { getState } = store;
  passport.serializeUser(function(user, done) {
    done(null, user.sessionUuid)
  })

  passport.deserializeUser(function(sessionUuid, done) {
    const user = getUser(getState(), { sessionUuid });
    done(null, user || false);
  })

  const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy
  passport.use(new BitbucketStrategy({
      clientID: getClientId(getState()),
      clientSecret: getClientSecret(getState()),
    },
    function(accessToken, refreshToken, profile, done) {
      const user = { sessionUuid: v4(), accessToken, refreshToken, profile }
      store.userLogin(user)
      done(null, user);
    }
  ));
}

module.exports = registerAuth;
