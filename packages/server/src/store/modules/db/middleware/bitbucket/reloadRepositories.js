module.exports = (store) => (next) => async (action) => {
  if (action.type === 'BITBUCKET_RELOAD_REPOSITORIES') {
    const nextAction = await next(action);
    for (let repository of action.payload.repositories) {
      await store.bbReloadBranches(repository, store.getBranchesNames({ repository }))
    }
    return nextAction;
  }
  return await next(action);
}
