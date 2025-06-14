const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authMiddlware = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).send('No token')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(payload.userId).select('-password')
        req.user = user

        // req.user = {userId:payload.userId,email:payload.email}
        // console.log(req.user)
        next()
    }catch(err){
        return res.status(401).send(err)
    }
}

module.exports = authMiddlware