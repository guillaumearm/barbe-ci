/* eslint-disable no-console */

module.exports = (store) => (next) => async (action) => {
  if (action.type === 'RELOAD_REPOSITORIES') {
    for (let repository of action.payload.repositories) {
      try {
        await store.bbGet(`https://api.bitbucket.org/2.0/repositories/${repository}`);
      } catch (e) {
        if (e.message === '404 not found') {
          store.repositoryNotFound(repository);
          console.log(`'${repository}' not found, remove repository.`);
        } else {
          console.log(e);
        }
        return await next(action)
      }
      const branchesNames = store.getBranchesNames({ repositoryFullName: repository })
      if (branchesNames.length > 0) {
        await store.reloadBranches(repository, branchesNames)
      }
    }
    return await next(action);
  }
  return await next(action);
}
