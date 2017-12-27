'use strict';

// NPM dependencies
var express = require('express');

// Config dependencies
var router = express.Router(),
  User = require('../models/user');

module.exports = function() {
  router.post('/posts', (req, res) => {
    // You'll create your note here.
    res.send('Hello')
  });
};