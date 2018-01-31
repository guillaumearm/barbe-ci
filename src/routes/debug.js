module.exports = (router, store) => {
  if (store.getIsDebug()) {
    router.get('/debug', async (ctx) => {
      ctx.body = ctx.store.getState()
    })
    router.get('/debug/commits/all', async (ctx) => {
      ctx.body = ctx.store.getAllCommitsHashes();
    })
    router.get('/debug/commits/branches', async (ctx) => {
      ctx.body = ctx.store.getAllBranchesCommits();
    })
    router.get('/debug/db', async (ctx) => {
      ctx.body = ctx.store.getDb()
    })
    router.get('/debug/logs', async (ctx) => {
      ctx.body = ctx.store.getLogs()
    })
    router.get('/debug/clean/logs', async (ctx) => {
      ctx.store.cleanLogs();
      ctx.body = 'OK';
    })
  }
}
