const order = require('../models/order')

const getPrice = function (pickup,dropoff){
    const dis = getDisFromLatInKm(pickup,dropoff)
    const price = Math.round(40 + (dis*10))
    // console.log(dis, price)
    return price
}

const getDisFromLatInKm = function(pickup,dropoff){
    const long1 = pickup.coordinates[0]
    const lat1 = pickup.coordinates[1]
    const long2 = dropoff.coordinates[0]
    const lat2 = dropoff.coordinates[1]

    const R = 6371
    const lat = degToRad(lat2-lat1)
    const long = degToRad(long2-long1)

    const a = Math.sin(lat/2)*Math.sin(lat/2) + Math.cos(degToRad(lat1))*Math.cos(degToRad(lat2))*Math.sin(long/2)*Math.sin(long/2)
    const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
    const dis = R*c

    return dis
}

const degToRad = function(num){
    return num * (Math.PI/180)
}

module.exports = {getPrice}