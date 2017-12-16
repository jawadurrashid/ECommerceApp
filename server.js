//Initializing libraries
var express = require('express');
var morgan = require('morgan'); //Logs all requests from user
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');
var ejs = require('ejs');
var engine = require('ejs-mate')

var app = express();
mongoose.connect('mongodb://jawadur.rashid:password@ds133796.mlab.com:33796/ecommerceweb', function(err){
    if(err){
        console.log(err);
    } else{
        console.log('Successfully connected to database');
    }
})

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));
app.engine('ejs', engine);   //Declares engine of choice
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main')
var userRoutes = require('./routes/user')

app.use(mainRoutes);
app.use(userRoutes);

//Validating server
app.listen(3000,function(err){
    if(err) throw err;
    console.log('Server is currently running on port 3000');
});