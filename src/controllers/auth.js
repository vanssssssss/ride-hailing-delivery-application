const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async(req,res) =>{
    const user = await User.create({ ...req.body})
    res.status(200).json({success:true})
}

const login = async(req,res) =>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).send("Please provide credentials")
    }

    const matchingUser = await User.findOne({email})
    if(!matchingUser){
        return res.status(401).send("Invalid email or password")
    }

    const verifyPassword = matchingUser.verifyPassword(password)
    if(!verifyPassword){
        return res.status(401).send("Invalid email or password")
    }

    const token = matchingUser.createToken()
    res.status(200).json(token)
}


module.exports = {register,login}