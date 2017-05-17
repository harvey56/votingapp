import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config/url-config';
import { SIGNUP_SUCCESS, SIGNUP_FAILURE, AUTH_ERROR, AUTH_SUCCESS, UNAUTH_USER } from './types';

// sign up a user

export function signupUserSuccess(user){
	return {
		type: SIGNUP_SUCCESS,
		user
	}
}

export function signupUserFailure(error){
	return {
		type: SIGNUP_FAILURE,
		payload: error
	}
}

// actions to take once user is signed up

export function signupUser(props){	
	return function(dispatch){
		return axios.post('/authuser/signup', props)
			.then( 
				(res) => {
					console.log("res action: ", res);
					localStorage.setItem('user', JSON.stringify(props));
					browserHistory.push('/addpoll'); 
					dispatch(signupUserSuccess(props));
				},
				(err) => {
					console.log("err action: ", err);
					dispatch(signupUserFailure(err.message));
					throw err;
				}
			)
	}
}

// action creator to fetch logging in user

export function retrieveUserLogin(props){
	const { username, password } = props;

	return function(dispatch){
		return axios.post('/authuser/login', props)
			.then( (res) => {
				localStorage.setItem('user', JSON.stringify(res.data[0].user));				
				dispatch(signinSuccess(res.data[0].user));
			})
	}
}

// authentication success

export function signinSuccess(user){
	return {
		type : AUTH_SUCCESS,
		user
	}
}


// authentication error

export function authError(error){
	return {
		type: AUTH_ERROR,
		error
	}
}

export function signout(){
	return{
		type: UNAUTH_USER
	}
}

// sign out a user

export function signoutUser(){
	localStorage.clear();

	return function(dispatch){
		dispatch(signout());
		setTimeout(() => browserHistory.push("/"), 2000);
	}
}



