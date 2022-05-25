const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    profilePic: String,
    pan: String,
    aadhar: String
})

mongoose.model('user', UserSchema)