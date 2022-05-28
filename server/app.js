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
const nodemailer = require('nodemailer');

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
                                res.send({ code: 200, message: `Account Created Successfully. \n\nPlease confirm your account using the link we have sent to your mail ${req.body.email.substring(0, 5)}xxxx${req.body.email.substring((req.body.email.indexOf('@') - 4), req.body.email.length)}.` })
                                sendEmail(req.body.email)
                            }).catch(err => {
                                console.log(err)
                            })
                    }
                })
                .catch(err => {
                    res.send(err)
                })

        })
        .catch(err2 => {
            res.send(err2)
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

function sendEmail(email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '0xeblockpay@gmail.com',
            pass: ''
        }
    });
    var url = 'https://google.com';
    var mailOptions = {
        from: 'eBlockPay Team',
        to: email,
        subject: 'Confirmation Mail',
        html: `<html><head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                }
            }
    
            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
    
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }
    
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>
    
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
        <!-- HIDDEN PREHEADER TEXT -->
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tbody><tr>
                <td bgcolor="#000000" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tbody><tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#000000" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tbody><tr>
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;">
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tbody><tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tbody><tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tbody><tr>
                                                    <td align="center" style="border-radius: 8px;" bgcolor="#000000"><a href="${url}" target="_blank" style="font-size: 20px;font-family: Helvetica, Arial, sans-serif;color: #ffffff;text-decoration: none;color: #ffffff;text-decoration: none;padding: 15px 25px;border-radius: 8px;border: 1px solid #060606;display: inline-block;">Confirm Account</a></td>
                                                </tr>
                                            </tbody></table>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr> <!-- COPY -->
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                            </td>
                        </tr> <!-- COPY -->
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;"><a href="${url}" target="_blank" style="color: #000000;">${url}</a></p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Cheers,<br>Team IndiPay</p>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tbody><tr>
                            <td bgcolor="#666666" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <h2 style="font-size: 20px;font-weight: 400;color: #ffffff;margin: 0;">Need more help?</h2>
                                <p style="margin: 0;"><a href="#" target="_blank" style="color: #ffffff;">We’re here to help you out</a></p>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tbody><tr>
                            <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
        </tbody></table>
    
    
    
    </body></html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}