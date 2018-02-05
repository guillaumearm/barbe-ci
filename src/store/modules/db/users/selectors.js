const { getOwnProp } = require('redux-fun')
const { createSelector } = require('reselect')
const { pathOr, find, propEq, values } = require('ramda')

const getUsers = pathOr({}, ['db', 'users']);

const getUser = createSelector(
  getUsers,
  getOwnProp('name'),
  getOwnProp('sessionUuid'),
  (users, byName, bySessionUuid) => {
    if (byName) {
      return users[byName]
    } else if (bySessionUuid) {
      return find(propEq('sessionUuid', bySessionUuid), values(users))
    }
    throw new Error('getUser should have name or sessionUuid property')
  }
)

module.exports = {
  getUsers,
  getUser
}
