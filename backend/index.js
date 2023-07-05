const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const messagesRoute = require('./routes/messages')

app.use('/messages', messagesRoute)

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log('connected to DB')
    }).catch((error) => {
        console.log(error)
    })

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
