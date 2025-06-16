const User = require('../models/user')
const cab = require('../models/cab')
const Order = require('../models/order')
const {getPrice} = require('../services/order')
const { StatusCodes } = require('http-status-codes')
const {badRequestError,UnauthenticateddError,notFoundError} = require('../errors/index')


const placeOrder = async(req,res) => {
    if(!req.body.pickup || !req.body.dropoff){
        throw new badRequestError('Please provide credentials')
    }
    const userLon = req.body.pickup.coordinates[0]
    const userLat = req.body.pickup.coordinates[1]

    const nearbyCabs = await cab.findOne({
        location:{
            $near:{
                $geometry:{type:'Point', coordinates:[userLon, userLat]},
                $maxDistance: 2000
            }
        },
        status:'Available'
    })

    if(!nearbyCabs){
        return res.status(StatusCodes.OK).json({msg: 'NO avaialable cabs. try again later',nearbyCabs})
    }

    await cab.findByIdAndUpdate(nearbyCabs._id,{status:'Booked'})

    const price = getPrice(req.body.pickup,req.body.dropoff)
    const order = await Order.createOrder(req.user,nearbyCabs,req.body.pickup,req.body.dropoff,price)
    
    res.status(StatusCodes.OK).json({success:'Order placed successfully',data:order})
}

const trackOrder = async(req,res) => {
    const {orderId} = req.params
    const order = await Order.findById(orderId)
    const {cabId,orderStatus} = order

    const Cab = await cab.findById(cabId)
    const cabLocation = Cab.location.coordinates

    res.status(StatusCodes.OK).json({orderId, orderStatus, cabLocation })
}
module.exports = {placeOrder,trackOrder}