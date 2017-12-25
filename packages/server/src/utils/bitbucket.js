/* eslint-disable no-console */
const { mergeDeepLeft } = require('ramda');
const { promisify } = require('util');
const axios = require('axios');
const requestPost = promisify(require('request').post)

const get = async (ctx, endpoint, options = {}) => {
  const makeRefresh = (user) => requestPost(
    `https://bitbucket.org/site/oauth2/access_token`,
    {
      form: {
        grant_type: 'refresh_token',
        refresh_token: user.refreshToken,
      },
      auth: {
        username: 'fwrGpD44hvsE3LpSMx',
        password: 's9DWJqacAv5bRdkzqPEXLCRNvfrrYYtH',
      },
    }
  )
  const makeQuery = (user) => axios.get(
    `https://api.bitbucket.org/${endpoint}`,
    mergeDeepLeft(options, {
      params: {
        access_token: user.accessToken,
      },
      auth: {
        username: 'fwrGpD44hvsE3LpSMx',
        password: 's9DWJqacAv5bRdkzqPEXLCRNvfrrYYtH',
      },
    })
  );
  try {
    return await makeQuery(ctx.state.user)
  } catch (e) {
    if (e.response.status === 401) {
      const refreshResult = await makeRefresh(ctx.state.user);
      const body = JSON.parse(refreshResult.body)
      return await makeQuery({
        accessToken: body.access_token,
        refreshToken: body.refresh_token,
      })
    } else {
      throw e;
    }
  }
}

module.exports = {
  get,
}
