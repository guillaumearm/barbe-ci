const { cleanLogs } = require('../store/actions');

module.exports = (router) => {
  router.get('/debug', async (ctx) => {
    ctx.body = ctx.store.getState()
  })
  router.get('/cleanlogs', async (ctx) => {
    ctx.store.dispatch(cleanLogs());
    ctx.body = 'OK';
  })
}
