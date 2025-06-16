const customAPIError = require('./custom-error')
const UnauthenticateddError = require('./unauthenticated')
const badRequestError = require('./bad-request')
const notFoundError = require('./not-found')

module.exports = {
    customAPIError,
    UnauthenticateddError,
    badRequestError,
    notFoundError
}