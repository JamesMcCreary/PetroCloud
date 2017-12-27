'use strict';

// NPM dependencies
var express = require('express');

// Config dependencies
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res) => {
	console.log("inside get route");
	User.find({}, function (err, users) {
		if (err) {
			console.log("error found");
			return res.status(500).send("Server error: Unable to execute request to retrieve all users.");
		} else {
			console.log("No error found");
			res.status(200).send(users);
		}
	})
});

router.post('/', (req, res) => {
console.log("The req.body.userName is: ", req.body.username);
console.log("The req.body.password is: ", req.body.password);
console.log("The req.body.firstName is: ", req.body.firstName);
console.log("The req.body.lastName is: ", req.body.lastName);
console.log("The req.body.email is: ", req.body.email);
// if (typeof req.body.lastName != User.lastName.type) {
// 	console.log("ERROR");
// }
console.log("The typeof req.body.lastName is: ", typeof req.body.lastName);
console.log("The  User is: ", User);
req.check('username', 'username is missing').isLength({min: 1});
req.check('password', 'Password is missing').isLength({min: 1});
req.check('email', 'Invalid email address').isEmail();
req.check('firstName', 'Invalid First Name').isLength({min: 1}).isAlpha();
req.check('lastName', 'Invalid Last Name').isLength({min: 1}).isAlpha();

var validationErrors = req.validationErrors();
console.log("The req.validationErrors are: ", req.validationErrors());
  if (validationErrors) {
    req.session.validationErrors = validationErrors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
User.create({
	username: req.body.username,
	password: req.body.password,
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	email: req.body.email
},
function (err, user) {
	console.log("Inside post route. The user is: ", user);
	// Error route
	if (err) {
		// If error due to form input
		if (validationErrors) {
			var validationErrorString = "Input errors found in submission: \n";
			console.log("The initial validationErrorString is: ", validationErrorString);
			for (var error of validationErrors) {
				validationErrorString += `Field [${error.param}] has error [${error.msg}]\n`;
				console.log("The validationErrorString is now: ", validationErrorString);
			};
			return res.status(400).send(validationErrorString);

		// Handle non-form input errors
		} else {
			console.log("Error found");
			return res.status(500).send("Server Error identified");
		}
	// Success route
	} else {
		res.status(200).send(user);
	}
});
});


// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
        	return res.status(500).send("Server error: Unable to execute request to find the user.");
        }
        if (!user) {
        	return res.status(404).send("No user was found with id: [" + req.params.id + "]");
        }
        res.status(200).send(user);
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
	// Specify 'new' parameter as true to return the new updated object and not the original object
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
        	return res.status(500).send("Server error: Unable to execute request to delete the user.");
		} else {
        res.status(200).send("User ["+ user.username +"] was deleted.");
    	}
    });
});

module.exports = router;
