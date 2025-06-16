const app = require('./app')
const {connectDB} = require('./src/db/connect')
require('dotenv').config()

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