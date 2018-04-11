const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
        // unique: true
    },
    username: {
        type: String,
        require: true
        // unique: true
    },
    password: {
        type: String,
        require: true
    }
});
// userSchema.plugin(uniqueValidator);
// userSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'});

let User = mongoose.model('user', userSchema);
module.exports = User;

// User.schema.path('email').validate(function (value, respond) {                                                                                           
//     User.findOne({ email: value }, function (err, user) {                                                                                                
//         if(user) respond(false);                                                                                                                         
//     });                                                                                                                                                  
// }, 'This email address is already registered');