const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone : {
        type: Number,
        require: true
    },
    email :{
        type: String,
        require: true
    },
    password : {
        type: String,
        require: true
    }
},
{timestamps: true});

module.exports = mongoose.model("users", userSchema);