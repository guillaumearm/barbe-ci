module.exports = (router) => {
  router.get('/debug', async (ctx) => {
    ctx.body = ctx.store.getState()
  })
  router.get('/cleanlogs', async (ctx) => {
    ctx.store.cleanLogs();
    ctx.body = 'OK';
  })
}
