const passport = require('koa-passport');
const createRouter = require('koa-router');
const api = require('../api');
const bb = require('../utils/bitbucket');

const router = createRouter();
router.post('/api', api);

/* ### AUTH ### */

router.get('/auth/bitbucket/callback',
  passport.authenticate('bitbucket', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  })
)

router.get('/auth', async ctx => {
  ctx.body = 'OK'
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/auth/success');
  } else {
    return passport.authenticate('bitbucket')(ctx)
  }
})

router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.store.dispatch({ type: 'USER_LOGOUT', payload: { uuid: ctx.state.user.uuid } })
    ctx.logout()
  }
  ctx.type = 'html';
  const message = ctx.query.message || 'DISCONNECTED'
  ctx.body = `${message} - <a href="/auth">Click here to connect</a>`
})

router.get('/auth/success', async (ctx) => {
  ctx.type = 'html'
  if (ctx.isAuthenticated()) {
    try {
      const response = await bb.get(ctx, '2.0/repositories/trapcodien/sdp');
      ctx.body = `${response.data.slug} : Bitbucket account linked - <a href="/auth/logout">Click here to disconnect</a>`
    } catch (e) {
      const message = `${e.message} : ${e.response.data}`
      ctx.redirect(`/auth/logout?message=${message}`)
    }
  } else {
    ctx.redirect('/auth/logout')
  }
})

router.post('/bitbucket_hook', async (ctx) => {
  // console.log(JSON.stringify(ctx.request.body, null, 2));
  ctx.body = '';
});

router.get('/auth/failure', (ctx) => {
  ctx.body = 'login failure'
})

module.exports = router;
