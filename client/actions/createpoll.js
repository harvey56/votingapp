import axios from 'axios';
import { browserHistory } from 'react-router';
import { CREATE_NEW_POLL, RETRIEVE_POLLS, UPDATE_POLL, DELETE_POLL, RETRIEVE_POLL_TITLE } from './types';
import React from 'react';

// create new poll action

export function newPoll(pollData){
	return{
		type: CREATE_NEW_POLL,
		pollData
	}
}

// action creator to create a new URL based on newly submitted poll

export function newPollUrl(props){
	return function(dispatch){
		dispatch(newPoll(props));
		axios.post('/api/poll/newpoll', props)
	}
}

// retrieve polls action

function retrieve(polls){
	return{
		type: RETRIEVE_POLLS,
		polls
	}
}

// action creator to retrieve all polls by connected user

export function retrievePolls(userId){

	let url = '/api/poll/mypolls/' + userId;

	return function(dispatch){
		axios.get(url)
		.then( (res) => {
			return dispatch(retrieve(res.data))
		})
		.catch( (err) => {
			console.log(err)
		})
	}
}

// action creator to retrieve all polls

export function retrieveallpolls(){
	let url = '/api/poll/viewallpolls/';

	return function(dispatch){
		axios.get(url)
		.then( (res) => {
			return dispatch(retrieve(res.data))
		})
		.catch( (err) => {
			console.log(err)
		})
	}
}

export function retrievePollTitle(polltitle){
	return {
		type : RETRIEVE_POLL_TITLE,
		polltitle
	}
}

// action to get poll object associated to the entered URL

export function getPollData(userId, polltitle){

	let url = '/api/poll/' + userId + "/" + polltitle;
	console.log("url: ", url);

	return function(dispatch){
		return axios.get(url)
			.then( (res) => {
				console.log("getPollData res: ", res);
				dispatch(retrieve(res.data[0].pollOptions));
				dispatch(retrievePollTitle(res.data[0].polltitle))
			})
			.catch( (err) => {
				console.log(err.message)
			})		
	}
}

// action to update poll object with the new vote
function updatePoll(polls){
	return{
		type: UPDATE_POLL,
		polls
	}
}


// action creator to dispatch poll object with updated vote

export function updatePollVotes(voteSelection, poll, userId, pollTitle){
	voteSelection = voteSelection.slice(-1);
	poll[voteSelection].vote += 1;
	let url = '/api/poll/' + userId + "/" + pollTitle;
	console.log(pollTitle);
	return function(dispatch){
		axios.post(url, poll)
		.then ( (res) => {
			return dispatch(updatePoll(poll))
		})
		.catch( (err) => {
			console.log(err)
		})
	}
}


// action to delete poll

function deletePoll(poll){
	return{
		type: DELETE_POLL,
		poll
	}
}

// action creator to delete poll

export function deleteUserPoll(userId, polltitle, pollsList){
	let url = '/api/poll/deletePoll/' + userId + "/" + polltitle;

	return function(dispatch){
		axios.post(url, pollsList)
		.then( (res) => {
			dispatch(deletePoll(polltitle))
			return dispatch(retrieve(res.data));
		});
	}
}