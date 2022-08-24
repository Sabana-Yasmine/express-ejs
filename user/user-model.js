const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type : String, require : true},
    email : {type : String, require : true},
    password : {type : String, require : true},
    active : {type : Boolean, default : false},
    otp :{type : String},
    verifyOtp : {type : Boolean, default : false},
   loginstatus:{type : Boolean, default : false}
}, {
    timestamps : true,
})

const user = mongoose.model("user", userSchema)

module.exports = user;