var express = require('express');
var router= express.Router();
var mongoose = require('mongoose');
var Page = require('../models/page');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');


/* User Routes. */


// GET all pages
router.get('/', function (req, res) {
	res.send('Welcome to the API zone');
});

router.get('/pages', function (req, res) {
	return Page.find(function (err, pages) {
		if (!err) {
			return res.send(pages);
		} else {
			return response.send(500, err);
		}
	});
});


// POST a new page
router.post('/pages/add', sessionCheck, function (req, res) {
	var page = new Page({
		title: req.body.title,
		url: req.body.url,
		content: req.body.content,
		menuIndex: req.body.menuIndex,
		date: new Date(Date.now())
	});

	page.save(function (err) {
		if (err) 
			return res.send(500, err);
		else
			return response.send(200, page);
	});
});

// Update a page
router.post('/pages/update', sessionCheck, function (req, res) {
	var id = request.body._id;

	Page.update({
		_id: id
	}, {
		$set: {
			title: req.body.title,
			url: req.body.url,
			content: req.body.content,
			menuIndex: req.body.menuIndex,
			date: new Date(Date.now())
		}
	}).exec();

	res.send("Page updated");
});


// Delete a page
router.get('/pages/delete/:id', sessionCheck, function (req, res) {
	var id = req.params.id;
	Page.remove({
		_id: id
	}, function (err) {
		return console.log(err);
	});

	return res.send('Page id-' + id + ' has been deleted');
});


// Get a single page by id
router.get('pages/page/:id', sessionCheck, function (req, res) {
	var id = request.params.id;
	Page.findOne({
		_id: id
	}, function (err, page) {
		if (err)
			return console.log(err);

		return res.send(page);
	});
});


// Get a single page by url
router.get('/pages/details/:url', function (req, res) {
	var url = req.params.url;
	Page.findOne({
		url: url
	}, function (err, page) {
		if (err)
			return console.log(err);

		return res.send(page);
	});
});


// Add a new User
router.post('/add-user', function (req, res) {
	var salt, hash, password;
	password = req.body.password;
	salt = bcrypt.genSaltSync(10);
	hash = bcrypt.hashSync(password, salt);

	var newUser = new User({
		username: req.body.username,
		password: hash
	});

	newUser.save(function (err) {
		if (!err)
			return res.send('New User successfully created');
		else
			return res.send(err);
	});
});


// login
router.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({
		username: username
	}, function (err, data) {
		if (err | data === null) {
			return res.send(401, "User Doesn't exist");
		} else {
			var user = data;

			if (username == user.username && bcrypt.compareSync(password, user.password)) {
				req.session.regenerate(function () {
					req.session.user = username;
					return res.send(username);
				});
			} else {
				return response.send(401, "Bad Username or Password");
			}
		}
	});
});


// logout
router.get('/logout', function (req, res) {
	req.session.destroy(function () {
		return res.send(401, 'User logged out');
	});
});




function sessionCheck(req, res, next) {
	if (req.session.user) next();

	else response.send(401, 'authorization failed');
}


module.exports = router;