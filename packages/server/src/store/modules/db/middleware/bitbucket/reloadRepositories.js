module.exports = (store) => (next) => async (action) => {
  if (action.type === 'BITBUCKET_RELOAD_REPOSITORIES') {
    const nextAction = await next(action);
    for (let repository of action.payload.repositories) {
      const branchNames = store.getBranchesNames({ repository })
      if (branchNames.length > 0) {
        await store.bbReloadBranches(repository, branchNames)
      }
    }
    return nextAction;
  }
  return await next(action);
}
