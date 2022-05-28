const mongoose = require('mongoose')

const CreateAccountSchema = new mongoose.Schema({
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

mongoose.model('createAccount', CreateAccountSchema)


const featureRequestOtp = new mongoose.Schema({
    otp: String,
    otpExpiry: TimeStamp,
    feature: String,
    attempts: String,
    otpId: String,
    userId: String
})

mongoose.model('createAccount', featureRequestOtp)