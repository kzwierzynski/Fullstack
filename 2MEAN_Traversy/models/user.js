const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

module.exports.getUserById = function (id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback){
    let query = {username : username}
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, ( err, hash )=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.checkPassword = function (pass1, passDB, callback){
    // bcrypt.compare(pass1, passDB, callback);
    bcrypt.compare(pass1, passDB, (err, isMatch)=>{
        if (err) throw err;
        callback(null, isMatch);
    });
}