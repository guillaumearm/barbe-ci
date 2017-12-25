/* eslint-disable no-console */
const passport = require('koa-passport');
const createRouter = require('koa-router');
const api = require('../api');
const bb = require('../utils/bitbucket');

const router = createRouter();
router.post('/api', api);

/* ### AUTH ### */

router.get(
  '/auth/bitbucket/callback',
  passport.authenticate('bitbucket', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  })
)

router.get(
  '/auth',
  async ctx => {
    ctx.body = 'OK'
    if (ctx.isAuthenticated()) {
      return ctx.redirect('/auth/success');
    } else {
      return passport.authenticate('bitbucket')(ctx)
    }
  },
)

router.get(
  '/auth/logout',
  async (ctx) => {
    ctx.logout()
    ctx.type = 'html';
    ctx.body = 'DISCONNECTED - <a href="/auth">Click here to connect</a>'
  }
)

router.get('/auth/success',
  async (ctx) => {
    ctx.type = 'html'
    if (ctx.isAuthenticated()) {
      try {
        const response = await bb.get(ctx, '2.0/repositories/trapcodien/sdp');
        console.log(response.data.description);
        ctx.body = 'OK - <a href="/auth/logout">Click here to disconnect</a>'
      } catch (e) {
        console.warn(e.message, ':', e.response.data);
        ctx.redirect('/auth/logout')
      }
    } else {
      ctx.body = 'NOT CONNECTED - <a href="/auth">Click here to connect</a>'
    }
  },
)

router.get('/auth/failure', (ctx) => {
  ctx.body = 'login failure'
})

module.exports = router;
