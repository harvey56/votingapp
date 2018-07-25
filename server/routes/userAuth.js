import express from 'express';
import validateSignupInput from '../validation/signup';
import validateLoginInput from '../validation/login';
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


let router = module.exports = express.Router();

// sign up user and record user profile to database

router.post('/authuser/signup', (req, res) => {
	let userProfile = req.body;
	db.collection('votingapprecords').insertOne({ "user": req.body })
		.then( 
			(data) => {
				if(data){
					req.body.errors = {};
					return res.status(200).json(userProfile);
				}				

				else{
					req.body.errors = "This user is already registered";			
					return res.status(401).json(userProfile);
				}

			}
		)
		.catch( (err) => {
			console.log(err.message);
		}) 
});


// fetch user data upon logging in

router.post('/authuser/login', (req, res) => {

	let query = req.body.username;
	let password = req.body.password;
	
	db.collection('votingapprecords').find({ "user.email": query }).toArray()
	.then( (data) => {
		if (data[0].user.password !== password){ 
			return res.status(401).json({errors: "Wrong password"})
		}
		
		else { 
			return res.status(200).json(data) 
		}

	})
	.catch( (err) => {
		return res.status(401).json({errors: "This username does not exist in the database"})
	})
})

