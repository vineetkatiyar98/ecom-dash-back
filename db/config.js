const mongoose = require('mongoose');
const dotenv = require("dotenv");
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, useUnifiedTopology: true ,
    serverSelectionTimeoutMS: 30000
}).then(()=>{
    console.log(`connected to ${process.env.DB_NAME}`);
}).catch((error)=>{
    console.log(`${error} connecting to ${process.env.DB_NAME}`)
})
