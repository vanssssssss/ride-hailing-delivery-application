const cabList = require('../models/cab')

const getAllCabs = async (req,res) => {
    try{
        const cab = await cabList.find({})
        if(!cab){
            return res.status(400).send('No cab found')
        }
        res.status(200).json(cab)
    }catch(err){
        res.status(401).json({msg:err})
    }
    
}

const createCab = async (req,res) => {
    try{
        const cab = await cabList.create(req.body)
        res.status(200).json(cab)
    }catch(err){
        console.log(err)
        res.status(401).json({msg:err})
    }
}

const getCab = async(req,res) => {
    const {cabId} = req.params
    try{
        const cab = await cabList.findOne({_id:cabId})
        if(!cab){
            return res.status(400).send('No cab found')
        }
        res.status(200).json(cab)
    }catch(err){
        console.log(err)
        res.status(401).json({msg:err})
    }
}

const updateCab = async (req,res) =>{
    const {cabId} = req.params
    try{
        const cab = await cabList.findOneAndUpdate({_id:cabId},req.body,{
            new:true,
            runValidators : true
        })
        if(!cab){
            return res.status(400).send('No cab found')
        }
        res.status(200).json(cab)
    }catch(err){
        console.log(err)
        res.status(401).json({msg:err})
    }
}

const deleteCab =  async (req,res) =>{
    const {cabId} = req.params
    try{
        const cab = await cabList.findOneAndDelete({_id:cabId})
        if(!cab){
            return res.status(400).send('No cab found')
        }
        res.status(200).json(cab)
    }catch(err){
        console.log(err)
        res.status(401).json({msg:err})
    }
}

module.exports = {
    getAllCabs,   
    createCab,
    getCab,
    updateCab,
    deleteCab
}