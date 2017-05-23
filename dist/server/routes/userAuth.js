'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signup = require('../validation/signup');

var _signup2 = _interopRequireDefault(_signup);

var _login = require('../validation/login');

var _login2 = _interopRequireDefault(_login);

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

var router = _express2.default.Router();

// sign up user and record user profile to database

router.post('/signup', function (req, res) {
	console.log("req.body: ", req.body);
	db.collection('votingapprecords').find({ "user.username": req.body.username }).toArray().then(function (data) {
		if (data.length === 0) {
			req.body.errors = {};
			return res.status(200).json(req.body);
		} else {
			req.body.errors = "This user is already registered";
			return res.status(401).json(req.body);
		}
	}).catch(function (err) {
		console.log(err.message);
	});
});

// fetch user data upon logging in

router.post('/login', function (req, res) {

	var query = { "user.username": req.body.username };
	var password = req.body.password;

	db.collection('votingapprecords').find(query).toArray().then(function (data) {
		if (data[0].user.password !== password) {
			return res.status(401).json({ errors: "Wrong password" });
		} else {
			return res.status(200).json(data);
		}
	}).catch(function (err) {
		return res.status(401).json({ errors: "This username does not exist in the database" });
	});
});

exports.default = router;