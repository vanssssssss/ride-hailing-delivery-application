const cabList = require('../models/cab')
const cab = require('../models/cab')
const { StatusCodes } = require('http-status-codes')
const {badRequestError,UnauthenticateddError,notFoundError} = require('../errors/index')

const getAllCabs = async (req,res) => {
    if(!req.body.pickup || !req.body.dropoff){
       throw new badRequestError('Please provide credentials')
    }

    const userLon = req.body.pickup.coordinates[0]
    const userLat = req.body.pickup.coordinates[1]

    const nearbyCabs = await cab.find({
        location:{
            $near:{
                $geometry:{type:'Point', coordinates:[userLon, userLat]},
                $maxDistance: 2000
            }
        },
        status:'Available'
    }).exec()

    if(!nearbyCabs){
       return res.status(StatusCodes.OK).json({msg: 'NO avaialable cabs. try again later',nearbyCabs})
    }
    res.status(StatusCodes.OK).json({nearbyCabs})
}

module.exports = {
    getAllCabs
}