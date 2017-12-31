module.exports = (store) => (next) => async (action) => {
  if (action.type === 'BITBUCKET_RELOAD_REPOSITORIES') {
    const nexted = await next(action);
    for (let repository of action.payload.repositories) {
      const branchNames = store.getBranchesNames({ repository })
      if (branchNames.length > 0) {
        await store.bbReloadBranches(repository, branchNames)
      }
    }
    return nexted;
  }
  return await next(action);
}
