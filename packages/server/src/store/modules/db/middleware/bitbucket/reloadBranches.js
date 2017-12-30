/* eslint-disable no-console */
const { assocPath } = require('ramda');
const requests = require('./utils/requests');

module.exports = (store) => (next) => async (action) => {
  if (action.type === 'BITBUCKET_RELOAD_BRANCHES') {
    const { repositoryFullName, branches } = action.payload;
    const resolvedBranches = [];
    for (let branch of branches) {
      const endpoint = `https://api.bitbucket.org/2.0/repositories/${repositoryFullName}/commits/${branch}`;
      try {
        console.log(`Resolve '${branch}' commits on ${repositoryFullName}`);
        const commits = await requests.getAll(store, endpoint);
        console.log('Resolved.');
        resolvedBranches.push({ name: branch, commits });
      } catch (e) {
        console.log(`${e.message} (${endpoint})`);
      }
    }
    return await next(assocPath(['payload', 'resolvedBranches'], resolvedBranches, action));
  }
  return await next(action);
}
