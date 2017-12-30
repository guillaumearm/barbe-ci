/* eslint-disable no-console */
const _ = require('lodash/fp')
const { mergeDeepLeft, applyTo, pipe, prop } = require('ramda');
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
    return (await makeQuery()).data
  } catch (e) {
    if (e.response.status === 401) {
      const refreshResult = await makeRefresh();
      const { access_token, refresh_token } = JSON.parse(refreshResult.body)
      store.updateTokens(access_token, refresh_token)
      return (await makeQuery()).data
    } else {
      throw e;
    }
  }
}

const getAll = async (store, endpoint, options) => {
  let response = await get(store, endpoint, options);
  const responses = [response];
  while (response.next) {
    console.log('[getAll] - Additional request');
    response = await get(store, response.next, options);
    responses.push(response);
  }
  return applyTo(responses)(pipe(
    _.unset('pagelen'),
    _.flatMap(prop('values'),
  )))
}

module.exports = {
  get,
  getAll,
}
