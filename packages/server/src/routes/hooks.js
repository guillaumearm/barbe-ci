const _ = require('lodash/fp');
const { applyTo, pipe } = require('ramda');

module.exports = (router) => {
  router.post('/bitbucket_hook', async (ctx) => {
    ctx.body = '';
    const body = ctx.request.body;
    // eslint-disable-next-line no-console
    if (body.push && body.repository.scm === 'git') {
      const changes = body.push.changes.map(change => (
        applyTo(body)(pipe(
          _.unset('push.changes'),
          _.set('push.change', change),
          _.set('push.change.type', _.get('type')(change.new || change.old)),
          _.set('push.change.name', _.get('name')(change.new || change.old)),
        ))
      ));
      changes.forEach(change => ctx.store.gitPush(change))
    }
  });
}
