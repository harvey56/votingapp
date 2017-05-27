import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Main from './components/Main';
import Signuppage from './components/signup/Signuppage';
import Loginpage from './components/signup/Loginpage';
import Signout from './components/signup/Signoutpage';
import Dashboard from './components/polls/pollshomepage';
import Vote from './components/polls/vote';
import PollsApp from './components/polls/myPollsList';
import MyChart from './components/polls/myChart';
import ViewAllPolls from './components/polls/viewallpolls';

export default(
	<Route path = "/" name = "home" component = {App} >
		<IndexRoute component = {Main} />
		<Route path = "signup" name = 'signup' component = {Signuppage} />
		<Route path = 'login' component = {Loginpage} />
		<Route path = "signout" component = {Signout} />
		<Route path = "addpoll" component = {Dashboard} />
		<Route path = "poll/:userId/:polltitle" component = {Vote} />
		<Route path = "chart/:userId/:polltitle" component = {MyChart} />
		<Route path = "mypolls/:userId" component = {PollsApp} />
		<Route path = "viewchart" component = {MyChart} />
		<Route path = "viewallpolls" component = {ViewAllPolls} />
	</Route>
);