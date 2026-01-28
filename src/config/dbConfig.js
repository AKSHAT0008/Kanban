const mongoose = require('mongoose');
const serverConfig = require('./serverConfig'); // Import server configuration

async function connectDB(){
    try{
        await mongoose.connect(serverConfig.DB_URL) // Connect to the MongoDB database using the URL from serverConfig
        console.log("DB connected successfully");
        
    }
    catch(error){
        console.log("error connecting to DB ", error.message);       
    }
}

module.exports  = connectDB;