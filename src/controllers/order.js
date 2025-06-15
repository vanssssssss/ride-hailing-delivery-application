const User = require('../models/user')
const cab = require('../models/cab')
const Order = require('../models/order')
const {getPrice} = require('../services/order')

const placeOrder = async(req,res) => {
    if(!req.body.pickup || !req.body.dropoff){
        return res.status(400).send('Please provide credentials')
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
        return res.status(400).send('NO AVAILABLE CAB RN. TRY AGAIN LATER')
    }

    await cab.findByIdAndUpdate(nearbyCabs._id,{status:'Booked'})

    const price = getPrice(req.body.pickup,req.body.dropoff)
    const order = await Order.createOrder(req.user,nearbyCabs,req.body.pickup,req.body.dropoff,price)
    
    // console.log(order)
    res.status(200).json({success:'Order placed successfully',data:order})
}

const trackOrder = async(req,res) => {
    const {orderId} = req.params
    const order = await Order.findById(orderId)
    const {cabId,orderStatus} = order

    const Cab = await cab.findById(cabId)
    const cabLocation = Cab.location.coordinates

    res.status(200).json({orderId, orderStatus, cabLocation })
}
module.exports = {placeOrder,trackOrder}