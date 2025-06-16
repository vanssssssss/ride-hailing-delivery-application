const {notFoundError} = require('../errors/index')


const notFound = (req,res) =>{
    throw new notFoundError('Route does not exist')
}

module.exports = notFound