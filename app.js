const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
const expressValidator = require('express-validator');
const mongo 	     = require ('mongodb');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const dbConfig 	     = require('./config/db');
const app            = express();
const expressSession = require('express-session');
const port = 8080;

app.listen(port, () => {
  console.log('PetroCentral is running on port ' + port);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(expressSession({secret: 'petro', saveUninitialized: false, resave: false}));

const MongoClient = mongo.MongoClient;

mongoose.connect(dbConfig.url, { useMongoClient: true });

// MongoClient.connect(dbConfig.url, (err) => {
// 	if (err) {
// 		return console.log("Error connecting to database: ", err);
// 	}
// });

// var indexRoutes = require('./routes/index');
// app.use('/', indexRoutes);

var userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);












// //Set up default mongoose connection
// var mongoDB = dbConfig.url;
// mongoose.connect(mongoDB, {
//   useMongoClient: true
// });
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // Configure DB
// // MongoClient.connect(db.url, (err) => {
// // 	if (err) {
// // 		return console.log(err);
// // 	}
// // });
// // var options = {
// //   useMongoClient: true,
// //   //autoIndex: false, // Don't build indexes
// //   reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
// //   reconnectInterval: 500, // Reconnect every 500ms
// //   poolSize: 10, // Maintain up to 10 socket connections
// //   // If not connected, return errors immediately rather than waiting for reconnect
// //   bufferMaxEntries: 0
// // };


// // mongoose.connect(dbConfig.url, options).then(
// //   () => { console.log('Database connected successfully!'); },
// //   err => { console.log('Error while connecting to database: ${err.message}'); }
// // );

// // mongoose.connect(dbConfig.url, function(error) {
// // 	console.log()
// // });3
// // const db = mongoose.connection;

// // db.on('error', err => {
// //   console.error(`Error while connecting to database: ${err.message}`);
// // });
// // db.once('openUri', () => {
// //   console.log('Database connected successfully!');
// // });


// // mongoose.connect(uri, options, function(error) {
// //   // Check error in initial connection. There is no 2nd param to the callback.
// // });

// console.log("Before routes config");
// // Configure routes
// require('./routes/index')();
// console.log("After routes config");

// // The users route path instantiation
// var userRoutes = require('./routes/userRoutes');
// app.use('/users', userRoutes)

