const express = require('express')
const app = express()
const {connectDB} = require('./src/db/connect')
require('dotenv').config()

const cabRouter = require('./src/routes/cabList')
const authRouter = require('./src/routes/auth')
const orderRouter = require('./src/routes/order')
const notFoundMiddleware = require('./src/middleware/not-found')
const authMiddlware = require('./src/middleware/auth')

app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/cabs',authMiddlware,cabRouter)
app.use('/api/v1/order',authMiddlware,orderRouter)

app.use(notFoundMiddleware)
 
const port = process.env.PORT || 3000

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,() => console.log(`Server is listening on ${port}`))
    }catch(err){
        console.log(err)
    }
   
}

start()
