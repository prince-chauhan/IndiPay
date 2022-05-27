const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
require('./User')
const crypto = require("crypto");
const User = mongoose.model('createAccount')
const csprng = require('csprng');
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


app.post('/login', (req, res) => {
    User.find({
        "email": req.body.email
    })
        .then(data => {
            console.log(data)
            if (data.length > 0) {

                let hashedpass = data[0].password;
                const salt = data[0].salt;
                if (!req.body.password) {
                    res.send({
                        code: 401,
                        message: "There was no password with this request"
                    })
                }

                const hashedpassquery = hash(`${salt}${req.body.password}`);
                if (hashedpass == hashedpassquery) {
                    res.send(
                        {
                            code: 200,
                            data: data[0]
                        });
                }
                else {
                    res.send({
                        code: 402,
                        message: "Either email or password is incorrect"
                    })
                }

            }
            else {
                res.send({
                    code: 402,
                    message: "Either email or password is incorrect"
                })
            }
        })
        .catch(err => {
            res.send({
                code: 409,
                message: 'An error occured while processing the request'
            });
            console.log(err)
        })
})



app.post('/send-data', (req, res) => {
    User.find({
        "email": req.body.email
    })
        .then(data => {
            if (data.length > 0) {
                res.send({
                    code: 409,
                    message: "You can\'t use this email address"
                })
            }
            User.find({
                "phone": req.body.phone
            })
                .then(data => {
                    if (data.length > 0) {
                        res.send({
                            code: 409,
                            message: "You can\'t use this mobile number"
                        })
                    }
                    else {
                        const salt = csprng(160, 36);
                        req.body.password = hash(`${salt}${req.body.password}`);
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
                            profilePic: req.body.profile_pic,
                            pan: req.body.pan,
                            password: req.body.password,
                            aadhar: req.body.aadhar,
                            salt
                        })
                        console.log(req.body)
                        user.save()
                            .then(data => {
                                console.log(data)
                                res.send({ code: 200, message: 'Account Created Successfully' })
                            }).catch(err => {
                                console.log(err)
                            })
                    }
                })
                .catch(err => {
                    res.send(err)
                })

        })
        .catch(err => {
            res.send(err)
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