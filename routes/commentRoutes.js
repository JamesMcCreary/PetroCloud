// Enforce 'strict' mode
'use strict';

// NPM dependencies
var express = require('express');

// Config dependencies
var router = express.Router();
var Comment = require('../models/comment');

// Retrieve all Comments
router.get('/', (req, res) => {
	Comment.find({}, function (err, comments) {
		// Error handler
		if (err) {
			// Send 'Server Error' status code and message back to the client
			return res.status(500).send("Server error: Unable to execute request to retrieve all comments.");
		// Success handler
		} else {
			// Send the object and 'OK' status code back to the client
			res.status(200).send(comments);
		}
	})
});

// Retrieve a single comment via id
router.get('/:id', function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
    	// Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Server error: Unable to execute request to find the comment.");
        }

        // Comment does not exist handler
        if (!comment) {
        	// Send the 'Not Found' status code and message back to the client
        	return res.status(404).send("No comment was found with id: [" + req.params.id + "]");
        }

        // Send the object and 'OK' status code back to the client
        res.status(200).send(comment);
    });
});

// Create a Comment
router.post('/', (req, res) => {
	// Validation checkers for required fields
	req.check('postId', 'UserId is missing').exists();
	req.check('name', 'User\'s name is missing').exists();
	req.check('email', 'Email is invalid').isEmail();
	req.check('body', 'Comment body is missing').exists();
	var validationErrors = req.validationErrors();

	// Specify the session as false if errors are found and true if otherwise
	if (validationErrors) {
		req.session.validationErrors = validationErrors;
		req.session.success = false;
	} else {
		req.session.success = true;
	}

	// Save the Comment object to the database via the Comment Schema
	Comment.create({
		postId: req.body.postId,
		name: req.body.name,
		email: req.body.email,
		body: req.body.body
	},
	function (err, comment) {
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
				return res.status(500).send("Server error: Unable to execute request to create the comment.");
			}
		// Success handler
		} else {
			// Send the object and 'OK' status code back to the client
			res.status(200).send(comment);
		}
	});
});

// Update a single comment via id
router.put('/:id', function (req, res) {
	// Specify 'new' parameter as true to return the new updated object and not the original object
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, comment) {
        // Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Sever error: Unable to execute request to update the comment.");
        } else {
        	// Send the object and 'OK' status code back to the client
        	res.status(200).send(comment);
        }
    });
});

// Delete a single comment via id
router.delete('/:id', function (req, res) {
    Comment.findByIdAndRemove(req.params.id, function (err, comment) {
    	// Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Server error: Unable to execute request to delete the comment.");
		} else {
			 // Send the 'OK' status code and message confirming deletion back to the client.
        	res.status(200).send(`Comment posted by [${comment.name}] on Post [${comment.title}] was deleted.`);
    	}
    });
});

module.exports = router;
