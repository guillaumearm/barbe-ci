module.exports = (router) => {
  router.get('/debug', async (ctx) => {
    ctx.body = ctx.store.getState()
  })
  router.get('/cleanlogs', async (ctx) => {
    ctx.store.cleanLogs();
    ctx.body = 'OK';
  })
  router.get('/getCommits', async (ctx) => {
    ctx.body = await ctx.store.bbGetAll('https://api.bitbucket.org/2.0/repositories/trapcodien/sdp/commits/')
  })
}
