const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    profilePic: String,
    password: String,
    pan: String,
    aadhar: String,
    salt: String
})

mongoose.model('user', UserSchema)