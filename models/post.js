// Enforce 'strict' mode
'use strict';

// Instantiate NPM dependencies
var mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator');

// Define the Post Schema
var PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please provide a userId'],
    trim: true
  },
  title: {
    type: String,
    minlength: 1,
    required: [true, 'Post title should be longer']
  },
  body: {
    type: String,
    trim: true,
    minlength: 1,
    required: [true, 'Post body should be longer']
  }
});

// Add the unique validation checker
PostSchema.plugin(uniqueValidator);

// Export the schema as 'Post' model to the rest of the app
module.exports = mongoose.model('Post', PostSchema);
