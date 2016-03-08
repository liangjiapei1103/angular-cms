var express = require('express');
var router= express.Router();
var mongoose = require('mongoose');
var Page = require('../models/page');
var User = require('../models/user');


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
router.post('/pages/add', function (req, res) {
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
router.post('/pages/update', function (req, res) {
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
router.get('/pages/delete/:id', function (req, res) {
	var id = req.params.id;
	Page.remove({
		_id: id
	}, function (err) {
		return console.log(err);
	});

	return res.send('Page id-' + id + ' has been deleted');
});


// Get a single page by id
router.get('pages/admin-details/:id', function (req, res) {
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


module.exports = router;