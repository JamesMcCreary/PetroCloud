'use strict';

// NPM dependencies
var express = require('express');

// Config dependencies
var router = express.Router();
 
module.exports = function() {
  router.post('/comments', (req, res) => {
    // You'll create your note here.
    res.send('Hello')
  });
};