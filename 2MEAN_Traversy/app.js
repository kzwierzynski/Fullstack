const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();
const port = 3000;

const users = require('./routes/users')
const config = require('./config/database')

//Connect to MongoDB
mongoose.connect(config.database);
let db = mongoose.connection;

//Diagnostics of connection with MongoDB
db.once('open', () => {
    console.log(`Connected to database ${config.database}`);
});
db.on('error', (err) => {
    console.log(err);
});

//setting static folder for Front end files
app.use(express.static(path.join(__dirname, "public")));

//Middleware for cors
app.use(cors());

// Middleware bodyParser application/json
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// routing
app.use('/users', users);

app.get('/', (req, res)=>{
    res.send("Invalid Endpoint");
})

app.get('*',function (req, res) {   //redirect if some different url from all specified
    res.redirect('/');
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.listen(port, ()=>{
    console.log("Server started on port 3000...")
})

