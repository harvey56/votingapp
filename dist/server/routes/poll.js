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

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var urlDb = process.env.MONGOLAB_URI;
var db;

// Create the database connection
_mongodb.MongoClient.connect(urlDb, { poolSize: 10 }, function (err, database) {
	_assert2.default.equal(null, err);
	db = database;
});

var app = _express2.default.Router();

// submit a new poll

app.post('/api/poll/newpoll', function (req, res) {

	var obj = req.body;

	db.collection('votingapprecords').save(obj).then(function () {
		console.log("Poll has been added to the DB");
		res.json(obj);
	}).catch(function (err) {
		console.log(err);
	});
});

// get list of all polls submitted by user

app.get('/api/poll/mypolls/:userId', function (req, res) {
	var query = { 'user.username': req.params.userId };

	db.collection('votingapprecords').find(query).toArray(function (err, data) {
		if (err) throw err;else {
			res.status(200).json(data);
		}
	});
});

// retrieve all polls

app.get('/api/poll/viewallpolls', function (req, res) {

	db.collection('votingapprecords').find({}).toArray(function (err, data) {
		if (err) throw err;else {
			res.status(200).json(data);
		}
	});
});

// handle poll vote

app.get('/api/poll/:userId/:polltitle', function (req, res) {

	var query = { "user.username": req.params.userId, "polltitle": req.params.polltitle };

	db.collection('votingapprecords').find(query).toArray(function (err, data) {
		if (err) throw err;else {
			res.status(200).json(data);
		}
	});
});

// update DB with new vote

app.post('/api/poll/:userId/:polltitle', function (req, res) {
	var pollData = req.body;

	var query = { 'user.username': req.params.userId, 'polltitle': req.params.polltitle };
	var update = { $set: { 'pollOptions': pollData } };

	db.collection('votingapprecords').findOneAndUpdate(query, update, {}, function (err, doc) {
		res.status(200).json(doc);
	});
});

// delete a poll submitted by user

app.post('/api/poll/deletePoll/:userId/:polltitle', function (req, res) {
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