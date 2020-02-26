//declaration
var express 		= require('express');
var bodyParser 		= require('body-parser');
var ejs 			= require('ejs');
var cookieParser 	= require('cookie-parser');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var home 			= require('./controllers/home');
var reg				= require('./controllers/reg');
var home2 			= require('./controllers/home2');

var app = express();

//configuration
app.set('view engine', 'ejs');


//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);
app.use('/home2', home2);
app.use('/reg',reg);


//routes
app.get('/', function(req, res){
	res.render('index');
});



//server startup
app.listen(3000, function(){
	console.log('server started at 3000!');
});
