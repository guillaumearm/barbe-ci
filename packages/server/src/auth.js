const passport = require('koa-passport')
const { v4 } = require('uuid');

const { getClientId, getClientSecret, getUser } = require('./store/selectors');
const { userLogin } = require('./store/actions')

const registerAuth = (app) => {
  const { dispatch, getState } = app.context.store;
  passport.serializeUser(function(user, done) {
    done(null, user.uuid)
  })

  passport.deserializeUser(function(uuid, done) {
    const user = getUser(getState(), { uuid });
    done(null, user || false);
  })

  const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy
  passport.use(new BitbucketStrategy({
      clientID: getClientId(getState()),
      clientSecret: getClientSecret(getState()),
    },
    function(accessToken, refreshToken, profile, done) {
      const user = { uuid: v4(), accessToken, refreshToken, profile }
      dispatch(userLogin(user))
      done(null, user);
    }
  ));
}

module.exports = registerAuth;
