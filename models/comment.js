var mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator');

/* Define the comment schema */
var CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: [true, 'Please provide a postId'],
    trim: true
  },
  name: {
    type: String,
    minlength: 1,
    required: [true, 'User\'s name should be longer']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    default: '',
    required: [true, 'Please provide the user\'s personal email address'],
    validate: {
      validator: function(v) {
        return /.+\@.+\..+/.test(v);
      },
      message: '{VALUE} is not a valid email address'
    }
  },
  body: {
    type: String,
    trim: true,
    minlength: 1,
    required: [true, 'Comment body should be longer']
  }
});

/* Add the unique validation checker */
CommentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', CommentSchema);
