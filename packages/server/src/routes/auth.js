const passport = require('koa-passport');
const bb = require('../utils/bitbucket');
const { getCiRefreshToken } = require('../store/selectors')
const { userLogout } = require('../store/actions');

module.exports = (router) => {
  router.get('/auth/bitbucket/callback',
    passport.authenticate('bitbucket', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/failure'
    })
  )

  router.get('/auth', async ctx => {
    const { getState } = ctx.store
    if (ctx.isAuthenticated() && !getCiRefreshToken(getState())) {
      ctx.logout();
      return ctx.redirect('/auth');
    }
    else if (ctx.isAuthenticated()) {
      return ctx.redirect('/auth/success');
    } else {
      return passport.authenticate('bitbucket')(ctx)
    }
  })

  router.get('/auth/logout', async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.store.dispatch(userLogout(ctx.state.user.uuid));
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
}
