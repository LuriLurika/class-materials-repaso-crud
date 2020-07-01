const express = require('express')
const router = express.Router()



module.exports = app => {
    app.use('/', require('./base.routes'))
    app.use('/parks', require('./park.routes'))
    app.use('/coasters', require('./coaster.routes'))
}