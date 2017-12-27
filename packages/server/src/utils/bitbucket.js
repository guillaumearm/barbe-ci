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
} = require('../store/selectors');
const { updateTokens } = require('../store/actions')

const get = async (ctx, endpoint, options = {}) => {
  const { getState, dispatch } = ctx.store;
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
    `https://api.bitbucket.org/${endpoint}`,
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
