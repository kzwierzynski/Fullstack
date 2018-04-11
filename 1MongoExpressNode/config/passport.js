const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
// const passport = require('passport');

module.exports = function(passport){
    //Local Strategy
    passport.use(new LocalStrategy(
        {usernameField: 'username', //username is the default name for html form input
        passwordField: 'pass1'},    //in my html name for password input is different from default "password"
        (username, password, done) => {
        // match Username
        let query = { username: username };
        User.findOne(query, function (err, user) {
            if (err) throw err;
            if (!user) { 
                return done(null, false, {message: 'No user found'}); 
            }
            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if (err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false,{message: 'Wrong Password'});
                }
            });
          });
        }));

      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}
