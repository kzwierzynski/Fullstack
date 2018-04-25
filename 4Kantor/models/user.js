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
    },
    wallet: { 
        type: {
            PLN: {
                type: Number,
                default: 100000,
                required : true
            },  
            USD: {
                type: Number,
                default: 100000,
                required : true
            },  
            EUR: {
                type: Number,
                default: 100000,
                required : true
            },  
            CHF: {
                type: Number,
                default: 100000,
                required : true
            },  
            RUB: {
                type: Number,
                default: 1000000,
                required : true
            },  
            CZK: {
                type: Number,
                default: 1000000,
                required : true
            },
            GBP: {
                type: Number,
                default: 100000,
                required : true
            }
        }   
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
            if (err) throw err;
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

module.exports.updateUser = function (id, update, callback){
    let query = {_id: id}
    let options= {new: true}
    User.findOneAndUpdate(query, update, options, callback);
}

