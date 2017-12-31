const _ = require('lodash/fp');

module.exports = (store) => (next) => async (action) => {
  if (action.type === 'GIT_PUSH') {
    const newChanges = [];
    for (let change of action.payload.push.changes) {
      if (change.truncated) {
        const result = await store.bbGetAll(change.links.commits.href);
        const commits = result.payload.response;
        newChanges.push(_.set('commits', commits, change))
      } else {
        newChanges.push(change)
      }
    }
    return await next(_.set('payload.push.changes', newChanges, action));
  }
  return await next(action);
}
