var express = require('express')
var app = express()

var mysql = require('mysql')

var myConnection  = require('express-myconnection') 
var config = require('./config')
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}
app.use(myConnection(mysql, dbOptions, 'pool'))

/**
 * setting up the templating view engine
 */ 
app.set('view engine', 'ejs')

/**
 * import routes/index.js
 * import routes/users.js
 */ 
var index = require('./routes/index')
var users = require('./routes/users')


/**
 * Express Validator Middleware for Form Validation
 */ 
var expressValidator = require('express-validator')
app.use(expressValidator())
 
var bodyParser = require('body-parser'
			 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
var methodOverride = require('method-override')

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())


app.use('/', index)
app.use('/users', users)

app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})
