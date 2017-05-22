'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signup = require('../validation/signup');

var _signup2 = _interopRequireDefault(_signup);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//path to DB
var urlDb = "mongodb://harvey:votingapp@ds127260.mlab.com:27260/votingapp";

var db;

// Create the database connection
_mongodb.MongoClient.connect(urlDb, { poolSize: 10 }, function (err, database) {
	_assert2.default.equal(null, err);
	db = database;
});

var app = _express2.default.Router();

// submit a new poll

app.post('/poll/newpoll', function (req, res) {

	var obj = req.body;

	db.collection('votingapprecords').save(obj).then(function () {
		console.log("Poll has been added to the DB");
		res.json(obj);
	}).catch(function (err) {
		console.log(err);
	});
});

// get list of all polls submitted by user

app.get('/poll/mypolls/:userId', function (req, res) {
	var query = { 'user.username': req.params.userId };

	db.collection('votingapprecords').find(query).toArray(function (err, data) {
		if (err) throw err;else {
			res.status(200).json(data);
		}
	});
});

// retrieve all polls

app.get('/poll/viewallpolls', function (req, res) {

	db.collection('votingapprecords').find({}).toArray(function (err, data) {
		if (err) throw err;else {
			res.status(200).json(data);
		}
	});
});

// handle poll vote

app.get('/poll/:userId/:polltitle', function (req, res) {
	console.log("req.params: ", req.params);

	var query = { "user.username": req.params.userId, "polltitle": req.params.polltitle };

	db.collection('votingapprecords').find(query).toArray(function (err, data) {
		if (err) throw err;else {
			console.log("data: ", data);
			res.status(200).json(data);
		}
	});
});

// update DB with new vote

app.post('/poll/:userId/:polltitle', function (req, res) {
	var pollData = req.body;

	var query = { 'user.username': req.params.userId, 'polltitle': req.params.polltitle };
	var update = { $set: { 'pollOptions': pollData } };

	db.collection('votingapprecords').findOneAndUpdate(query, update, {}, function (err, doc) {
		res.status(200).json(doc);
	});
});

// delete a poll submitted by user

app.post('/poll/deletePoll/:userId/:polltitle', function (req, res) {
	var query = { 'user.username': req.params.userId, 'polltitle': req.params.polltitle };

	db.collection('votingapprecords').deleteOne(query).then(function () {
		db.collection('votingapprecords').find({ 'user.username': req.params.userId }).toArray(function (err, data) {
			if (err) throw err;else {
				res.status(200).json(data);
			}
		});
	});
});

exports.default = app;