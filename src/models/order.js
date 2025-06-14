const mongoose = require('mongoose')
const pointSchema = require('./schemas/pointSchema.js')

const OrderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cabId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cab',
        required:true
    },
    pickup:{
        type: pointSchema,
        required:true
    },
    dropoff:{
        type: pointSchema,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        enum:['Ongoing','Completed','Cancelled'],
        default:'Ongoing'
    },
},
{
    timestamps:true
})


OrderSchema.index({dropoff:'2dsphere'})
OrderSchema.index({pickup:'2dsphere'})

OrderSchema.statics.createOrder = async function (user, cab,pickup,dropoff,price){
    const order = await this.create({
        userId:user._id,
        cabId:cab._id,
        pickup,
        dropoff,
        orderStatus:'Ongoing',
        price
    })
    return order
}

module.exports = mongoose.model('Order',OrderSchema)