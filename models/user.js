var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  uniqueValidator = require('mongoose-unique-validator');

const SALT_WORK_FACTOR = 10;

/* Define the user schema */
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter in a username'],
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
    required: [true, 'Please enter the user\'s first name']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please enter the user\'s last name']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    default: '',
    required: [true, 'Please enter the user\'s personal email address'],
    validate: {
      validator: function(v) {
        return /.+\@.+\..+/.test(v);
      },
      message: '{VALUE} is not a valid email address'
    }
  },
  roles: {
    // If we need more complex roles, we will need to alter this into accepting
    // an array of roles for a user and create a permissions schema.
    // The site should be fine with newhire < employee < admin
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: false
  },
});

/**
 * Upon saving, salt the password.
 */
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

/* Upon user registration, encrypt user-entered password */
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

/* Upon user login, validate user-entered password against encrypted password in database */
UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

/* Add the unique validation checker */
UserSchema.plugin(uniqueValidator);

/* Salt the password */
function saltUserPassword(next, user) {
  console.log("Inside saltUserPassword");
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // Hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      // Override the clear text password with the hashed one
      user.password = hash;
      next();
    });
  });
}

module.exports = mongoose.model('User', UserSchema);
