import { combineReducers } from 'redux';

import authReducer from './authReducer';
import pollReducer from './pollReducer';

export default combineReducers({
	auth: authReducer,
	poll: pollReducer
});