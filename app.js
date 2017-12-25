const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const dbConfig 			 = require('./config/db');
const app            = express();
const port = 8080;

app.listen(port, () => {
  console.log('PetroCentral is running on port ' + port);
});

app.use(bodyParser.urlencoded({extended: true}));


// Configure routes
require('./routes')(app, {});

// Configure DB
// MongoClient.connect(db.url, (err) => {
// 	if (err) {
// 		return console.log(err);
// 	}
// });



mongoose.connect(dbConfig.url);
const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to database: ${err.message}`);
});
db.once('open', () => {
  console.log('Database connected successfully!');
});
