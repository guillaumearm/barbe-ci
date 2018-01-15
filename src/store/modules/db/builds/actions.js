const createBuild = (commit) => ({
  type: 'CREATE_BUILD',
  payload: { commit },
})

const buildStarted = (buildId) => ({
  type: 'BUILD_STARTED',
  payload: { buildId },
})

const build = (buildId) => ({
  type: 'BUILD',
  payload: { buildId },
})

module.exports = {
  createBuild,
  buildStarted,
  build,
}
