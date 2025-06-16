const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const {badRequestError,UnauthenticateddError,notFoundError} = require('../errors/index')

const register = async(req,res) =>{
    const user = await User.create({ ...req.body})
    res.status(StatusCodes.CREATED).json({success:true})
}

const login = async(req,res) =>{ 
    const {email,password} = req.body
    if(!email || !password){
        throw new badRequestError('Please provide credentials')
    }

    const matchingUser = await User.findOne({email})
    if(!matchingUser){
        throw new UnauthenticateddError('Invalid email or password')
    }
    
    const verifyPassword = await matchingUser.verifyPassword(password)
    if(!verifyPassword){
        throw new UnauthenticateddError('Invalid email or password')
    }

    const token = matchingUser.createToken()
    res.status(StatusCodes.ACCEPTED).json({token})
}


module.exports = {register,login}