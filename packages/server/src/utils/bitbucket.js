/* eslint-disable no-console */
const { mergeDeepLeft } = require('ramda');
const { promisify } = require('util');
const axios = require('axios');
const requestPost = promisify(require('request').post)

const {
  getClientId,
  getClientSecret,
  getAccessToken,
  getRefreshToken,
} = require('../store/credentials/selectors');

const get = async (ctx, endpoint, options = {}) => {
  const { getState, dispatch } = ctx.store;
  const makeRefresh = () => requestPost(
    `https://bitbucket.org/site/oauth2/access_token`,
    {
      form: {
        grant_type: 'refresh_token',
        refresh_token: getRefreshToken(getState()),
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
        access_token: getAccessToken(getState()),
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
      dispatch({
        type: 'UPDATE_TOKENS',
        payload: {
          accessToken: access_token,
          refreshToken: refresh_token,
        },
      });
      return await makeQuery()
    } else {
      throw e;
    }
  }
}

module.exports = {
  get,
}
