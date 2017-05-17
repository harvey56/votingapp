import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends React.Component{

	componentWillMount(){
		this.userLogin = JSON.parse(localStorage.getItem('user'));
	}

	render(){
		const { authenticated } = this.props;
		const user = this.props.user || {};
		const loggedUser = this.userLogin ? this.userLogin.username : "";
		const myPollsLink = "/mypolls/" + loggedUser;

		const guestHeader = (
			<ul className = "nav navbar-nav navbar-right">
				<li><a href = "/signup">Sign up</a></li>
				<li><a href = "/login">Login</a></li>
			</ul>			
		)

		const loggedUserHeader = (
			<ul className = "nav navbar-nav navbar-right">
				<li><a href = "/viewallpolls">View all polls</a></li>
				<li><a href =  {myPollsLink}>My polls</a></li>
				<li><a href = "/addpoll">You are logged in as { this.userLogin ? this.userLogin.username : user.username }</a></li>
				<li><a href = "/signout">Sign out</a></li>
			</ul>
		)

		return(
			<div className = "container-fluid">
				<div className = "navbar navbar-default">
					<nav className = "container-fluid">
						<div className = "navbar-header">
							<a className = "navbar-brand" href = "/">Voting App</a>
						</div>
						{ authenticated ? loggedUserHeader : guestHeader }
					</nav>
				</div>
			</div>
		)
	}
};


export default Header;