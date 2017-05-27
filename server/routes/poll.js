import express from 'express';
import validateInput from '../validation/signup';
import assert from 'assert';
import {MongoClient} from 'mongodb';

import dotenv from 'dotenv';

dotenv.config();

var urlDb = process.env.MONGOLAB_URI;
var db;

// Create the database connection
MongoClient.connect(urlDb, { poolSize: 10 }, function(err, database) {
    assert.equal(null, err);
    db = database;
});


var app = express.Router();


// submit a new poll

app.post('/api/poll/newpoll', (req, res) => {

	let obj = req.body;

	db.collection('votingapprecords').save(obj)
	.then(
		() => { 
			console.log("Poll has been added to the DB")
			res.json(obj);
		}
	)
	.catch( (err) => {
		console.log(err);
	})

})


// get list of all polls submitted by user

app.get('/api/poll/mypolls/:userId', (req, res) => {
	let query = {'user.username': req.params.userId};

	db.collection('votingapprecords').find(query).toArray( (err, data) => {
		if (err) throw err;

		else{
			res.status(200).json(data);
		}
	})

})

// retrieve all polls

app.get('/api/poll/viewallpolls', (req, res) => {

	db.collection('votingapprecords').find({}).toArray( (err, data) => {
		if (err) throw err;

		else{
			res.status(200).json(data);
		}			
	})
})

// handle poll vote

app.get('/api/poll/:userId/:polltitle', (req, res) => {

	let query = { "user.username": req.params.userId, "polltitle": req.params.polltitle };

	db.collection('votingapprecords').find(query).toArray( (err, data) => {
		if (err) throw err;

		else{
			console.log("data: ", data);
			res.status(200).json(data);
		}
	})
})

// update DB with new vote

app.post('/api/poll/:userId/:polltitle', (req, res) => {
	let pollData = req.body;

	let query = { 'user.username': req.params.userId, 'polltitle': req.params.polltitle };
	let update = { $set: { 'pollOptions':  pollData } };

	db.collection('votingapprecords').findOneAndUpdate(query, update, {}, (err, doc) => {
		res.status(200).json(doc);
	});
})

// delete a poll submitted by user

app.post('/api/poll/deletePoll/:userId/:polltitle', (req, res) => {
	let query = { 'user.username': req.params.userId, 'polltitle': req.params.polltitle };

	db.collection('votingapprecords').deleteOne(query)
	.then( () => {
		db.collection('votingapprecords').find({ 'user.username': req.params.userId }).toArray( (err, data) => {
			if (err) throw err;

			else{
				res.status(200).json(data);
			}			
		});
	})
});



export default app;