const passport = require('koa-passport')
const { v4 } = require('uuid');

const { getClientId, getClientSecret } = require('./store/selectors');
const { userLogin } = require('./store/actions')

const registerAuth = (app) => {
  const { dispatch, getState } = app.context.store;
  passport.serializeUser(function(uuid, done) {
    done(null, uuid)
  })

  passport.deserializeUser(function(uuid, done) {
    done(null, uuid || false);
  })

  const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy
  passport.use(new BitbucketStrategy({
      clientID: getClientId(getState()),
      clientSecret: getClientSecret(getState()),
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(() => {
        const user = { uuid: v4(), accessToken, refreshToken, profile }
        dispatch(userLogin(user))
        done(null, user);
      })
    }
  ));
}

module.exports = registerAuth;
