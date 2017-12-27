const { createSelector } = require('reselect')
const { pathOr, find, propEq, values } = require('ramda')

const getUsers = pathOr({}, ['db', 'users']);

const getOwnProp = (property) => (state, ownProps = {}) => ownProps[property]

const getUser = createSelector(
  getUsers,
  getOwnProp('name'),
  getOwnProp('uuid'),
  (users, byName, byUuid) => {
    if (byName) {
      return users[byName]
    } else if (byUuid) {
      return find(propEq('uuid', byUuid), values(users))
    }
    throw new Error('getUser should have name or uuid property')
  }
)

module.exports = {
  getUsers,
  getUser
}
