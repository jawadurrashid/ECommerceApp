//Initializing libraries
var express = require('express');
var morgan = require('morgan'); //Logs all requests from user
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');

var app = express();
mongoose.connect('mongodb://jawadur.rashid:password@ds133796.mlab.com:33796/ecommerceweb', function(err){
    if(err){
        console.log(err);
    } else{
        console.log('Successfully connected to database');
    }
})

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));

app.post('/create-user', function(req,res,next) {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.profile.name = req.body.name;
    
    user.save(function(err){
        if(err) return next(err);        
        res.json('A new user has been successfully created');
    });
});

//Validating server
app.listen(3000,function(err){
    if(err) throw err;
    console.log('Server is currently running on port 3000');
});