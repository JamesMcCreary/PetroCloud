// Instantiate NPM dependencies
const express        	= require('express');
const expressValidator 	= require('express-validator');
const mongo 	     	= require ('mongodb');
const mongoose       	= require('mongoose');
const bodyParser     	= require('body-parser');
const dbConfig 	     	= require('./config/db');
const app            	= express();
const expressSession 	= require('express-session');
// Speicfy the default port for mongodb instances
const port = 27017;

// Connect the app to the mongodb port
app.listen(port, () => {
  console.log('PetroCentral is running on port ' + port);
});

// Middleware config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(expressSession({secret: 'petro', saveUninitialized: false, resave: false}));

// DB config
mongoose.connect(dbConfig.url, { useMongoClient: true });

// Route config (first parameter to app.use expressions below maps the specified path (first arg) as the base path for all further paths specified in the routes file (second arg)
var userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

var postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);

var commentRoutes = require('./routes/commentRoutes');
app.use('/comments', commentRoutes);
