module.exports = (router, store) => {
  if (store.getIsDebug()) {
    router.get('/debug', async (ctx) => {
      ctx.body = ctx.store.getState()
    })
    router.get('/debug/db', async (ctx) => {
      ctx.body = ctx.store.getDb()
    })
    router.get('/debug/logs', async (ctx) => {
      ctx.body = ctx.store.getLogs()
    })
    router.get('/debug/cleanlogs', async (ctx) => {
      ctx.store.cleanLogs();
      ctx.body = 'OK';
    })
  }
}
