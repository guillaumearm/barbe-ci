const { gitPush } = require('../store/actions');

module.exports = (router) => {
  router.post('/bitbucket_hook', async (ctx) => {
    const body = ctx.request.body;
    // eslint-disable-next-line no-console
    if (body.push && body.repository.scm === 'git') {
      ctx.store.dispatch(gitPush(body));
    }
    ctx.body = '';
  });
}
