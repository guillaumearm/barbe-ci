const isNormalPush = ({ change }) => (
  !change.truncated && !change.forced && !change.created && !change.closed
)

const branchResolver = (store) => (next) => async (action) => {
  if (action.type === 'GIT_PUSH') {
    const { push, repository } = action.payload;
    const repositoryFullName = repository.full_name;
    const { branchName } = push.change;
    const lastCommit = store.getLastCommit({ branchName, repositoryFullName })
    if (isNormalPush(push) && push.change.old.target.hash !== lastCommit) {
      await store.reloadBranch(repositoryFullName, branchName, push);
    }
    return await next(action);
  }
  return await next(action);
}

module.exports = branchResolver;
