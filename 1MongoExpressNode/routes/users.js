const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');


//Bring in Models from Mongoose
let User = require('../models/user');

//route to register
router.get('/register', function(req, res){
    res.render('register', {
        title: 'Register new user'
    });
});

//register new user
router.post('/register', function(req, res){

    let name = req.body.name1;
    let email = req.body.email;
    let username = req.body.username;
    let pass1 = req.body.pass1;
    let pass2 = req.body.pass2;

    req.checkBody('name1', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'User name is required').notEmpty();
    req.checkBody('pass1', 'Password is required').notEmpty();
    req.checkBody('pass1', "Passwords don't match").equals(pass2);

    let errors = req.validationErrors();

    if (errors) {
        res.render('Register', {
            title: 'Register new user',
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: pass1
        });
        //checking if username is unique
        User.findOne({username: username},(err, result)=>{

            if (err) {
                console.log(err);
            //username already exists
            } else if (result) {
                errors={msg: 'User name must be unique. Username: "' + newUser.username + '" already exists.'}
                try{
                    throw errors
                }catch(e){
                    res.render('Register', {
                        title: 'Register new user',
                        errors: {errors}
                    });
                }              
            // username available -> register new user
            } else {
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{

                        if (err) {
                            console.log(err);
                        } else {
                            newUser.password = hash;
        
                            newUser.save((err)=>{
                                if(err){
                                    console.log(err);
                                    return;
                                }else{
                                    req.flash('success', 'New user \'' + newUser.username + '\' registered. Now you can login to your account.');
                                    res.redirect('/users/login');
                                }
                            });
                        }
                        
                    })
                });
            }
        })

        

        
    }   
});

router.get('/login', function(req, res){
    res.render('login', {
        title: 'Login to your account'
    });
});

router.post('/login', (req, res, next)=>{
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/users/login',
                                   failureFlash: true 
                                })(req,res,next);
});


//Logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You logged out');
    res.redirect('/users/login')
});


module.exports = router;