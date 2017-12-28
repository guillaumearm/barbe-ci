const stringify = x => JSON.stringify(x, null, 2)

module.exports = (router) => {
  router.post('/bitbucket_hook', async (ctx) => {
    const body = ctx.request.body;
    // eslint-disable-next-line no-console
    console.log(stringify(body));
    ctx.body = '';
  });
}
