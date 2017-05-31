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
				<li><Link to = "/signup">Sign up</Link></li>
				<li><Link to = "/login">Login</Link></li>
			</ul>			
		)

		const loggedUserHeader = (
			<ul className = "nav navbar-nav navbar-right">
				<li><Link to = "/viewallpolls">View all polls</Link></li>
				<li><Link to =  {myPollsLink}>My polls</Link></li>
				<li><Link to = "/addpoll">Add a new poll</Link></li>
				<li><Link to = "/">You are logged in as { this.userLogin ? this.userLogin.username : user.username }</Link></li>
				<li><Link to = "/signout">Sign out</Link></li>
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