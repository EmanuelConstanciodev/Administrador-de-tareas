const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env'})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO
            
            
            , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        }
        
        )                          //PROBLEM
        console.log('DB is working')
    } catch (error) {
        console.log('there is something wrong')
        process.exit(1) //if there is an error, the app will stopped
    }
}

module.exports = connectDB