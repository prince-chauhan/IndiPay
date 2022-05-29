const mongoose = require('mongoose')

const CreateAccountSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    phone: String,
    profilePic: String,
    password: String,
    pan: String,
    aadhar: String,
    salt: String,
    activated: Boolean
})

mongoose.model('userInfo', CreateAccountSchema)


const featureRequestOtp = new mongoose.Schema({
    otp: String,
    otpExpiry: String,
    feature: String,
    attempts: String,
    otpId: String,
    userId: String,
    utilized: Boolean
})

mongoose.model('otpRequests', featureRequestOtp)