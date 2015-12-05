
var express 		= require('express'),
	app 			= express(),
	helmet			= require('helmet'),
	logger 			= require('morgan'),
	cookieParser 	= require('cookie-parser'),
	bodyParser 		= require('body-parser'),
	compression		= require('compression'),
	port 			= process.env.PORT || 1330,
	methodOverride 	= require('method-override');
	db 				= require('mongoose') //shhh this is global for our schemas

// DATBASE CONFIGS ===================================
// db.connect('mongodb://<user>:<password>@ds031792.mongolab.com:<somenumber>/<databasename>', function(err, db) {
//     if (err) throw err;
//     console.log("Connected to Database");
//     _db = db 
// })

// EXPRESS CONFIGS ===================================
app.use(compression())
app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/controllers',express.static(__dirname, 'public/controllers'));
app.use(cookieParser()); 


//BROWSER =============================================
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// SCHEMAS ============================================
require('./db/userSchema.js')

// MODELS =============================================
User = db.model('User', userSchema)

//ROUTES ==============================================
require('./routes/routes.js')(app); 

//LISTEN ==============================================
app.listen(port);
console.log('The magic happens on port ' + port);