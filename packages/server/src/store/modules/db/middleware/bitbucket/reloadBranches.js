/* eslint-disable no-console */
const _ = require('lodash/fp');
const { applyTo, compose, not, pipe, both, last, assocPath } = require('ramda');
const requests = require('./utils/requests');

module.exports = (store) => (next) => async (action) => {
  if (action.type === 'RELOAD_BRANCHES') {
    const { repositoryFullName, branchesNames } = action.payload;
    for (let branchName of branchesNames) {
      await store.reloadBranch(repositoryFullName, branchName);
    }
    return await next(action)
  }
  if (action.type === 'RELOAD_BRANCH') {
    const { repositoryFullName, branchName } = action.payload;
    const endpointPrefix = `https://api.bitbucket.org/2.0/repositories/${repositoryFullName}`
    const endpoint = `${endpointPrefix}/commits/${branchName}`;
    try {
      const result = await requests.get(store, `${endpointPrefix}/refs/branches/${branchName}`)
      const lastCommit = result.target.hash;
      if (lastCommit === store.getLastCommit({ repositoryFullName, branchName })) {
        console.log(`'${repositoryFullName}#${branchName}' is already up-to-date.`);
      } else {
        console.log(`Resolve '${branchName}' commits on ${repositoryFullName}`);
        const commits = await requests.getAll(store, endpoint);
        const getIsForced = both(
          _.has('[0]'),
          compose(not, _.has('parents[0]'), last)
        )
        return await next(applyTo(action)(_.update('payload', pipe(
          _.set('forced', getIsForced(commits)),
          _.set('resolvedBranch', { name: branchName, commits }),
        ))));
      }
    } catch (e) {
      if (e.message === '404 not found') {
        console.log(`'${repositoryFullName}#${branchName}' not found, remove branch.`);
        return await next(assocPath(['payload', 'notFound'], true, action));
      } else {
        console.log(`${e} (${endpoint})`);
      }
    }
    return await next(action);
  }
  return await next(action);
}
