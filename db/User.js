const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phone : Number,
    email: String,
    password: String,
    confirmPassword: String
});

module.exports = mongoose.model("users", userSchema);