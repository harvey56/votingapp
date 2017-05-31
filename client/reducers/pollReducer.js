import { CREATE_NEW_POLL, RETRIEVE_POLLS, DELETE_POLL, UPDATE_POLL, RETRIEVE_POLL_TITLE, RETRIEVE_POLL } from '../actions/types';

const defaultState = {
	newPollSubmitted: false,
	pollsRetrieved: false,
	pollDeleted: false,
	pollUpdated: false
}

export default function(state = defaultState, action){
	switch (action.type){
		case CREATE_NEW_POLL :
			return Object.assign({}, state, {
				newPollSubmitted: true,
				pollData: action.pollData
			})

		case RETRIEVE_POLLS :
			return Object.assign({}, state, {
				pollsRetrieved: true,
				polls: action.polls,
				polltitle: action.polltitle
			})

		case UPDATE_POLL :
			return Object.assign({}, state, {
				pollUpdated: true,
				poll: action.polls
			})

		case DELETE_POLL :
			return Object.assign({}, state, {
				pollDeleted: true,
				poll: action.polls
			})

		case RETRIEVE_POLL_TITLE :
			return Object.assign({}, state, {
				polltitle: action.polltitle
			})

		case RETRIEVE_POLL :
			return Object.assign({}, state, {
				poll: action.poll
			})			

		default:
			return state

	}
}