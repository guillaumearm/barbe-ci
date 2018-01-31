/* eslint-disable no-console */
const _ = require('lodash/fp')
const { applyTo, pipe, prop } = require('ramda');
const request = require('request-promise');

const get = async (store, endpoint) => {
  const makeRefresh = () => request.post(
    `https://bitbucket.org/site/oauth2/access_token`,
    {
      form: {
        grant_type: 'refresh_token',
        refresh_token: store.getRefreshToken(),
      },
      auth: {
        username: store.getClientId(),
        password: store.getClientSecret(),
      },
    }
  )
  const makeQuery = () => request.get(
    endpoint,
    {
      qs: {
        access_token: store.getAccessToken(),
      },
      auth: {
        username: store.getClientId(),
        password: store.getClientSecret(),
      },
    }
  );
  try {
    const response = await makeQuery()
    return JSON.parse(response)
  } catch (e) {
    const bodyString = _.get('response.body', e);
    const body = JSON.parse(bodyString)
    const message = _.get('error.message', body) || _.get('message', e);
    const status = _.get('response.statusCode', e);
    if (status === 401 && /^Access token expired/.test(message)) {
      console.log('Access token expired, refresh token.');
      const refreshResult = await makeRefresh();
      const { access_token, refresh_token } = JSON.parse(refreshResult)
      store.updateTokens(access_token, refresh_token)
      return await makeQuery()
    } else if (status === 404) {
      throw new Error('404 not found')
    } else if (message) {
      throw new Error(message);
    } else {
      throw e;
    }
  }
}

const getAll = async (store, endpoint) => {
  let response = await get(store, endpoint);
  const responses = [response];
  while (response.next) {
    console.log('[bitbucket getAll] - Additional request');
    response = await get(store, response.next);
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
