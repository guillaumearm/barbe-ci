const getAssetsMiddlewares = (serverOpts) => {
  if (process.env.NODE_ENV === 'production') {
    // PRODUCTION
    return require('./prod')(serverOpts);
  } else {
    // DEVELOPMENT
    return require('./dev')(serverOpts);
  }
}

module.exports = getAssetsMiddlewares;
