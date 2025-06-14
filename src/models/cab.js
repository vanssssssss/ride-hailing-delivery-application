const mongoose = require('mongoose')
const pointSchema = require('./schemas/pointSchema')

const cabSchema = new mongoose.Schema({
    driverName : {
        type: String,
        required:[true,'Please provide driver name'],
    },
    carModel :{
        type:String,
        required:[true,'Please provide car model'],
    },
    carPlateNo :{
        type:String,
        required:[true,'Please provide car plate no'],
        trim:true,
    },
    fuelType : {
        type:String,
        required:[true,'Please provide fuel type'],
        trim:true,
        maxlength:[10,'too much words']
    },
    location:{
        type: pointSchema,
        required:true
    },
    status:{
        type:String,
        enum:['Available','Booked'],
        default:'Available'
    }
})

cabSchema.index({location : '2dsphere'})

module.exports = mongoose.model('cabList',cabSchema)