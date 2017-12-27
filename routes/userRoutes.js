// Enforce 'strict' mode
'use strict';

// NPM dependencies
var express = require('express');

// Config dependencies
var router = express.Router();
var User = require('../models/user');

// Retrieve all Users
router.get('/', (req, res) => {
	User.find({}, function (err, users) {
		// Error handler
		if (err) {
			// Send 'Server Error' status code and message back to the client
			return res.status(500).send("Server error: Unable to execute request to retrieve all users.");
		// Success handler
		} else {
			// Send the object and 'OK' status code back to the client
			res.status(200).send(users);
		}
	})
});

// Retrieve a single user via id
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
    	// Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Server error: Unable to execute request to find the user.");
        }

        // User does not exist handler
        if (!user) {
        	// Send the 'Not Found' status code and message back to the client
        	return res.status(404).send("No user was found with id: [" + req.params.id + "]");
        }

        // Send the object and 'OK' status code back to the client
        res.status(200).send(user);
    });
});

// Create a User
router.post('/', (req, res) => {
	// Validation checkers for required fields
	req.check('username', 'username is missing').exists();
	req.check('password', 'Password is missing').exists();
	req.check('firstName', 'Missing First Name').exists();
	req.check('lastname', 'Missing Last Name').exists();
	req.check('email', 'Invalid email address').isEmail();
	var validationErrors = req.validationErrors();

	// Specify the session as false if errors are found and true if otherwise
	if (validationErrors) {
		req.session.validationErrors = validationErrors;
		req.session.success = false;
	} else {
		req.session.success = true;
	}

	// Save the User object to the database via the User Schema
	User.create({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	},
	function (err, user) {
		// Error handler
		if (err) {
			// If error due to validation errors, aggregate all specific error messages
			if (validationErrors) {
				var validationErrorString = "Input errors found in submission: \n";
				for (var error of validationErrors) {
					validationErrorString += `Field [${error.param}] has error [${error.msg}]\n`;
				};
				return res.status(400).send(validationErrorString);

			// Handle non-validation errors
			} else {
				// Send 'Server Error' status code and message back to the client
				return res.status(500).send("Server error: Unable to execute request to create the user.");
			}
		// Success handler
		} else {
			// Send the object and 'OK' status code back to the client
			res.status(200).send(user);
		}
	});
});

// Update a single user via id
router.put('/:id', function (req, res) {
	// Specify 'new' parameter as true to return the new updated object and not the original object
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        // Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Sever error: Unable to execute request to update the user.");
        } else {
        	// Send the object and 'OK' status code back to the client
        	res.status(200).send(user);
        }
    });
});

// Delete a single user via id
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
    	// Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Server error: Unable to execute request to delete the user.");
		} else {
			// Send the 'OK' status code and message confirming deletion back to the client.
        	res.status(200).send(`User [${user.username}] was deleted.`);
    	}
    });
});

module.exports = router;
