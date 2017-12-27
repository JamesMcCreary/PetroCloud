// Enforce 'strict' mode
'use strict';

// NPM dependencies
var express = require('express');

// Config dependencies
var router = express.Router();
var Post = require('../models/post');

// Retrieve all Posts
router.get('/', (req, res) => {
	Post.find({}, function (err, posts) {
		// Error handler
		if (err) {
			// Send 'Server Error' status code and message back to the client
			return res.status(500).send("Server error: Unable to execute request to retrieve all posts.");
		// Success handler
		} else {
			// Send the object and 'OK' status code back to the client
			res.status(200).send(posts);
		}
	})
});

// Retrieve a single post via id
router.get('/:id', function (req, res) {
    Post.findById(req.params.id, function (err, post) {
    	// Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Server error: Unable to execute request to find the post.");
        }

        // Post does not exist handler
        if (!post) {
        	// Send the 'Not Found' status code and message back to the client
        	return res.status(404).send("No post was found with id: [" + req.params.id + "]");
        }

        // Send the object and 'OK' status code back to the client
        res.status(200).send(post);
    });
});

// Create a Post
router.post('/', (req, res) => {
	// Validation checkers for required fields
	req.check('userId', 'UserId is missing').exists();
	req.check('title', 'Title is missing').exists();
	req.check('body', 'Post body is missing').exists();
	var validationErrors = req.validationErrors();

	// Specify the session as false if errors are found and true if otherwise
	if (validationErrors) {
		req.session.validationErrors = validationErrors;
		req.session.success = false;
	} else {
		req.session.success = true;
	}

	// Save the Post object to the database via the Post Schema
	Post.create({
		userId: req.body.userId,
		title: req.body.title,
		body: req.body.body
	},
	function (err, post) {
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
				return res.status(500).send("Server error: Unable to execute request to create the post.");
			}
		// Success handler
		} else {
			// Send the object and 'OK' status code back to the client
			res.status(200).send(post);
		}
	});
});

// Update a single post via id
router.put('/:id', function (req, res) {
	// Specify 'new' parameter as true to return the new updated object and not the original object
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post) {
        // Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Sever error: Unable to execute request to update the post.");
        } else {
        	// Send the object and 'OK' status code back to the client
        	res.status(200).send(post);
        }
    });
});

// Delete a single post via id
router.delete('/:id', function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err, post) {
    	// Error handler
        if (err) {
        	// Send 'Server Error' status code and message back to the client
        	return res.status(500).send("Server error: Unable to execute request to delete the post.");
		} else {
			 // Send the 'OK' status code and message confirming deletion back to the client.
        	res.status(200).send(`Post [${post.title}] was deleted.`);
    	}
    });
});

module.exports = router;
