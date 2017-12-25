const passport = require('koa-passport')

let store = {
  users: {},
}

const registerAuth = (app) => {
  const {
    BITBUCKET_CLIENT_ID,
    BITBUCKET_CLIENT_SECRET,
  } = app.context.credentials;
  passport.serializeUser(function(user, done) {
    const { accessToken, refreshToken } = user;
    const uuid = accessToken + refreshToken;
    store.users[uuid] = user;
    done(null, uuid)
  })

  passport.deserializeUser(function(uuid, done) {
    const user = store.users[uuid];
    done(null, user || false);
  })

  const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy
  passport.use(new BitbucketStrategy({
      clientID: BITBUCKET_CLIENT_ID,
      clientSecret: BITBUCKET_CLIENT_SECRET,
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(() => {
        done(null, { accessToken, refreshToken, profile });
      })
    }
  ));
}

module.exports = registerAuth;
