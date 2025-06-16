const express = require('express')
const app = express()
require('dotenv').config()

const cabRouter = require('./src/routes/cabList')
const authRouter = require('./src/routes/auth')
const orderRouter = require('./src/routes/order')
const notFoundMiddleware = require('./src/middleware/not-found')
const authMiddlware = require('./src/middleware/auth')
const errorHandlerMiddleware = require('./src/middleware/error-handler')

app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/cabs',authMiddlware,cabRouter)
app.use('/api/v1/order',authMiddlware,orderRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
module.exports = app