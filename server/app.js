const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
require('./User')
const crypto = require("crypto");
const User = mongoose.model('user')

const mongoUri = process.env.MONGO_URI;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, () => {
    console.log('server running')
})

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected...')
})

mongoose.connection.on('error', (err) => {
    console.log('got error', err, mongoUri)
})

app.get('/', (req, res) => {
    User.find({}).then(data => {
        console.log(data)
        res.send(data)
    })
        .catch(err => {
            console.log(err)
        })

})


app.get('/login', (req, res) => {
    User.find({
        "email": req.body.email,
        "password": req.body.password
    })
        .then(data => {
            res.send(data)
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
})



app.post('/send-data', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profilePic: req.body.profile_pic,
        pan: req.body.pan,
        password: req.body.password,
        aadhar: req.body.aadhar
    })
    console.log(req.body)
    user.save()
        .then(data => {
            console.log(data)
            res.send('posted')
        }).catch(err => {
            console.log(err)
        })
})

app.post('/delete', (req, res) => {
    User.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send('deleted')
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/update', (req, res) => {
    User.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profilePic: req.body.profile_pic,
        pan: req.body.pan,
        aadhar: req.body.aadhar
    })
        .then(data => {
            console.log(data)
            res.send('updated')
        })
        .catch(err => {
            console.log(err)
        })
})

function hash(pwd) {
    return crypto
        .createHash("sha256")
        .update(pwd)
        .digest("base64");
}