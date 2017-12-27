// Enforce 'strict' mode
'use strict';

// Instantiate NPM dependencies
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  uniqueValidator = require('mongoose-unique-validator');

const SALT_WORK_FACTOR = 10;

// Define the UserSchema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide a username'],
    trim: true
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password should be longer']
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please provide the user\'s first name']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please provide the user\'s last name']
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
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: false
  }
});

// Perform password salting upon executing the save funciton on the UserSchema
UserSchema.pre('save', function(next) {
  console.log('PREUPDATING')

  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    console.log('PRESAVING - no modified password')
    return next();
  }

  console.log("salting password");
  saltUserPassword(next, this);
});

// Add the unique validation checker
UserSchema.plugin(uniqueValidator);

// Salt the password
function saltUserPassword(next, user) {
  console.log("Inside saltUserPassword");
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // Hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Override the clear text password with the hashed one
      user.password = hash;
      next();
    });
  });
}

// Export the schema as 'User' model to the rest of the app
module.exports = mongoose.model('User', UserSchema);
