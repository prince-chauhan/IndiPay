const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
app.get('/', (req, res) => {
    res.send(process.env.MONGO_URI)
})

app.listen(3000, () => {
    console.log('server running')
}) 