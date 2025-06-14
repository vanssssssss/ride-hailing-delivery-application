const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please provide User Name"],
    },   
    email: {
        type: String,
        required: [true,"Please provide Email"],
        unique:true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"Please provide a vbalid email address"]
    },  
    password: {
        type: String,
        required: [true,"Please provide Passowrd"],
    },  
})

UserSchema.pre('save' , async function () {
    const genSalt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,genSalt)
})

UserSchema.methods.createToken = function () {
    return jwt.sign({userId:this._id,email:this.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model('User', UserSchema)