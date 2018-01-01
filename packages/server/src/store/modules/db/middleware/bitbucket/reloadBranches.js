/* eslint-disable no-console */
const { assocPath } = require('ramda');
const requests = require('./utils/requests');

module.exports = (store) => (next) => async (action) => {
  if (action.type === 'BITBUCKET_RELOAD_BRANCHES') {
    const { repositoryFullName, branches } = action.payload;
    const resolvedBranches = [];
    for (let branch of branches) {
      const endpointPrefix = `https://api.bitbucket.org/2.0/repositories/${repositoryFullName}`
      const endpoint = `${endpointPrefix}/commits/${branch}`;
      try {
        const result = await requests.get(store, `${endpointPrefix}/refs/branches/${branch}`)
        const lastCommit = result.target.hash;
        if (lastCommit === store.getLastCommit({ repository: repositoryFullName, branch })) {
          console.log(`'${repositoryFullName}#${branch}' is already up-to-date.`);
        } else {
          console.log(`Resolve '${branch}' commits on ${repositoryFullName}`);
          const commits = await requests.getAll(store, endpoint);
          resolvedBranches.push({ name: branch, commits });
        }
      } catch (e) {
        console.log(`${e} (${endpoint})`);
      }
    }
    return await next(assocPath(['payload', 'resolvedBranches'], resolvedBranches, action));
  }
  return await next(action);
}
