const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {UnauthenticateddError} = require('../errors/index')

const authMiddlware = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticateddError('No token')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(payload.userId).select('-password')
        req.user = user
        next()
    }catch(err){
        throw new UnauthenticateddError('Invalid or expired token')
    }
}

module.exports = authMiddlware