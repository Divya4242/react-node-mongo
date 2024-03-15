const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        // unique: true
    },
    password:{
        type: String,
    },
    token:{
        type: String
    }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;