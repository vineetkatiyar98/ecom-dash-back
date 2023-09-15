const mongoose = require('mongoose');
require ("dotenv").config()
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(()=>{
    console.log(`connected to ${process.env.DB_NAME}`);
}).catch((error)=>{
    console.log(`${error} connecting to ${process.env.DB_NAME}`)
})
