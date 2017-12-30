/* eslint-disable no-console */
const { mergeDeepLeft } = require('ramda');
const { promisify } = require('util');
const axios = require('axios');
const requestPost = promisify(require('request').post)

const get = async (store, endpoint, options = {}) => {
  const makeRefresh = () => requestPost(
    `https://bitbucket.org/site/oauth2/access_token`,
    {
      form: {
        grant_type: 'refresh_token',
        refresh_token: store.getCiRefreshToken(),
      },
      auth: {
        username: store.getClientId(),
        password: store.getClientSecret(),
      },
    }
  )
  const makeQuery = () => axios.get(
    endpoint,
    mergeDeepLeft(options, {
      params: {
        access_token: store.getCiAccessToken(),
      },
      auth: {
        username: store.getClientId(),
        password: store.getClientSecret(),
      },
    })
  );
  try {
    return await makeQuery()
  } catch (e) {
    if (e.response.status === 401) {
      const refreshResult = await makeRefresh();
      const { access_token, refresh_token } = JSON.parse(refreshResult.body)
      store.updateTokens(access_token, refresh_token)
      return await makeQuery()
    } else {
      throw e;
    }
  }
}

module.exports = {
  get,
}
