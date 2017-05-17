import { SIGNUP_SUCCESS, SIGNUP_FAILURE, AUTH_SUCCESS, AUTH_ERROR, UNAUTH_USER } from '../actions/types';

const defaultState = {
	signedup: false,
	signedin: false,
	authenticated: false,
	user: localStorage.getItem('user'),
	error: {}
}

export default function (state = defaultState, action){
	switch (action.type){
		case SIGNUP_SUCCESS:
			return Object.assign({}, state, { 
				authenticated: true,
				signedup: true, 
				user: action.user,
				error: {} 
			})

		case SIGNUP_FAILURE:
			return Object.assign({}, state, { 
				authenticated: false,
				signedup: false,
				error: { signedup: action.payload } 
			})
		
		case AUTH_ERROR:
			return Object.assign({}, state, {
				authenticated: false,
				signedin: false,
				error: action.error
			})

		case AUTH_SUCCESS:
			return Object.assign({}, state, {
				authenticated: true,
				signedin: true,
				user: action.user,
				error: {}
			})

		case UNAUTH_USER:
			return Object.assign({}, state, { 
				authenticated: false,
				error: {}
			})
	
		default:
			return state
	}
}