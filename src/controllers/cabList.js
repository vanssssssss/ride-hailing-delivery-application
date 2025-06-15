const cabList = require('../models/cab')
const cab = require('../models/cab')

const getAllCabs = async (req,res) => {
    try{
         if(!req.body.pickup || !req.body.dropoff){
             return res.status(400).send('Please provide credentials')
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
             return res.status(400).send('NO AVAILABLE CAB RN. TRY AGAIN LATER')
         }

         res.status(200).json({nearbyCabs})

    }catch(err){
        res.status(401).json({msg:err})
    }
    
}

module.exports = {
    getAllCabs
}