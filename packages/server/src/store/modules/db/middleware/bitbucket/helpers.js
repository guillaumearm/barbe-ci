/* eslint-disable no-console */
const { mergeDeepLeft } = require('ramda');
const { promisify } = require('util');
const axios = require('axios');
const requestPost = promisify(require('request').post)

const {
  getClientId,
  getClientSecret,
  getCiAccessToken,
  getCiRefreshToken,
} = require('../../../../selectors');
const { updateTokens } = require('../../../../actions')

const get = async ({ getState, dispatch }, endpoint, options = {}) => {
  const makeRefresh = () => requestPost(
    `https://bitbucket.org/site/oauth2/access_token`,
    {
      form: {
        grant_type: 'refresh_token',
        refresh_token: getCiRefreshToken(getState()),
      },
      auth: {
        username: getClientId(getState()),
        password: getClientSecret(getState()),
      },
    }
  )
  const makeQuery = () => axios.get(
    endpoint,
    mergeDeepLeft(options, {
      params: {
        access_token: getCiAccessToken(getState()),
      },
      auth: {
        username: getClientId(getState()),
        password: getClientSecret(getState()),
      },
    })
  );
  try {
    return await makeQuery()
  } catch (e) {
    if (e.response.status === 401) {
      const refreshResult = await makeRefresh();
      const { access_token, refresh_token } = JSON.parse(refreshResult.body)
      dispatch(updateTokens(access_token, refresh_token))
      return await makeQuery()
    } else {
      throw e;
    }
  }
}

module.exports = {
  get,
}
