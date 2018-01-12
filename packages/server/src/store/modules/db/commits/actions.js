const haveDetachedCommits = (commits) => ({
  type: 'HAVE_DETACHED_COMMITS',
  payload: { commits },
});

const searchForDetachedCommits = () => ({
  type: 'SEARCH_FOR_DETACHED_COMMITS',
  payload: {},
});

module.exports = {
  haveDetachedCommits,
  searchForDetachedCommits,
};
