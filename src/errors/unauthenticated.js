const customAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class UnauthenticateddError extends customAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED 
    }
}

module.exports = UnauthenticateddError
