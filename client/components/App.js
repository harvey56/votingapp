import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { signupUser } from '../actions/userauth';
import { newPollUrl, retrievePolls } from '../actions/createpoll';
import Footer from './footer';
require('../../public/stylesheets/main.css');

class App extends React.Component {

	render(){
		const { authenticated, user } = this.props;

		return(
			<div>
				<Header authenticated = { authenticated } user = { user }/>
				{ this.props.children }
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated,
		newPollSubmitted: state.poll.newPollSubmitted,
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { signupUser, newPollUrl })(App);