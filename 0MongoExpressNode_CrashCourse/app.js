const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
var mongojs = require('mongojs');
var db = mongojs('ExpressJS', ['users']);

let app = express();
//Global Variables
// let users = [''];
let ObjectId = mongojs.ObjectId;

app.use((req,res,next)=>{
    res.locals.errors = null;   //declaring global vars -> errors
    next();
});

// var logger = function(req, res, next){
//     console.log("Logging...");
//     next();
// };
// app.use(logger);

// View Engine Middleware
app.set('view engine', 'ejs');     //define View Engine
app.set('views', path.join(__dirname,'views')); //specify what folder we use for our views

//body-Parser basic Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//public folder for static resources (all necessary files like .css, jQuery etc)
app.use(express.static(path.join(__dirname,'public')) )

//expressValidator Middleware
app.use(expressValidator());

app.get('/', (req, res)=>{

    db.users.find(function (err, docs) {
        res.render('index',{    //if in /public index.html -> overwrites the index.ejs in view
            title: 'Customers',
            users: docs
        });    
    })
    // res.send("hello")    ->simple sending values to view
    

});

app.post('/users/add', (req, res)=>{

    req.checkBody('firstName', 'First Name Required').notEmpty();   //express-validator
    req.checkBody('lastName', 'Last Name Required').notEmpty();
    req.checkBody('email', 'Email Required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        res.render('index',{
            title: 'Customers',
            users: users,
            errors: errors
        }); 
    }else{
        let newUser={
            firstName: req.body.firstName,  // using body parser: (req.body)
            lastName: req.body.lastName,
            email: req.body.email,
        }
        db.users.insert(newUser, (err, result)=>{
            if(err){
                console.log(err);
            }else{
                // res.redirect('/');
                res.redirect('/');
            }
        });        
    }
    
});

app.delete('/users/delete/:id', (req, res)=>{

    db.users.remove({_id : ObjectId(req.params.id)}, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })

});

app.listen(3000, ()=>{  console.log("Server started on Port 3000")})